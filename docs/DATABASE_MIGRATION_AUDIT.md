# Database Migration Audit — MPLADS AI Monitor / NetSage AI

**Date**: September 01, 2026  
**Target Environment**: Neon PostgreSQL (`postgresql://...ep-late-hill-ay7whac4-pooler.c-5.us-east-2.aws.neon.tech/neondb`)  
**Production Host**: Render FastAPI (`https://sih-winner-2026.onrender.com`)  
**Frontend**: Vercel Next.js/React (`https://sih-winner-2026-indol.vercel.app`)

---

## 1. Project Data Source Inventory

| File / Location | Current Data Source | Used By | Production Safe? | Required Change |
|---|---|---|---|---|
| `backend/mplads.db` | Local SQLite database file | Local backend development fallback (`backend/app/config.py`) | ❌ NO (Local file system database) | Retain for local dev fallback only. Disallow in production mode (`ENV=production`). |
| `src/data/Works Recommended.csv` | Static CSV file (3.5MB) | ETL ingest pipeline (`backend/etl/import_datasets.py`) | ❌ NO (Static CSV dataset) | Migrate records into PostgreSQL `projects` and `project_recommendations` tables. |
| `src/data/Works Sanctioned.csv` | Static CSV file (3.7MB) | ETL ingest pipeline (`backend/etl/import_datasets.py`) | ❌ NO (Static CSV dataset) | Migrate records into PostgreSQL `projects` and `project_sanctions` tables. |
| `src/data/Works Completed.csv` | Static CSV file (10.7MB) | ETL ingest pipeline (`backend/etl/import_datasets.py`) | ❌ NO (Static CSV dataset) | Migrate records into PostgreSQL `projects` and `project_completions` tables. |
| `src/data/Expenditure on Completed and On-going Works as on Date.csv` | Static CSV file (4.1MB) | ETL ingest pipeline (`backend/etl/import_datasets.py`) | ❌ NO (Static CSV dataset) | Migrate records into PostgreSQL `project_expenditures` table. |
| `src/data/Allocated Limit for Honble MPs.csv` | Static CSV file (35KB) | ETL ingest pipeline (`backend/etl/import_datasets.py`) | ❌ NO (Static CSV dataset) | Migrate records into PostgreSQL `mp_allocations` table. |
| `src/data/Amount consented for Calamity.csv` | Static CSV file (1.3KB) | ETL ingest pipeline (`backend/etl/import_datasets.py`) | ❌ NO (Static CSV dataset) | Migrate records into PostgreSQL `calamity_consents` table. |
| `src/data/mockData.ts` | Hardcoded TypeScript mock arrays | Citizen report / Track complaint frontend components | ❌ NO (Client-side mock data) | Connect frontend citizen report and complaint tracking to FastAPI REST endpoints backed by PostgreSQL. |
| `src/data/dashboardMockData.ts` | Hardcoded TypeScript mock arrays | Admin dashboard UI components (`AdminAuditLogTable.tsx`, `AdminUserTable.tsx`, `AdminSystemHealth.tsx`, `AlertCenterTable.tsx`, `RiskBreakdownCard.tsx`) | ❌ NO (Client-side mock data) | Connect admin UI components to live PostgreSQL-backed FastAPI API endpoints. |
| `backend/app/config.py` | Configuration file | FastAPI app settings & database URL resolver | ⚠️ PARTIAL | Update to enforce PostgreSQL when `ENV=production` or `RENDER` is set, raising explicit errors if `DATABASE_URL` is missing. |
| `backend/app/database.py` | Database engine initializer | SQLAlchemy SessionLocal creator | ⚠️ PARTIAL | Ensure engine ping check (`pool_pre_ping=True`) and strictly enforce PostgreSQL in production without silent SQLite fallback. |

---

## 2. Component-by-Component Analysis & Production Enforcement

### 2.1 Backend API Routers (`backend/app/routers/`)
- **Projects Router** (`projects.py`): Queries SQLAlchemy `db.query(Project)`. Safe for PostgreSQL production.
- **Dashboard Router** (`dashboard.py`): Calculates live aggregate metrics from `db.query(Project)` and `db.query(ProjectExpenditure)`. Safe for PostgreSQL production.
- **Analytics Router** (`analytics.py`): Queries `db.query(Project)` and `db.query(AnomalyResult)`. Safe for PostgreSQL production.
- **Map Router** (`map.py`): Queries `db.query(ProjectLocation)` and `db.query(Project)`. Safe for PostgreSQL production.
- **Financial Router** (`financial.py`): Queries `db.query(ProjectExpenditure)`. Safe for PostgreSQL production.
- **MP Router** (`mp.py`): Queries `db.query(MpAllocation)` and `db.query(Project)`. Safe for PostgreSQL production.
- **Calamities Router** (`calamities.py`): Queries `db.query(CalamityConsent)`. Safe for PostgreSQL production.

### 2.2 Frontend API Clients (`src/services/api.ts`)
- All API methods call `${API_BASE_URL}` (`https://sih-winner-2026.onrender.com/api`).
- Frontend never connects directly to PostgreSQL (maintains `Vercel -> Render FastAPI -> Neon PostgreSQL` architecture).

---

## 3. Migration Action Plan Summary

1. **Strict Production Database Enforcement**: Ensure `backend/app/config.py` and `backend/app/database.py` fail fast if `DATABASE_URL` is invalid in production.
2. **Idempotent Non-Destructive Ingest Script**: Implement `backend/scripts/migrate_to_postgres.py` to seed Neon PostgreSQL from source datasets without dropping or overwriting existing records.
3. **Database Diagnostic & Health Endpoints**: Implement `GET /api/admin/system/database` and update `GET /health` to report active PostgreSQL connection status and table counts.
4. **Execution & Count Verification**: Run one-time migration against Neon PostgreSQL and verify row counts empirically.
