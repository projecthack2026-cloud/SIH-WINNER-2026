# PostgreSQL Migration Report — Single Source of Truth

**Project Name**: NetSage AI / MPLADS AI Monitor (SIP Project 2026)  
**Date**: September 01, 2026  
**Status**: **COMPLETED & VERIFIED**

---

## 1. Executive Summary

"PostgreSQL is the production runtime source of truth."

The MPLADS AI Monitor FastAPI backend and React/Vercel frontend architecture have been updated to rely exclusively on **Neon PostgreSQL** as the single source of truth for all production application runtime data.

No local SQLite files (`mplads.db`, `netsage.db`), static CSV datasets, or hardcoded mock JSON objects are read during production application execution.

---

## 2. Architecture Comparison

### Previous Architecture (Development/Fallback State):
```
Vercel Frontend
      ↓
Render FastAPI Backend
      ↓
Local SQLite (mplads.db) / CSV files / Hardcoded Mock Arrays
```

### New Single Source of Truth Architecture:
```
Vercel Frontend (https://sih-winner-2026-indol.vercel.app)
      ↓ REST API (VITE_API_BASE_URL)
Render FastAPI Backend (https://sih-winner-2026.onrender.com)
      ↓ SQLAlchemy ORM (DATABASE_URL)
Neon PostgreSQL Database (ep-late-hill-ay7whac4-pooler.c-5.us-east-2.aws.neon.tech/neondb)
```

---

## 3. Database Connection Configuration

- **Environment Variable**: `DATABASE_URL`
- **Neon PostgreSQL Connection String**:
  `postgresql://neondb_owner:npg_7UQHTjk8iACa@ep-late-hill-ay7whac4-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
- **Source Code Protection**: No hardcoded credentials exist in source code files. Secrets are dynamically loaded via `os.getenv("DATABASE_URL")`.
- **Production Strictness Enforcement**:
  In `backend/app/config.py` and `backend/app/database.py`, if `ENV=production` or `RENDER` is detected, the backend strictly validates that `DATABASE_URL` points to PostgreSQL. Silent fallbacks to SQLite in production are strictly forbidden and throw a `RuntimeError`.

---

## 4. Database Tables & Schema

All 20 SQLAlchemy models in `backend/app/models/models.py` are mapped to PostgreSQL:

1. `users` — System user accounts and role definitions
2. `projects` — Aggregated canonical MPLADS infrastructure projects
3. `project_recommendations` — Recommendations stage work records
4. `project_sanctions` — Sanctioned work records
5. `project_completions` — Completed work records with image links
6. `project_expenditures` — Disbursed transaction log records & vendor mappings
7. `mp_allocations` — MP financial entitlement limits
8. `calamity_consents` — Calamity relief funds consents
9. `project_features` — AI analytics metrics (utilization rates, transaction counts)
10. `anomaly_results` — Algorithmic risk indicators & financial irregularity flags
11. `risk_scores` — Risk scores (overall, delay, financial, vendor)
12. `project_locations` — Extracted location phrases, geocoded lat/lng & confidence metrics
13. `citizen_complaints` — Public complaints and tracking tickets
14. `complaint_evidence` — Uploaded file metadata for complaints
15. `audit_logs` — Activity and status change tracking logs
16. `duplicate_candidates` — Duplicate work matching candidates
17. `compliance_results` — Rule compliance assessments
18. `documents` — Project sanction & utilization documents
19. `document_extractions` — Document text extractions
20. `satellite_observations` — Satellite observations & progress estimates

---

## 5. Source Datasets & Idempotent Migration

### Source Datasets Migrated:
- `src/data/Works Recommended.csv` (3.5MB)
- `src/data/Works Sanctioned.csv` (3.7MB)
- `src/data/Works Completed.csv` (10.7MB)
- `src/data/Expenditure on Completed and On-going Works as on Date.csv` (4.1MB)
- `src/data/Allocated Limit for Honble MPs.csv` (35KB)
- `src/data/Amount consented for Calamity.csv` (1.3KB)

### Migration Script:
`backend/scripts/migrate_to_postgres.py`

### Non-Destructive & Idempotent Design:
- **No Destruction**: Never executes `DROP TABLE`, `DELETE FROM`, or `TRUNCATE`.
- **Uniqueness Checks**: Validates canonical identifiers (`canonical_work_id`, `username`, unique constraint keys) prior to insertion.
- **Repeatable Execution**: Re-running `python backend/scripts/migrate_to_postgres.py` safely skips existing records without producing duplicate rows.

---

## 6. One-Time Migration Command

To run or re-verify the migration:
```bash
$env:PYTHONPATH='backend'; python backend/scripts/migrate_to_postgres.py
```

Output format:
```
==================================================
DATABASE TARGET:
PostgreSQL

DATABASE SOURCE:
Local CSV / SQLite datasets

MODE:
NON-DESTRUCTIVE
==================================================
```

---

## 7. Diagnostics & Health Monitoring Endpoints

### Database System Diagnostic Endpoint:
`GET /api/admin/system/database`
Returns active connection status and live table counts without exposing password credentials:
```json
{
  "database_type": "postgresql",
  "connected": true,
  "tables": {
    "users": 5,
    "projects": 37069,
    "project_expenditures": 14008,
    "mp_allocations": 798,
    "calamity_consents": 13,
    "project_locations": 1000,
    "project_features": 37069,
    "anomaly_results": 120,
    "citizen_complaints": 0,
    "audit_logs": 0
  }
}
```

### Health Check Endpoint:
`GET /health` and `GET /api/health`
```json
{
  "status": "ok",
  "database": "connected",
  "database_type": "postgresql"
}
```

---

## 8. Render Deployment Guide

To deploy the update on Render:
1. Go to your Render Dashboard -> Service Settings for `sih-winner-2026`.
2. Under **Environment Variables**, set:
   - `DATABASE_URL` = `postgresql://neondb_owner:npg_7UQHTjk8iACa@ep-late-hill-ay7whac4-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
   - `ENV` = `production`
3. Click **Save Changes** and trigger a manual redeploy.

---

## 9. Verification Summary

1. **Database Connectivity**: Connected & verified to Neon PostgreSQL (`ep-late-hill-ay7whac4-pooler.c-5.us-east-2.aws.neon.tech`).
2. **Schema Tables**: All tables created cleanly.
3. **Idempotency**: Checked against duplicate insertion.
4. **Production Runtime**: Strictly uses PostgreSQL; local SQLite/datasets reserved exclusively for local development and migration.
