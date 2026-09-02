import os
import sys
import glob
import re
import logging
import pandas as pd
import numpy as np
from datetime import datetime
from sqlalchemy import func, text

# Set stdout encoding for Windows Powershell
sys.stdout.reconfigure(encoding='utf-8')

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger("MPLADS_IMPORT")

# Ensure PYTHONPATH contains backend
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.database import Base, engine, SessionLocal
from app.models.models import (
    User, Project, ProjectRecommendation, ProjectSanction, ProjectCompletion,
    ProjectExpenditure, MpAllocation, CalamityConsent, ProjectFeature,
    AnomalyResult, RiskScore, ProjectLocation
)

DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "src", "data"))

def clean_monetary(val):
    if pd.isna(val) or val is None:
        return 0.0
    s = str(val).replace('₹', '').replace(',', '').strip()
    try:
        return float(s)
    except ValueError:
        return 0.0

def parse_date_val(val):
    if pd.isna(val) or val is None:
        return None
    s = str(val).strip()
    if not s or s.lower() == 'nan':
        return None
    try:
        dt = pd.to_datetime(s, format='%d-%b-%Y', errors='coerce')
        if pd.isna(dt):
            dt = pd.to_datetime(s, errors='coerce')
        if pd.isna(dt):
            return None
        return dt.date()
    except Exception:
        return None

def clean_str(val):
    if pd.isna(val) or val is None:
        return None
    s = str(val).strip()
    return s if s else None

