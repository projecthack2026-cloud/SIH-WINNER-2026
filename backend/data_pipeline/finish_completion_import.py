import os
import sys
import re
import logging
import pandas as pd
from sqlalchemy import text

sys.stdout.reconfigure(encoding='utf-8')

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger("FINISH_COMPLETION_IMPORT")

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.database import engine, SessionLocal
from app.models.models import (
    Project, ProjectRecommendation, ProjectSanction, ProjectCompletion
)

DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "src", "data"))

def clean_monetary(val):
    if pd.isna(val) or val is None:
        return 0.0
    s_val = str(val).replace('₹', '').replace(',', '').strip()
    try:
        return float(s_val)
    except ValueError:
        return 0.0

def parse_date_val(val):
    if pd.isna(val) or val is None:
        return None
    s_val = str(val).strip()
    if not s_val or s_val.lower() == 'nan':
        return None
    try:
        dt = pd.to_datetime(s_val, format='%d-%b-%Y', errors='coerce')
        if pd.isna(dt):
            dt = pd.to_datetime(s_val, errors='coerce')
        if pd.isna(dt):
            return None
        return dt.date()
    except Exception:
        return None

def clean_str(val):
    if pd.isna(val) or val is None:
        return None
    s_val = str(val).strip()
    return s_val if s_val else None

def extract_work_code(raw_str):
    if not raw_str or pd.isna(raw_str):
        return None
    s_val = str(raw_str).strip()
    m = re.search(r'WS/\s*MP\d+/\d{4}-\d{4}/\d+', s_val)
    if m:
        return m.group(0).replace('\t', '').replace(' ', '').strip()
    return s_val.replace('\t', '').strip()

def run():
    comp_df = pd.read_csv(os.path.join(DATA_DIR, 'Works Completed.csv'), encoding='utf-8')
    comp_valid = comp_df[~comp_df['Sr. No.'].astype(str).str.contains('Grand Total', na=False)]

    sess = SessionLocal()
    pid_map_exact = dict((r[0].strip(), r[1]) for r in sess.query(Project.canonical_work_id, Project.id).all() if r[0])
    pid_map_upper = dict((r[0].strip().upper(), r[1]) for r in sess.query(Project.canonical_work_id, Project.id).all() if r[0])
    existing_comp_srs = set(str(r[0]) for r in sess.query(ProjectCompletion.original_sr_no).all() if r[0])
    sess.close()
    engine.dispose()

    missing_comp = comp_valid[~comp_valid['Sr. No.'].astype(str).isin(existing_comp_srs)]
    logger.info(f"Existing DB completions: {len(existing_comp_srs)}")
    logger.info(f"Missing completion rows: {len(missing_comp)}")

    if missing_comp.empty:
        logger.info("No missing completion rows! Database is 100% up-to-date.")
        return

    comp_mappings = []
    for _, row in missing_comp.iterrows():
        sr_no = str(row['Sr. No.'])
        raw_work = extract_work_code(row.get('Work'))
        p_id = pid_map_exact.get(raw_work) or pid_map_upper.get(raw_work.upper() if raw_work else '')

        if p_id:
            comp_mappings.append({
                'project_id': p_id,
                'original_sr_no': sr_no,
                'completion_date': parse_date_val(row.get('Completion Date')),
                'amount_disbursed': clean_monetary(row.get('Amount Disbursed ( ₹ )')),
                'image_reference': clean_str(row.get('Image')),
                'source_file': 'Works Completed.csv'
            })

    logger.info(f"Total matchable completion records to insert: {len(comp_mappings)}")

    chunk_size = 2000
    total_chunks = (len(comp_mappings) - 1) // chunk_size + 1

    for i in range(0, len(comp_mappings), chunk_size):
        chunk = comp_mappings[i:i + chunk_size]
        s = SessionLocal()
        s.bulk_insert_mappings(ProjectCompletion, chunk)
        s.commit()
        s.close()
        engine.dispose()
        logger.info(f"  --> Successfully inserted chunk {i // chunk_size + 1}/{total_chunks} ({len(chunk)} rows)")

    logger.info("==================================================")
    logger.info("FINAL VALIDATION QUERIES")
    logger.info("==================================================")

    s = SessionLocal()
    q1 = """
    SELECT
        'project_recommendations' AS table_name,
        COUNT(*) AS rows,
        COUNT(DISTINCT project_id) AS distinct_projects,
        COUNT(DISTINCT original_sr_no) AS distinct_source_rows
    FROM project_recommendations

    UNION ALL

    SELECT
        'project_sanctions',
        COUNT(*),
        COUNT(DISTINCT project_id),
        COUNT(DISTINCT original_sr_no)
    FROM project_sanctions

    UNION ALL

    SELECT
        'project_completions',
        COUNT(*),
        COUNT(DISTINCT project_id),
        COUNT(DISTINCT original_sr_no)
    FROM project_completions;
    """

    res1 = s.execute(text(q1)).fetchall()
    print("\n=== SUMMARY RECONCILIATION QUERY RESULTS ===")
    print(f"{'TABLE NAME':<25} | {'TOTAL ROWS':<10} | {'DISTINCT PROJECTS':<18} | {'DISTINCT SOURCE ROWS':<20}")
    print("-" * 80)
    for r in res1:
        print(f"{r[0]:<25} | {r[1]:<10} | {r[2]:<18} | {r[3]:<20}")

    q2 = """
    SELECT
        'project_completions' AS table_name,
        MIN(CASE
            WHEN NULLIF(TRIM(original_sr_no), '') ~ '^[0-9]+$'
            THEN CAST(TRIM(original_sr_no) AS INTEGER)
        END) AS min_source_row,
        MAX(CASE
            WHEN NULLIF(TRIM(original_sr_no), '') ~ '^[0-9]+$'
            THEN CAST(TRIM(original_sr_no) AS INTEGER)
        END) AS max_source_row,
        COUNT(*) AS total_rows
    FROM project_completions;
    """

    res2 = s.execute(text(q2)).fetchall()
    print("\n=== NUMERIC SOURCE-ROW COVERAGE FOR PROJECT_COMPLETIONS ===")
    print(f"{'TABLE NAME':<22} | {'MIN SOURCE ROW':<15} | {'MAX SOURCE ROW':<15} | {'TOTAL ROWS':<10}")
    print("-" * 70)
    for r in res2:
        print(f"{r[0]:<22} | {r[1]:<15} | {r[2]:<15} | {r[3]:<10}")

    s.close()
    engine.dispose()

if __name__ == "__main__":
    run()
