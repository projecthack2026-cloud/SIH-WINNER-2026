#!/usr/bin/env python3
"""
MPLADS AI Monitor — Safe, Idempotent, Non-Destructive PostgreSQL Migration Script
Migrates local CSV / SQLite datasets into Neon PostgreSQL as the single source of truth.
"""
import os
import sys
import logging
import pandas as pd
import numpy as np
from sqlalchemy import text, func

# Ensure backend root is on sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.config import settings
from app.database import engine, Base
from app.models.models import (
    User, Project, ProjectRecommendation, ProjectSanction, ProjectCompletion,
    ProjectExpenditure, MpAllocation, CalamityConsent, ProjectFeature,
    AnomalyResult, RiskScore, ProjectLocation
)
from etl.clean_datasets import clean_currency, clean_date, clean_string
from etl.normalize_datasets import extract_canonical_work_id
from etl.process_locations import run_location_processing

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger("PostgresMigrator")

DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "src", "data"))

def read_csv_safe(file_name: str) -> pd.DataFrame:
    path = os.path.join(DATA_DIR, file_name)
    if not os.path.exists(path):
        logger.warning(f"Dataset CSV not found at: {path}")
        return pd.DataFrame()
    try:
        df = pd.read_csv(path, encoding='utf-8-sig')
    except Exception:
        df = pd.read_csv(path, encoding='latin1')
    return df

def is_valid_csv_data_row(row):
    sr_no = str(row.get('Sr. No.', '')).strip()
    if not sr_no or sr_no.lower() in ('grand total', 'total', 'subtotal'):
        return False
    if not sr_no.replace('.', '', 1).isdigit():
        return False
    return True

def print_banner():
    print("==================================================")
    print("DATABASE TARGET:")
    print("PostgreSQL")
    print()
    print("DATABASE SOURCE:")
    print("Local CSV / SQLite datasets")
    print()
    print("MODE:")
    print("NON-DESTRUCTIVE")
    print("==================================================")

def seed_default_users(db_session):
    default_users = [
        {"username": "admin", "email": "admin@mplads.gov.in", "role": "admin", "full_name": "System Administrator", "state": "All", "district": "All"},
        {"username": "mp_demouser", "email": "mp@sansad.nic.in", "role": "mp", "full_name": "Hon'ble MP User", "state": "Maharashtra", "district": "Mumbai North", "constituency": "Mumbai North"},
        {"username": "district_collector", "email": "collector@nic.in", "role": "district", "full_name": "District Magistrate", "state": "Maharashtra", "district": "Mumbai North"},
        {"username": "state_nodal", "email": "nodal@state.gov.in", "role": "state", "full_name": "State Nodal Officer", "state": "Maharashtra"},
        {"username": "ministry_viewer", "email": "moSPI@gov.in", "role": "ministry", "full_name": "MoSPI Ministry Auditor", "state": "All"}
    ]
    inserted, skipped = 0, 0
    for u in default_users:
        existing = db_session.query(User).filter(User.username == u["username"]).first()
        if not existing:
            db_session.add(User(**u))
            inserted += 1
        else:
            skipped += 1
    db_session.commit()
    return len(default_users), inserted, skipped

