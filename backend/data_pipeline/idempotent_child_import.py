import os
import sys
import re
import logging
import pandas as pd
from sqlalchemy import text

# Set stdout encoding for Windows Powershell
sys.stdout.reconfigure(encoding='utf-8')

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger("IDEMPOTENT_CHILD_IMPORT")

# Ensure PYTHONPATH contains backend
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

def run_import():
    logger.info("==================================================")
    logger.info("PRE-IMPORT DIAGNOSTICS & AUDIT")
    logger.info("==================================================")

    # 1. Load CSVs
    rec_df = pd.read_csv(os.path.join(DATA_DIR, 'Works Recommended.csv'), encoding='utf-8')
    sanc_df = pd.read_csv(os.path.join(DATA_DIR, 'Works Sanctioned.csv'), encoding='utf-8')
    comp_df = pd.read_csv(os.path.join(DATA_DIR, 'Works Completed.csv'), encoding='utf-8')

    rec_valid = rec_df[~rec_df['Sr. No.'].astype(str).str.contains('Grand Total', na=False)]
    sanc_valid = sanc_df[~sanc_df['Sr. No.'].astype(str).str.contains('Grand Total', na=False)]
    comp_valid = comp_df[~comp_df['Sr. No.'].astype(str).str.contains('Grand Total', na=False)]

    s = SessionLocal()
    pid_map_exact = dict((r[0].strip(), r[1]) for r in s.query(Project.canonical_work_id, Project.id).all() if r[0])
    pid_map_upper = dict((r[0].strip().upper(), r[1]) for r in s.query(Project.canonical_work_id, Project.id).all() if r[0])
    
    existing_rec_srs = set(str(r[0]) for r in s.query(ProjectRecommendation.original_sr_no).all() if r[0])
    existing_sanc_srs = set(str(r[0]) for r in s.query(ProjectSanction.original_sr_no).all() if r[0])
    existing_comp_srs = set(str(r[0]) for r in s.query(ProjectCompletion.original_sr_no).all() if r[0])
    s.close()

    missing_rec = rec_valid[~rec_valid['Sr. No.'].astype(str).isin(existing_rec_srs)]
    missing_sanc = sanc_valid[~sanc_valid['Sr. No.'].astype(str).isin(existing_sanc_srs)]
    missing_comp = comp_valid[~comp_valid['Sr. No.'].astype(str).isin(existing_comp_srs)]

    print(f"Works Recommended Source Valid Rows : {len(rec_valid)}")
    print(f"  -> Existing DB Rows               : {len(existing_rec_srs)}")
    print(f"  -> Missing Source Rows            : {len(missing_rec)}")
    
    print(f"Works Sanctioned Source Valid Rows  : {len(sanc_valid)}")
    print(f"  -> Existing DB Rows               : {len(existing_sanc_srs)}")
    print(f"  -> Missing Source Rows            : {len(missing_sanc)}")
    
    print(f"Works Completed Source Valid Rows   : {len(comp_valid)}")
    print(f"  -> Existing DB Rows               : {len(existing_comp_srs)}")
    print(f"  -> Missing Source Rows            : {len(missing_comp)}")

    # -----------------------------------------------------------------
    # STEP 1: IMPORT MISSING RECOMMENDED ROWS (216 rows)
    # -----------------------------------------------------------------
    if not missing_rec.empty:
        logger.info(f"Processing {len(missing_rec)} missing ProjectRecommendation rows...")
        rec_mappings = []
        unmatched_rec = 0

        for _, row in missing_rec.iterrows():
            sr_no = str(row['Sr. No.'])
            raw_work = extract_work_code(row.get('WORK'))
            p_id = pid_map_exact.get(raw_work) or pid_map_upper.get(raw_work.upper() if raw_work else '')
            
            if p_id:
                rec_mappings.append({
                    'project_id': p_id,
                    'original_sr_no': sr_no,
                    'work_category': clean_str(row.get('Work category')),
                    'recommendation_date': parse_date_val(row.get('Recommended date')),
                    'recommended_amount': clean_monetary(row.get('RECOMMENDED AMOUNT   ( ₹ )')),
                    'raw_work_value': clean_str(row.get('Work description')),
                    'source_file': 'Works Recommended.csv'
                })
            else:
                unmatched_rec += 1

        logger.info(f"Recommended matching result: {len(rec_mappings)} matchable, {unmatched_rec} unmatched.")

        if rec_mappings:
            chunk_size = 2500
            for i in range(0, len(rec_mappings), chunk_size):
                chunk = rec_mappings[i:i + chunk_size]
                sess = SessionLocal()
                sess.bulk_insert_mappings(ProjectRecommendation, chunk)
                sess.commit()
                sess.close()
            logger.info("Successfully inserted missing ProjectRecommendation rows.")

    # -----------------------------------------------------------------
    # STEP 2: IMPORT MISSING COMPLETED ROWS (13,856 rows)
    # -----------------------------------------------------------------
    if not missing_comp.empty:
        logger.info(f"Processing {len(missing_comp)} missing ProjectCompletion rows in safe chunks...")
        comp_mappings = []
        unmatched_comp = 0

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
            else:
                unmatched_comp += 1

        logger.info(f"Completed matching result: {len(comp_mappings)} matchable, {unmatched_comp} unmatched.")

        if comp_mappings:
            chunk_size = 2500
            for i in range(0, len(comp_mappings), chunk_size):
                chunk = comp_mappings[i:i + chunk_size]
                sess = SessionLocal()
                sess.bulk_insert_mappings(ProjectCompletion, chunk)
                sess.commit()
                sess.close()
                logger.info(f"  Inserted chunk {i // chunk_size + 1}/{(len(comp_mappings) - 1) // chunk_size + 1} ({len(chunk)} rows)")
            logger.info("Successfully inserted all missing ProjectCompletion rows.")

    # -----------------------------------------------------------------
    # STEP 3: RUN POST-IMPORT VALIDATION QUERIES
    # -----------------------------------------------------------------
    logger.info("==================================================")
    logger.info("RUNNING POST-IMPORT VALIDATION QUERIES")
    logger.info("==================================================")

    sess = SessionLocal()

    query1 = """
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

    res1 = sess.execute(text(query1)).fetchall()

    print("\n=== SUMMARY RECONCILIATION QUERY RESULTS ===")
    print(f"{'TABLE NAME':<25} | {'TOTAL ROWS':<10} | {'DISTINCT PROJECTS':<18} | {'DISTINCT SOURCE ROWS':<20}")
    print("-" * 80)
    for r in res1:
        print(f"{r[0]:<25} | {r[1]:<10} | {r[2]:<18} | {r[3]:<20}")

    query2 = """
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

    res2 = sess.execute(text(query2)).fetchall()
    print("\n=== NUMERIC SOURCE-ROW COVERAGE FOR PROJECT_COMPLETIONS ===")
    print(f"{'TABLE NAME':<22} | {'MIN SOURCE ROW':<15} | {'MAX SOURCE ROW':<15} | {'TOTAL ROWS':<10}")
    print("-" * 70)
    for r in res2:
        print(f"{r[0]:<22} | {r[1]:<15} | {r[2]:<15} | {r[3]:<10}")

    sess.close()

if __name__ == "__main__":
    run_import()
