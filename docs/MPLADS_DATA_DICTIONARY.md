# MPLADS Data Dictionary

Official data dictionary mapping source CSV columns to target PostgreSQL database table schemas.

## Table: `mplads_recommended` (Source: `Works Recommended.csv`)

| Source Column Name | Recommended PostgreSQL Column | Data Type | Nullable | Description & Business Rules |
| :--- | :--- | :--- | :--- | :--- |
| `Sr. No.` | `sr_no` | `INTEGER` | NO | Source column from `Works Recommended.csv` |
| `Work category` | `work_category` | `VARCHAR(255)` | NO | Source column from `Works Recommended.csv` |
| `WORK` | `work` | `TEXT` | NO | Source column from `Works Recommended.csv` |
| `State` | `state` | `VARCHAR(255)` | NO | Source column from `Works Recommended.csv` |
| `IDA` | `ida` | `VARCHAR(255)` | NO | Source column from `Works Recommended.csv` |
| `Hon'ble Members of Parliament` | `mp_name` | `VARCHAR(255)` | NO | Source column from `Works Recommended.csv` |
| `Constituency` | `constituency` | `VARCHAR(255)` | NO | Source column from `Works Recommended.csv` |
| `Work description` | `work_description` | `TEXT` | YES | Source column from `Works Recommended.csv` |
| `Recommended date` | `recommended_date` | `NUMERIC(15, 2)` | NO | Source column from `Works Recommended.csv` |
| `RECOMMENDED AMOUNT   ( ₹ )` | `recommended_amount` | `NUMERIC(15, 2)` | NO | Source column from `Works Recommended.csv` |
| `Sanction Date` | `sanction_date` | `NUMERIC(15, 2)` | YES | Source column from `Works Recommended.csv` |

---

## Table: `mplads_completed` (Source: `Works Completed.csv`)

| Source Column Name | Recommended PostgreSQL Column | Data Type | Nullable | Description & Business Rules |
| :--- | :--- | :--- | :--- | :--- |
| `Sr. No.` | `sr_no` | `INTEGER` | NO | Source column from `Works Completed.csv` |
| `Work Category` | `work_category` | `VARCHAR(255)` | NO | Source column from `Works Completed.csv` |
| `Work` | `work` | `TEXT` | NO | Source column from `Works Completed.csv` |
| `State` | `state` | `VARCHAR(255)` | NO | Source column from `Works Completed.csv` |
| `IDA` | `ida` | `VARCHAR(255)` | NO | Source column from `Works Completed.csv` |
| `Work Description` | `work_description` | `TEXT` | YES | Source column from `Works Completed.csv` |
| `Hon'ble Members of Parliament` | `mp_name` | `VARCHAR(255)` | NO | Source column from `Works Completed.csv` |
| `Constituency` | `constituency` | `VARCHAR(255)` | NO | Source column from `Works Completed.csv` |
| `Image` | `image` | `VARCHAR(255)` | YES | Source column from `Works Completed.csv` |
| `Completion Date` | `completion_date` | `DATE` | NO | Source column from `Works Completed.csv` |
| `Amount Disbursed ( ₹ )` | `amount_disbursed` | `NUMERIC(15, 2)` | YES | Source column from `Works Completed.csv` |

---

## Table: `mplads_expenditure` (Source: `Expenditure on Completed and On-going Works as on Date.csv`)

| Source Column Name | Recommended PostgreSQL Column | Data Type | Nullable | Description & Business Rules |
| :--- | :--- | :--- | :--- | :--- |
| `Sr. No.` | `sr_no` | `INTEGER` | NO | Source column from `Expenditure on Completed and On-going Works as on Date.csv` |
| `State` | `state` | `VARCHAR(255)` | NO | Source column from `Expenditure on Completed and On-going Works as on Date.csv` |
| `Work` | `work` | `TEXT` | NO | Source column from `Expenditure on Completed and On-going Works as on Date.csv` |
| `Work ID` | `work_id` | `VARCHAR(255)` | NO | Source column from `Expenditure on Completed and On-going Works as on Date.csv` |
| `IDA` | `ida` | `VARCHAR(255)` | NO | Source column from `Expenditure on Completed and On-going Works as on Date.csv` |
| `Hon'ble Members of Parliament` | `mp_name` | `VARCHAR(255)` | NO | Source column from `Expenditure on Completed and On-going Works as on Date.csv` |
| `Constituency` | `constituency` | `VARCHAR(255)` | NO | Source column from `Expenditure on Completed and On-going Works as on Date.csv` |
| `Expenditure Date` | `expenditure_date` | `NUMERIC(15, 2)` | NO | Source column from `Expenditure on Completed and On-going Works as on Date.csv` |
| `Vendor Name` | `vendor_name` | `VARCHAR(255)` | NO | Source column from `Expenditure on Completed and On-going Works as on Date.csv` |
| `Payment Status` | `payment_status` | `VARCHAR(255)` | NO | Source column from `Expenditure on Completed and On-going Works as on Date.csv` |
| `Fund Disbursed Amount ( ₹ )` | `fund_disbursed_amount` | `NUMERIC(15, 2)` | NO | Source column from `Expenditure on Completed and On-going Works as on Date.csv` |

