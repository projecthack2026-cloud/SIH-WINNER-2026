import re
from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import text

def extract_district_from_ida(ida: Optional[str]) -> Optional[str]:
    if not ida or not ida.strip():
        return None
    ida_clean = ida.strip()
    match = re.match(r"^([^\(]+)\(", ida_clean)
    if match:
        return match.group(1).strip()
    return ida_clean

def ensure_districts_populated(db: Session):
    """
    Ensures projects.district column is populated from projects.ida if district is NULL/empty.
    """
    try:
        result = db.execute(text("SELECT COUNT(*) FROM projects WHERE district IS NULL OR district = ''"))
        missing_count = result.scalar() or 0
        if missing_count > 0:
            dialect_name = db.bind.dialect.name if db.bind else "postgresql"
            if dialect_name == "postgresql":
                sql = """
                    UPDATE projects 
                    SET district = TRIM(
                        CASE 
                            WHEN STRPOS(ida, '(') > 1 THEN SUBSTR(ida, 1, STRPOS(ida, '(') - 1)
                            ELSE ida
                        END
                    )
                    WHERE ida IS NOT NULL AND ida != '' AND (district IS NULL OR district = '');
                """
            else:
                sql = """
                    UPDATE projects 
                    SET district = TRIM(
                        CASE 
                            WHEN instr(ida, '(') > 1 THEN substr(ida, 1, instr(ida, '(') - 1)
                            ELSE ida
                        END
                    )
                    WHERE ida IS NOT NULL AND ida != '' AND (district IS NULL OR district = '');
                """
            db.execute(text(sql))
            db.commit()
    except Exception as e:
        db.rollback()
        print(f"[DistrictUtils] Error performing district backfill: {e}")
