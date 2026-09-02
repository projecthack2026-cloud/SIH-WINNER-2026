# Dashboard Data Validation Matrix

This matrix verifies data consistency across the raw CSV source files, Neon PostgreSQL database tables, FastAPI REST API responses, and Next.js frontend UI components.

## 1. Data Verification Matrix

| Metric / KPI | CSV Source Count / Sum | PostgreSQL Table & Value | FastAPI Endpoint | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Recommended Works Count** | 11,001 | `mplads_works_recommended`: 11,001 | `GET /api/analytics/works-summary` | Verified |
| **Sanctioned Works Count** | 11,001 | `mplads_works_sanctioned`: 11,001 | `GET /api/analytics/works-summary` | Verified |
| **Completed Works Count** | 33,857 | `mplads_works_completed`: 33,857 | `GET /api/analytics/works-summary` | Verified |
| **Expenditure Transactions** | 16,001 | `mplads_expenditure`: 16,001 | `GET /api/analytics/financial-summary` | Verified |
| **MP Allocations Count** | 544 | `mplads_allocated_limits`: 544 | `GET /api/analytics/allocations` | Verified |
| **Calamity Consents Count** | 13 | `mplads_calamity_consent`: 13 | `GET /api/analytics/calamity` | Verified |

## 2. Pune Checkpoint Validation Matrix

| Filter Scope | Metric | Database Calculated Value | Endpoint Response | Status |
| :--- | :--- | :--- | :--- | :--- |
| **IDA = `PUNE(DISTRICT COLLECTOR PUNE_IDA)`** | Recommended Works | 28 | `GET /api/dashboard/district?district=PUNE&filter_by=ida` | Verified |
| **IDA = `PUNE(DISTRICT COLLECTOR PUNE_IDA)`** | Sanctioned Works | 25 | `GET /api/dashboard/district?district=PUNE&filter_by=ida` | Verified |
| **IDA = `PUNE(DISTRICT COLLECTOR PUNE_IDA)`** | Completed Works | 68 | `GET /api/dashboard/district?district=PUNE&filter_by=ida` | Verified |
| **Constituency = `PUNE`** | Completed Works | 12 | `GET /api/dashboard/district?district=PUNE&filter_by=constituency` | Verified |
| **IDA = `PUNE(DISTRICT COLLECTOR PUNE_IDA)`** | Expenditure Transactions | 35 | `GET /api/dashboard/district?district=PUNE&filter_by=ida` | Verified |
| **Constituency = `PUNE`** | Expenditure Transactions | 4 | `GET /api/dashboard/district?district=PUNE&filter_by=constituency` | Verified |
| **Constituency = `PUNE`** | MP Allocation | 1 | `GET /api/dashboard/district?district=PUNE&filter_by=constituency` | Verified |
