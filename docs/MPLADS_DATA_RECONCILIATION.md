# MPLADS Data Reconciliation Report

This document details the exact matching strategies, identifier reconciliation logic, and relationship mappings across the six official MPLADS datasets.

## 1. Overview of Primary Work Identifiers

| Dataset Name | Primary Identifier Column Name | Sample Identifier Value | Total Rows | Unique Identifiers |
| :--- | :--- | :--- | :--- | :--- |
| **Works Recommended** | `WORK` | `WS/MP423/2024-2025/133947` | 11,001 | 10,831 |
| **Works Sanctioned** | `Work` | `WS/MP423/2024-2025/133947` | 11,001 | 11,001 |
| **Works Completed** | `Work` | `WS/MP423/2024-2025/133947` | 33,857 | 33,857 |
| **Expenditure** | `Work ID` | `WS/MP423/2024-2025/133947` | 16,001 | 11,256 |
| **Allocated Limit** | *None (MP/Constituency level)* | N/A | 544 | N/A |
| **Amount consented for Calamity** | *None (Calamity level)* | N/A | 13 | N/A |

## 2. Reconciliation & Overlap Metrics

### 2.1 Recommended vs Sanctioned Overlap
- **Recommended Unique Works**: 10,831
- **Sanctioned Unique Works**: 11,001
- **Exact Overlapping Work IDs**: **10,785**
- **Reconciliation Strategy**: Join on `TRIM(UPPER(WORK)) = TRIM(UPPER(Work))`. Matches yield complete recommended date, sanction date, recommended amount, sanction amount, and sanction status.

### 2.2 Expenditure Transactions Rollup
- **Total Expenditure Records**: 16,001 payment transactions.
- **Unique Work IDs in Expenditure**: 11,256.
- **Expenditure Aggregation Rules**:
  - `total_disbursed_amount = SUM(fund_disbursed_amount)` per `Work ID`.
  - `expenditure_transaction_count = COUNT(id)` per `Work ID`.
  - `vendor_count = COUNT(DISTINCT vendor_name)` per `Work ID`.
  - Payment status is flagged as `COMPLETED` if all transactions show payment completion, else `IN_PROGRESS`.

### 2.3 Completed Works Reconciliation
- **Total Completed Rows**: 33,857 records.
- **Aggregation Rules**: Group by `Work` identifier, taking the maximum `Completion Date` and summing `Amount Disbursed`.

## 3. Handling Unmatched & Standalone Datasets

1. **Allocated Limits (544 Rows)**: MP and Constituency financial allocations. Joined to canonical representations strictly by `TRIM(UPPER(Constituency))` and `TRIM(UPPER(MP_Name))`.
2. **Calamity Consents (13 Rows)**: Standalone financial consents for national/state calamities (e.g. COVID-19, floods). Preserved in `mplads_calamity_consent` table without artificial joins to project records.