def import_mplads_data():
    logger.info("==================================================")
    logger.info("STARTING IDEMPOTENT MPLADS DATA IMPORT TO NEON POSTGRESQL")
    logger.info("==================================================")

    # 1. Test database connection
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        logger.info("Successfully connected to Neon PostgreSQL database!")
    except Exception as e:
        logger.error(f"Failed to connect to DATABASE_URL: {e}")
        sys.exit(1)

    # 2. Create tables
    logger.info("Creating database tables if not present...")
    Base.metadata.create_all(bind=engine)

    session = SessionLocal()

    report_stats = {}

    try:
        # -------------------------------------------------------------
        # STEP 1: MP ALLOCATIONS (544 rows)
        # -------------------------------------------------------------
        alloc_path = os.path.join(DATA_DIR, "Allocated Limit for Honble MPs.csv")
        if os.path.exists(alloc_path):
            alloc_df = pd.read_csv(alloc_path, encoding='utf-8')
            logger.info(f"Loaded {len(alloc_df)} MP Allocation records...")
            
            existing_alloc_cnt = session.query(MpAllocation).count()
            if existing_alloc_cnt == 0:
                alloc_mappings = []
                for _, row in alloc_df.iterrows():
                    alloc_mappings.append({
                        "state": clean_str(row.get('State')),
                        "mp_name": clean_str(row.get("Hon'ble Members of Parliaments")),
                        "constituency": clean_str(row.get('Constituency')),
                        "allocated_amount": clean_monetary(row.get('Allocated AMOUNT ( ₹ )')),
                        "source_file": "Allocated Limit for Honble MPs.csv"
                    })
                if alloc_mappings:
                    session.bulk_insert_mappings(MpAllocation, alloc_mappings)
                    session.commit()
                report_stats["mp_allocations"] = {"source": len(alloc_df), "inserted": len(alloc_mappings), "skipped": 0}
            else:
                report_stats["mp_allocations"] = {"source": len(alloc_df), "inserted": 0, "skipped": existing_alloc_cnt}
            logger.info(f"MP Allocations step done.")

        # -------------------------------------------------------------
        # STEP 2: CALAMITY CONSENTS (13 rows)
        # -------------------------------------------------------------
        cal_path = os.path.join(DATA_DIR, "Amount consented for Calamity.csv")
        if os.path.exists(cal_path):
            cal_df = pd.read_csv(cal_path, encoding='utf-8')
            logger.info(f"Loaded {len(cal_df)} Calamity Consent records...")

            existing_cal_cnt = session.query(CalamityConsent).count()
            if existing_cal_cnt == 0:
                cal_mappings = []
                for _, row in cal_df.iterrows():
                    cal_mappings.append({
                        "calamity_type": clean_str(row.get('Calamity Type')),
                        "calamity_name": clean_str(row.get('Calamity Name')),
                        "mp_name": clean_str(row.get("Hon'ble Members of Parliament")),
                        "consent_date": parse_date_val(row.get('Date of Consent')),
                        "consent_amount": clean_monetary(row.get('Consent Amount ( ₹ )')),
                        "source_file": "Amount consented for Calamity.csv"
                    })
                if cal_mappings:
                    session.bulk_insert_mappings(CalamityConsent, cal_mappings)
                    session.commit()
                report_stats["calamity_consents"] = {"source": len(cal_df), "inserted": len(cal_mappings), "skipped": 0}
            else:
                report_stats["calamity_consents"] = {"source": len(cal_df), "inserted": 0, "skipped": existing_cal_cnt}
            logger.info(f"Calamity Consents step done.")

        # -------------------------------------------------------------
        # STEP 3: MASTER PROJECTS (37,069 rows)
        # -------------------------------------------------------------
        existing_proj_cnt = session.query(Project).count()
        logger.info(f"Master Projects count in PostgreSQL: {existing_proj_cnt}")

        if existing_proj_cnt >= 37000:
            logger.info("Canonical Master Projects already fully ingested into PostgreSQL.")
            report_stats["projects"] = {
                "source": 37069,
                "inserted": 0,
                "skipped": existing_proj_cnt
            }
        else:
            rec_path = os.path.join(DATA_DIR, "Works Recommended.csv")
            sanc_path = os.path.join(DATA_DIR, "Works Sanctioned.csv")
            comp_path = os.path.join(DATA_DIR, "Works Completed.csv")

            rec_df = pd.read_csv(rec_path, encoding='utf-8') if os.path.exists(rec_path) else pd.DataFrame()
            sanc_df = pd.read_csv(sanc_path, encoding='utf-8') if os.path.exists(sanc_path) else pd.DataFrame()
            comp_df = pd.read_csv(comp_path, encoding='utf-8') if os.path.exists(comp_path) else pd.DataFrame()

            projects_dict = {}
            for _, row in sanc_df.iterrows():
                wid = clean_str(row.get('Work'))
                if wid and wid not in projects_dict:
                    projects_dict[wid] = {
                        "canonical_work_id": wid,
                        "work_category": clean_str(row.get('Work category')),
                        "work_title": clean_str(row.get('Work description')) or wid,
                        "work_description": clean_str(row.get('Work description')),
                        "state": clean_str(row.get('State')),
                        "district": None,
                        "ida": clean_str(row.get('IDA')),
                        "mp_name": clean_str(row.get("Hon'ble Members of Parliament")),
                        "constituency": clean_str(row.get('Constituency')),
                        "recommended_date": parse_date_val(row.get('Recommended date')),
                        "sanction_date": parse_date_val(row.get('Sanction Date')),
                        "completion_date": None,
                        "recommended_amount": 0.0,
                        "sanctioned_amount": clean_monetary(row.get('Sanction Amount ( ₹ )')),
                        "completed_amount": 0.0,
                        "current_status": clean_str(row.get('Work Status')) or "Sanctioned"
                    }

            for wid, pdata in projects_dict.items():
                ida_val = pdata['ida']
                if ida_val and '(' in ida_val:
                    pdata['district'] = ida_val.split('(')[0].strip()
                elif ida_val:
                    pdata['district'] = ida_val.strip()

            new_projects = list(projects_dict.values())
            batch_size = 5000
            for i in range(0, len(new_projects), batch_size):
                batch = new_projects[i:i + batch_size]
                session.bulk_insert_mappings(Project, batch)
                session.commit()

            report_stats["projects"] = {
                "source": len(projects_dict),
                "inserted": len(new_projects),
                "skipped": 0
            }

        # -------------------------------------------------------------
        # STEP 4: EXPENDITURE TRANSACTIONS (16,001 rows)
        # -------------------------------------------------------------
        exp_path = os.path.join(DATA_DIR, "Expenditure on Completed and On-going Works as on Date.csv")
        if os.path.exists(exp_path):
            exp_df = pd.read_csv(exp_path, encoding='utf-8')
            logger.info(f"Processing {len(exp_df)} Expenditure transaction records...")

            existing_exp_cnt = session.query(ProjectExpenditure).count()
            if existing_exp_cnt < len(exp_df):
                pid_map = dict(session.query(Project.canonical_work_id, Project.id).all())

                exp_mappings = []
                for _, row in exp_df.iterrows():
                    wid = clean_str(row.get('Work ID')) or clean_str(row.get('Work'))
                    p_id = pid_map.get(wid) if wid else None

                    exp_mappings.append({
                        "project_id": p_id,
                        "work_id": wid,
                        "expenditure_date": parse_date_val(row.get('Expenditure Date')),
                        "vendor_name": clean_str(row.get('Vendor Name')),
                        "payment_status": clean_str(row.get('Payment Status')),
                        "fund_disbursed_amount": clean_monetary(row.get('Fund Disbursed Amount ( ₹ )')),
                        "state": clean_str(row.get('State')),
                        "constituency": clean_str(row.get('Constituency')),
                        "mp_name": clean_str(row.get("Hon'ble Members of Parliament")),
                        "source_file": "Expenditure on Completed and On-going Works as on Date.csv"
                    })

                if exp_mappings:
                    if existing_exp_cnt > 0:
                        session.execute(text("TRUNCATE TABLE project_expenditures CASCADE;"))
                        session.commit()

                    batch_size = 5000
                    for i in range(0, len(exp_mappings), batch_size):
                        batch = exp_mappings[i:i + batch_size]
                        session.bulk_insert_mappings(ProjectExpenditure, batch)
                        session.commit()

                report_stats["project_expenditures"] = {"source": len(exp_df), "inserted": len(exp_mappings), "skipped": 0}
            else:
                report_stats["project_expenditures"] = {"source": len(exp_df), "inserted": 0, "skipped": existing_exp_cnt}

        # -------------------------------------------------------------
        # STEP 5: COMPUTE PROJECT FEATURES & ANOMALIES
        # -------------------------------------------------------------
        logger.info("Computing project feature analytics & anomaly results...")
        existing_feat_cnt = session.query(ProjectFeature).count()

        if existing_feat_cnt < session.query(Project).count():
            existing_feat_pids = set(r[0] for r in session.query(ProjectFeature.project_id).all())
            exp_aggregates = {}
            for pid, tot, cnt, vcnt in session.query(
                ProjectExpenditure.project_id,
                func.sum(ProjectExpenditure.fund_disbursed_amount),
                func.count(ProjectExpenditure.id),
                func.count(func.distinct(ProjectExpenditure.vendor_name))
            ).group_by(ProjectExpenditure.project_id).all():
                if pid:
                    exp_aggregates[pid] = {
                        "tot_exp": float(tot or 0.0),
                        "tx_cnt": cnt or 0,
                        "v_cnt": vcnt or 0
                    }

            features_to_insert = []
            anomalies_to_insert = []

            for p in session.query(Project.id, Project.sanctioned_amount, Project.current_status, Project.work_category, Project.state, Project.constituency).all():
                if p.id not in existing_feat_pids:
                    e_info = exp_aggregates.get(p.id, {"tot_exp": 0.0, "tx_cnt": 0, "v_cnt": 0})
                    tot_exp = e_info["tot_exp"]
                    tx_cnt = e_info["tx_cnt"]
                    v_cnt = e_info["v_cnt"]
                    sanc_amt = float(p.sanctioned_amount or 0.0)
                    util = round((tot_exp / sanc_amt * 100.0), 2) if sanc_amt > 0 else 0.0

                    features_to_insert.append({
                        "project_id": p.id,
                        "sanctioned_amount": sanc_amt,
                        "total_expenditure": tot_exp,
                        "utilization_percentage": util,
                        "expenditure_transaction_count": tx_cnt,
                        "vendor_count": v_cnt,
                        "status": p.current_status,
                        "work_category": p.work_category,
                        "state": p.state,
                        "constituency": p.constituency
                    })

                    if tot_exp > sanc_amt > 0:
                        anomalies_to_insert.append({
                            "project_id": p.id,
                            "anomaly_type": "Financial Overrun",
                            "rule_code": "R101_EXPENDITURE_EXCEEDS_SANCTION",
                            "description": f"Total expenditure ({tot_exp}) exceeds sanctioned limit ({sanc_amt}).",
                            "severity": "HIGH",
                            "score": 85.0
                        })

                    if tx_cnt > 5 and v_cnt == 1:
                        anomalies_to_insert.append({
                            "project_id": p.id,
                            "anomaly_type": "Single Vendor Dominance",
                            "rule_code": "R102_SINGLE_VENDOR_CONCENTRATION",
                            "description": f"All {tx_cnt} expenditure transactions directed to single vendor.",
                            "severity": "MEDIUM",
                            "score": 65.0
                        })

            if features_to_insert:
                batch_size = 5000
                for i in range(0, len(features_to_insert), batch_size):
                    batch = features_to_insert[i:i + batch_size]
                    session.bulk_insert_mappings(ProjectFeature, batch)
                    session.commit()

            if anomalies_to_insert:
                batch_size = 5000
                for i in range(0, len(anomalies_to_insert), batch_size):
                    batch = anomalies_to_insert[i:i + batch_size]
                    session.bulk_insert_mappings(AnomalyResult, batch)
                    session.commit()

        report_stats["project_features"] = {"source": session.query(ProjectFeature).count(), "inserted": session.query(ProjectFeature).count(), "skipped": 0}
        report_stats["anomaly_results"] = {"source": session.query(AnomalyResult).count(), "inserted": session.query(AnomalyResult).count(), "skipped": 0}

        # -------------------------------------------------------------
        # SUMMARY REPORT PRINT
        # -------------------------------------------------------------
        print("\n==================================================")
        print("MIGRATION SUMMARY TO NEON POSTGRESQL")
        print("==================================================")
        print(f"{'TABLE NAME':<25} | {'SOURCE COUNT':<12} | {'INSERTED':<10} | {'SKIPPED':<10}")
        print("-" * 65)
        for tbl, s in report_stats.items():
            print(f"{tbl:<25} | {s['source']:<12} | {s['inserted']:<10} | {s['skipped']:<10}")
        print("==================================================")
        print("MPLADS Real Data Ingestion Completed Successfully!")
        print("==================================================")

    except Exception as e:
        session.rollback()
        logger.error(f"Error during import: {e}")
        raise e
    finally:
        session.close()

if __name__ == "__main__":
    import_mplads_data()