---

## Table: `mplads_sanctioned` (Source: `Works Sanctioned.csv`)

| Source Column Name | Recommended PostgreSQL Column | Data Type | Nullable | Description & Business Rules |
| :--- | :--- | :--- | :--- | :--- |
| `Sr. No.` | `sr_no` | `INTEGER` | NO | Source column from `Works Sanctioned.csv` |
| `Work category` | `work_category` | `VARCHAR(255)` | NO | Source column from `Works Sanctioned.csv` |
| `Work` | `work` | `TEXT` | NO | Source column from `Works Sanctioned.csv` |
| `State` | `state` | `VARCHAR(255)` | NO | Source column from `Works Sanctioned.csv` |
| `IDA` | `ida` | `VARCHAR(255)` | NO | Source column from `Works Sanctioned.csv` |
| `Hon'ble Members of Parliament` | `mp_name` | `VARCHAR(255)` | NO | Source column from `Works Sanctioned.csv` |
| `Constituency` | `constituency` | `VARCHAR(255)` | NO | Source column from `Works Sanctioned.csv` |
| `Work description` | `work_description` | `TEXT` | YES | Source column from `Works Sanctioned.csv` |
| `Recommended date` | `recommended_date` | `NUMERIC(15, 2)` | NO | Source column from `Works Sanctioned.csv` |
| `Sanction Date` | `sanction_date` | `NUMERIC(15, 2)` | NO | Source column from `Works Sanctioned.csv` |
| `Sanction Amount ( ₹ )` | `sanction_amount` | `NUMERIC(15, 2)` | NO | Source column from `Works Sanctioned.csv` |
| `Work Status` | `work_status` | `VARCHAR(255)` | NO | Source column from `Works Sanctioned.csv` |

---

## Table: `mplads_allocated` (Source: `Allocated Limit for Honble MPs.csv`)

| Source Column Name | Recommended PostgreSQL Column | Data Type | Nullable | Description & Business Rules |
| :--- | :--- | :--- | :--- | :--- |
| `Sr. No.` | `sr_no` | `INTEGER` | NO | Source column from `Allocated Limit for Honble MPs.csv` |
| `State` | `state` | `VARCHAR(255)` | NO | Source column from `Allocated Limit for Honble MPs.csv` |
| `Hon'ble Members of Parliaments` | `mp_names` | `VARCHAR(255)` | NO | Source column from `Allocated Limit for Honble MPs.csv` |
| `Constituency` | `constituency` | `VARCHAR(255)` | NO | Source column from `Allocated Limit for Honble MPs.csv` |
| `Allocated AMOUNT ( ₹ )` | `allocated_amount` | `NUMERIC(15, 2)` | YES | Source column from `Allocated Limit for Honble MPs.csv` |

---

## Table: `mplads_calamity` (Source: `Amount consented for Calamity.csv`)

| Source Column Name | Recommended PostgreSQL Column | Data Type | Nullable | Description & Business Rules |
| :--- | :--- | :--- | :--- | :--- |
| `Sr. No.` | `sr_no` | `INTEGER` | NO | Source column from `Amount consented for Calamity.csv` |
| `Calamity Type` | `calamity_type` | `VARCHAR(255)` | NO | Source column from `Amount consented for Calamity.csv` |
| `Calamity Name` | `calamity_name` | `VARCHAR(255)` | NO | Source column from `Amount consented for Calamity.csv` |
| `Hon'ble Members of Parliament` | `mp_name` | `VARCHAR(255)` | NO | Source column from `Amount consented for Calamity.csv` |
| `Date of Consent` | `date_of_consent` | `NUMERIC(15, 2)` | NO | Source column from `Amount consented for Calamity.csv` |
| `Consent Amount ( ₹ )` | `consent_amount` | `NUMERIC(15, 2)` | NO | Source column from `Amount consented for Calamity.csv` |

---

