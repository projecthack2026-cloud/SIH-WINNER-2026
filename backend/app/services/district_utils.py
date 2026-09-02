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

def normalize_district_name(district_param: Optional[str]) -> str:
    """
    Normalizes district strings (e.g. 'Pune District', 'Pune (District)', 'pune (20)', 'PUNE')
    to uppercase canonical district name ('PUNE').
    """
    if not district_param or not isinstance(district_param, str) or not district_param.strip():
        return ""
    d = district_param.strip()
    d = re.sub(r"\s*\(\s*\d+\s*\)\s*$", "", d, flags=re.IGNORECASE).strip()
    d = re.sub(r"\s+district\b", "", d, flags=re.IGNORECASE).strip()
    d = re.sub(r"\s*\(\s*district\s*\)", "", d, flags=re.IGNORECASE).strip()
    return d.upper()

def apply_district_filter_to_query(query, district_param: Optional[str], project_model=None):
    """
    Applies district filtering to a SQLAlchemy query matching administrative district & IDA fields.
    Does NOT mix electoral constituency with administrative district.
    """
    clean_d = normalize_district_name(district_param)
    if not clean_d:
        return query
    d_lower = clean_d.lower()
    from sqlalchemy import func, or_
    if project_model is None:
        from app.models.models import Project
        project_model = Project
    return query.filter(
        or_(
            func.lower(project_model.district) == d_lower,
            func.lower(project_model.district).like(f"%{d_lower}%"),
            func.lower(project_model.ida).like(f"%{d_lower}%")
        )
    )

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