def migrate_to_postgres():
    print_banner()

    # Step 1: Verify PostgreSQL connection
    db_url = settings.DATABASE_URL
    if not db_url.startswith(("postgresql", "postgres")):
        logger.error(f"DATABASE_URL does not point to PostgreSQL: {db_url[:20]}...")
        sys.exit(1)

    logger.info("Connecting to target Neon PostgreSQL database...")
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        logger.info("Successfully connected to PostgreSQL!")
    except Exception as e:
        logger.error(f"Failed to connect to PostgreSQL: {e}")
        sys.exit(1)

    # Step 2: Ensure schema tables exist safely
    logger.info("Verifying/creating database schema tables...")
    Base.metadata.create_all(bind=engine)

    from sqlalchemy.orm import sessionmaker
    SessionLocal = sessionmaker(bind=engine)
    session = SessionLocal()

    report_stats = {}

    try:
        # -------------------------------------------------------------
        # STEP 3: SEED USERS
        # -------------------------------------------------------------
        src_u, ins_u, skip_u = seed_default_users(session)
        report_stats["users"] = {"source": src_u, "inserted": ins_u, "skipped": skip_u}
        logger.info(f"Users migration complete: {ins_u} inserted, {skip_u} skipped.")

        # -------------------------------------------------------------
        # STEP 4: CANONICAL PROJECTS & RELATIONS
        # -------------------------------------------------------------
        raw_projects = {}

        # 4a. Recommendations
        df_rec = read_csv_safe("Works Recommended.csv")
        rec_rows = len(df_rec)
        for idx, row in df_rec.iterrows():
            raw_work = str(row.get('WORK', ''))
            canonical_id = extract_canonical_work_id(raw_work) or f"REC-GEN-{idx+1}"
            category = clean_string(row.get('Work category'))
            state = clean_string(row.get('State'))
            ida = clean_string(row.get('IDA'))
            mp_name = clean_string(row.get("Hon'ble Members of Parliament"))
            constituency = clean_string(row.get('Constituency'))
            desc = clean_string(row.get('Work description'))
            rec_date = clean_date(row.get('Recommended date'))
            rec_amount = clean_currency(row.get('RECOMMENDED AMOUNT   ( ₹ )')) or clean_currency(row.get('RECOMMENDED AMOUNT (₹)')) or 0.0
            sanc_date_rec = clean_date(row.get('Sanction Date'))

            if canonical_id not in raw_projects:
                raw_projects[canonical_id] = {
                    "canonical_work_id": canonical_id,
                    "work_category": category,
                    "work_title": clean_string(raw_work) or f"Work {canonical_id}",
                    "work_description": desc,
                    "state": state,
                    "ida": ida,
                    "mp_name": mp_name,
                    "constituency": constituency,
                    "recommended_date": rec_date,
                    "sanction_date": sanc_date_rec,
                    "recommended_amount": rec_amount,
                    "sanctioned_amount": 0.0,
                    "completion_date": None,
                    "completed_amount": 0.0,
                    "current_status": "Recommended"
                }

        # 4b. Sanctions
        df_sanc = read_csv_safe("Works Sanctioned.csv")
        sanc_rows = len(df_sanc)
        for idx, row in df_sanc.iterrows():
            raw_work = str(row.get('Work', ''))
            canonical_id = extract_canonical_work_id(raw_work) or f"SANC-GEN-{idx+1}"
            category = clean_string(row.get('Work category'))
            state = clean_string(row.get('State'))
            ida = clean_string(row.get('IDA'))
            mp_name = clean_string(row.get("Hon'ble Members of Parliament"))
            constituency = clean_string(row.get('Constituency'))
            desc = clean_string(row.get('Work description'))
            sanc_date = clean_date(row.get('Sanction Date'))
            sanc_amount = clean_currency(row.get('Sanction Amount ( ₹ )')) or clean_currency(row.get('Sanction Amount (₹)')) or 0.0

            if canonical_id not in raw_projects:
                raw_projects[canonical_id] = {
                    "canonical_work_id": canonical_id,
                    "work_category": category,
                    "work_title": clean_string(raw_work) or f"Work {canonical_id}",
                    "work_description": desc,
                    "state": state,
                    "ida": ida,
                    "mp_name": mp_name,
                    "constituency": constituency,
                    "recommended_date": None,
                    "sanction_date": sanc_date,
                    "recommended_amount": 0.0,
                    "sanctioned_amount": sanc_amount,
                    "completion_date": None,
                    "completed_amount": 0.0,
                    "current_status": "Sanctioned"
                }
            else:
                p = raw_projects[canonical_id]
                p["sanctioned_amount"] = sanc_amount
                if sanc_date: p["sanction_date"] = sanc_date
                if p["current_status"] == "Recommended": p["current_status"] = "Sanctioned"

        # 4c. Completions
        df_comp = read_csv_safe("Works Completed.csv")
        comp_rows = len(df_comp)
        for idx, row in df_comp.iterrows():
            if not is_valid_csv_data_row(row):
                continue
            raw_work = str(row.get('Work', ''))
            canonical_id = extract_canonical_work_id(raw_work) or f"COMP-GEN-{idx+1}"
            category = clean_string(row.get('Work category'))
            state = clean_string(row.get('State'))
            ida = clean_string(row.get('IDA'))
            mp_name = clean_string(row.get("Hon'ble Members of Parliament"))
            constituency = clean_string(row.get('Constituency'))
            desc = clean_string(row.get('Work description'))
            comp_date = clean_date(row.get('Completion Date'))
            comp_amount = clean_currency(row.get('Cumulative Expenditure as on date ( ₹ )')) or clean_currency(row.get('Cumulative Expenditure as on date (₹)')) or 0.0

            if canonical_id not in raw_projects:
                raw_projects[canonical_id] = {
                    "canonical_work_id": canonical_id,
                    "work_category": category,
                    "work_title": clean_string(raw_work) or f"Work {canonical_id}",
                    "work_description": desc,
                    "state": state,
                    "ida": ida,
                    "mp_name": mp_name,
                    "constituency": constituency,
                    "recommended_date": None,
                    "sanction_date": None,
                    "recommended_amount": 0.0,
                    "sanctioned_amount": comp_amount,
                    "completion_date": comp_date,
                    "completed_amount": comp_amount,
                    "current_status": "Completed"
                }
            else:
                p = raw_projects[canonical_id]
                p["completed_amount"] = comp_amount
                if comp_date: p["completion_date"] = comp_date
                p["current_status"] = "Completed"

        # Bulk insert projects safely into PostgreSQL
        logger.info(f"Aggregated {len(raw_projects)} canonical projects. Ingesting into PostgreSQL...")
        
        # Load existing project canonical IDs from database
        existing_canonical_ids = set(r[0] for r in session.query(Project.canonical_work_id).all())
        
        projects_to_insert = []
        ins_p, skip_p = 0, 0

        for c_id, data in raw_projects.items():
            if c_id in existing_canonical_ids:
                skip_p += 1
            else:
                projects_to_insert.append(data)
                ins_p += 1

        if projects_to_insert:
            batch_size = 5000
            for i in range(0, len(projects_to_insert), batch_size):
                batch = projects_to_insert[i:i + batch_size]
                session.bulk_insert_mappings(Project, batch)
                session.commit()
                logger.info(f"Fast-inserted project batch {i // batch_size + 1}/{(len(projects_to_insert) + batch_size - 1) // batch_size} ({len(batch)} items)")

        report_stats["projects"] = {"source": len(raw_projects), "inserted": ins_p, "skipped": skip_p}
        logger.info(f"Projects migration complete: {ins_p} inserted, {skip_p} skipped.")

        # Build lookup map for canonical_work_id -> project.id
        proj_map = {r.canonical_work_id: r.id for r in session.query(Project.canonical_work_id, Project.id).all()}

        # -------------------------------------------------------------
        # STEP 5: EXPENDITURES MIGRATION
        # -------------------------------------------------------------
        df_exp = read_csv_safe("Expenditure on Completed and On-going Works as on Date.csv")
        exp_rows = len(df_exp)
        logger.info(f"Processing {exp_rows} expenditures...")

        existing_exp_count = session.query(ProjectExpenditure).count()
        if existing_exp_count >= exp_rows:
            ins_exp, skip_exp = 0, exp_rows
        else:
            exp_objects = []
            for idx, row in df_exp.iterrows():
                work_val = str(row.get('Work', ''))
                c_id = extract_canonical_work_id(work_val)
                p_id = proj_map.get(c_id) if c_id else None
                exp_date = clean_date(row.get('Expenditure Date'))
                amt = clean_currency(row.get('Fund Disbursed Amount ( ₹ )')) or clean_currency(row.get('Fund Disbursed Amount (₹)')) or clean_currency(row.get('Fund Disbursed ( ₹ )')) or clean_currency(row.get('Fund Disbursed (₹)')) or 0.0
                vendor = clean_string(row.get('Vendor Name'))
                status_val = clean_string(row.get('Status'))
                st = clean_string(row.get('State'))
                const = clean_string(row.get('Constituency'))
                mp = clean_string(row.get('MP Name'))

                exp_objects.append({
                    "project_id": p_id,
                    "work_id": c_id or f"EXP-{idx+1}",
                    "expenditure_date": exp_date,
                    "vendor_name": vendor,
                    "payment_status": status_val,
                    "fund_disbursed_amount": amt,
                    "state": st,
                    "constituency": const,
                    "mp_name": mp
                })

            batch_size = 5000
            for i in range(0, len(exp_objects), batch_size):
                batch = exp_objects[i:i + batch_size]
                session.bulk_insert_mappings(ProjectExpenditure, batch)
                session.commit()
                logger.info(f"Fast-inserted expenditure batch {i // batch_size + 1}/{(len(exp_objects) + batch_size - 1) // batch_size} ({len(batch)} items)")
            ins_exp, skip_exp = len(exp_objects), 0

        report_stats["project_expenditures"] = {"source": exp_rows, "inserted": ins_exp, "skipped": skip_exp}
        logger.info(f"Expenditures migration complete: {ins_exp} inserted, {skip_exp} skipped.")

        # -------------------------------------------------------------
        # STEP 6: MP ALLOCATIONS & CALAMITIES
        # -------------------------------------------------------------
        df_alloc = read_csv_safe("Allocated Limit for Honble MPs.csv")
        alloc_rows = len(df_alloc)
        existing_alloc_count = session.query(MpAllocation).count()
        if existing_alloc_count >= alloc_rows:
            ins_a, skip_a = 0, alloc_rows
        else:
            alloc_objs = []
            for idx, row in df_alloc.iterrows():
                alloc_objs.append({
                    "state": clean_string(row.get('State')),
                    "mp_name": clean_string(row.get("Hon'ble Members of Parliament")),
                    "constituency": clean_string(row.get('Constituency')),
                    "allocated_amount": clean_currency(row.get('ALLOCATED LIMIT ( ₹ )')) or clean_currency(row.get('ALLOCATED LIMIT (₹)')) or 0.0
                })
            session.bulk_insert_mappings(MpAllocation, alloc_objs)
            session.commit()
            ins_a, skip_a = len(alloc_objs), 0

        report_stats["mp_allocations"] = {"source": alloc_rows, "inserted": ins_a, "skipped": skip_a}

        df_cal = read_csv_safe("Amount consented for Calamity.csv")
        cal_rows = len(df_cal)
        existing_cal_count = session.query(CalamityConsent).count()
        if existing_cal_count >= cal_rows:
            ins_c, skip_c = 0, cal_rows
        else:
            cal_objs = []
            for idx, row in df_cal.iterrows():
                cal_objs.append({
                    "calamity_type": clean_string(row.get('Type of Calamity')),
                    "calamity_name": clean_string(row.get('Name of Calamity')),
                    "mp_name": clean_string(row.get('Name of MP')),
                    "consent_date": clean_date(row.get('Date of Consent')),
                    "consent_amount": clean_currency(row.get('Amount Consented ( ₹ )')) or clean_currency(row.get('Amount Consented (₹)')) or 0.0
                })
            session.bulk_insert_mappings(CalamityConsent, cal_objs)
            session.commit()
            ins_c, skip_c = len(cal_objs), 0

        report_stats["calamity_consents"] = {"source": cal_rows, "inserted": ins_c, "skipped": skip_c}

        # -------------------------------------------------------------
        # STEP 7: GEOSPATIAL & ANOMALY FEATURE POPULATION
        # -------------------------------------------------------------
        loc_cnt = session.query(ProjectLocation).count()
        if loc_cnt == 0:
            try:
                session.close()
            except Exception:
                pass

            logger.info("Processing location extraction and geocoding for projects...")
            run_location_processing(limit=1000)

            # Refresh session safely after long location extraction execution
            try:
                session.close()
            except Exception:
                pass
            session = SessionLocal()

        location_count = session.query(ProjectLocation).count()
        report_stats["project_locations"] = {"source": location_count, "inserted": location_count, "skipped": 0}

        # Compute feature analytics & anomaly results
        logger.info("Generating project features and anomaly risk results...")
        existing_feat_pids = set(r[0] for r in session.query(ProjectFeature.project_id).all())
        
        if len(existing_feat_pids) < session.query(Project).count():
            # Perform grouped aggregation in 1 query for super high performance
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
        print("PostgreSQL migration finished successfully!")
        print("==================================================\n")

    except Exception as e:
        session.rollback()
        logger.error(f"Migration error occurred: {e}", exc_info=True)
        sys.exit(1)
    finally:
        session.close()

if __name__ == "__main__":
    migrate_to_postgres()
