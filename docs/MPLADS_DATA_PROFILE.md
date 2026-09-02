# MPLADS Real Datasets Profile & Metrics Report

This document summarizes the exact profiling metrics derived directly from the six official MPLADS CSV datasets.

## 1. Executive Dataset Summary

| Dataset Key | Filename | Row Count | Column Count | Distinct States | Distinct Constituencies | Distinct MPs | Distinct IDAs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `recommended` | `Works Recommended.csv` | 11,001 | 11 | 30 | 295 | 295 | 397 |
| `completed` | `Works Completed.csv` | 33,857 | 11 | 34 | 502 | 502 | 669 |
| `expenditure` | `Expenditure on Completed and On-going Works as on Date.csv` | 16,001 | 11 | 36 | 490 | 490 | 652 |
| `sanctioned` | `Works Sanctioned.csv` | 11,001 | 12 | 32 | 296 | 296 | 405 |
| `allocated` | `Allocated Limit for Honble MPs.csv` | 544 | 5 | 37 | 543 | 544 | 0 |
| `calamity` | `Amount consented for Calamity.csv` | 13 | 6 | 0 | 0 | 11 | 0 |

## 2. Dataset Specific Profiles

### 2.1 Works Recommended.csv

- **Total Records**: 11,001
- **Total Columns**: 11

#### Columns & Nullability

| Column Name | Null Count | Null % | Distinct Values | Sample Values |
| :--- | :--- | :--- | :--- | :--- |
| `Sr. No.` | 0 | 0.0% | 11,001 | `1, 2, 3` |
| `Work category` | 0 | 0.0% | 5 | `Normal/Others, Trust and Society, Repair and Renovation` |
| `WORK` | 0 | 0.0% | 10,831 | `WS/	 MP620/2024-2025/133166-Construction of buildings for community cultural activities, WS/	 MP620/2025-2026/133167-Construction of rooms and halls in school and colleges, WS/	 MP620/2024-2025/133190-Construction of buildings for community cultural activities` |
| `State` | 0 | 0.0% | 30 | `Karnataka, Bihar, West Bengal` |
| `IDA` | 0 | 0.0% | 397 | `DHARWAD(DEPUTY COMMISSIONER DHARWAR_IDA), HAVERI(DEPUTY COMMISSIONER HAVERI_IDA), ARARIA(DISTRICT PLANNING OFFICER ARARIA_IDA)` |
| `Hon'ble Members of Parliament` | 0 | 0.0% | 295 | `Pralhad Venkatesh Joshi, Pradeep Kumar Singh, Dr Sukanta Majumdar` |
| `Constituency` | 0 | 0.0% | 295 | `DHARWAD, ARARIA, BALURGHAT` |
| `Work description` | 44 | 0.4% | 10,019 | `Construction of Community Bhavan at Navalgund TQ Belavatagi Village Pry No 1/A Near Shivanand Math Continue Work, Construction of College room of  CBS Charitable Foudation at Nulvi Vilage Pry No 817/3 Continued work, Construction of Community Bhavan of Veerashaiv Jangam Society (R) at Ward No 21 Chidamarnagar Dharwad` |
| `Recommended date` | 0 | 0.0% | 159 | `08-Jul-2024, 09-Jul-2024, 12-Jul-2024` |
| `RECOMMENDED AMOUNT   ( ₹ )` | 0 | 0.0% | 2,940 | `497185, 500000, 450000` |
| `Sanction Date` | 216 | 1.96% | 485 | `09-Jul-2024, 18-Sep-2025, 23-Sep-2024` |

#### Financial Column Aggregates

| Financial Column | Min Value (₹) | Max Value (₹) | Mean Value (₹) | Total Sum (₹) |
| :--- | :--- | :--- | :--- | :--- |
| `Recommended date` | ₹0.00 | ₹0.00 | ₹0.00 | ₹0.00 |
| `RECOMMENDED AMOUNT   ( ₹ )` | ₹12,881.00 | ₹46,470,400.00 | ₹534,091.12 | ₹5,875,002,275.78 |
| `Sanction Date` | ₹56,144,794,565.27 | ₹56,144,794,565.27 | ₹56,144,794,565.27 | ₹56,144,794,565.27 |

#### Date Ranges

| Date Column | Earliest Date | Latest Date | Valid Date Count |
| :--- | :--- | :--- | :--- |
| `Recommended date` | 2024-07-08 | 2025-10-02 | 11,000 |
| `Sanction Date` | 2024-07-09 | 2026-08-22 | 10,784 |

---

### 2.2 Works Completed.csv

- **Total Records**: 33,857
- **Total Columns**: 11

#### Columns & Nullability

| Column Name | Null Count | Null % | Distinct Values | Sample Values |
| :--- | :--- | :--- | :--- | :--- |
| `Sr. No.` | 0 | 0.0% | 33,857 | `1, 2, 3` |
| `Work Category` | 0 | 0.0% | 4 | `Normal/Others, Repair and Renovation, Trust and Society` |
| `Work` | 0 | 0.0% | 33,857 | `WS/MP418/2024-2025/133409-Construction of roads, link roads, pathways or any other road with or without drainage system, WS/MP18152/2024-2025/133691-Construction of rooms and halls in school and colleges, WS/MP345/2024-2025/134140-Construction of roads, link roads, pathways or any other road with or without drainage system` |
| `State` | 0 | 0.0% | 34 | `Bihar, Punjab, Kerala` |
| `IDA` | 0 | 0.0% | 669 | `ARARIA(DISTRICT PLANNING OFFICER ARARIA_IDA), FARIDKOT(DEPUTY COMMISSIONER FARIDKOT_IDA), KOLLAM(DISTRICT COLLECTOR KOLLAM_IDA)` |
| `Work Description` | 79 | 0.23% | 30,480 | `PCC Road from Permeshwar Bhagat house to Ramdev Master house at ward no 15, uder Forbesganj Block., Construction of MID DAY Meal Shed in Govt Primary school Bajakhana (Bus adda), Concreting of road from Janathavayanasala -  Panthaplavil, ward no.6  Thrikkaruva GP, in  Kollam Constituency` |
| `Hon'ble Members of Parliament` | 0 | 0.0% | 502 | `Pradeep Kumar Singh, SARABJEET SINGH KHALSA, Shri NK Premachandran` |
| `Constituency` | 0 | 0.0% | 502 | `ARARIA, FARIDKOT(SC), KOLLAM` |
| `Image` | 9,303 | 27.48% | 2 | `Images,  ` |
| `Completion Date` | 0 | 0.0% | 590 | `05-Sep-2024, 07-Apr-2025, 12-Aug-2024` |
| `Amount Disbursed ( ₹ )` | 96 | 0.28% | 12,647 | `448127, 300000, 293492` |

#### Financial Column Aggregates

| Financial Column | Min Value (₹) | Max Value (₹) | Mean Value (₹) | Total Sum (₹) |
| :--- | :--- | :--- | :--- | :--- |
| `Amount Disbursed ( ₹ )` | ₹8,448.00 | ₹16,266,970,816.40 | ₹963,654.56 | ₹32,533,941,632.80 |

#### Date Ranges

| Date Column | Earliest Date | Latest Date | Valid Date Count |
| :--- | :--- | :--- | :--- |
| `Completion Date` | 2024-08-12 | 2026-08-26 | 33,856 |

---

### 2.3 Expenditure on Completed and On-going Works as on Date.csv

- **Total Records**: 16,001
- **Total Columns**: 11

#### Columns & Nullability

| Column Name | Null Count | Null % | Distinct Values | Sample Values |
| :--- | :--- | :--- | :--- | :--- |
| `Sr. No.` | 0 | 0.0% | 16,001 | `1, 2, 3` |
| `State` | 0 | 0.0% | 36 | `Karnataka, Uttar Pradesh, Madhya Pradesh` |
| `Work` | 0 | 0.0% | 100 | `Construction of footpaths and pedestrian ways, Construction of boundary walls of existing public and community buildings, Construction of buildings for community cultural activities` |
| `Work ID` | 0 | 0.0% | 11,256 | `WS/MP18080/2025-2026/181959, WS/MP18080/2025-2026/181962, WS/MP18080/2025-2026/181818` |
| `IDA` | 0 | 0.0% | 652 | `Chamarajanagar(DEPUTY COMMISSIONER CHAMARAJNAGAR_IDA), GHAZIABAD(DISTRICT MAGISTRAE GHAZIABAD_IDA), INDORE(DISTRICT COLLECTOR INDORE_IDA)` |
| `Hon'ble Members of Parliament` | 0 | 0.0% | 490 | `SUNIL BOSE, ATUL GARG, Shankar Lalwani` |
| `Constituency` | 0 | 0.0% | 490 | `CHAMARAJANAGAR(SC), GHAZIABAD, INDORE` |
| `Expenditure Date` | 0 | 0.0% | 235 | `20-Aug-2026, 21-Aug-2026, 04-Aug-2026` |
| `Vendor Name` | 0 | 0.0% | 8,862 | `KRIDL BHUSIRI ACCOUNT WORKS, DARSH BUILDCON, SHRI GANESH ASSOCIATES PROPRIETOR NARAYAN SHARMA` |
| `Payment Status` | 0 | 0.0% | 3 | `Payment In-Progress, Payment Success,  ` |
| `Fund Disbursed Amount ( ₹ )` | 0 | 0.0% | 7,790 | `250000, 125000, 799146` |

#### Financial Column Aggregates

| Financial Column | Min Value (₹) | Max Value (₹) | Mean Value (₹) | Total Sum (₹) |
| :--- | :--- | :--- | :--- | :--- |
| `Expenditure Date` | ₹0.00 | ₹0.00 | ₹0.00 | ₹0.00 |
| `Fund Disbursed Amount ( ₹ )` | ₹1.00 | ₹27,216,648,659.45 | ₹2,036,408.08 | ₹32,584,565,699.45 |

#### Date Ranges

| Date Column | Earliest Date | Latest Date | Valid Date Count |
| :--- | :--- | :--- | :--- |
| `Expenditure Date` | 2025-06-10 | 2026-08-26 | 16,000 |

---

### 2.4 Works Sanctioned.csv

- **Total Records**: 11,001
- **Total Columns**: 12

#### Columns & Nullability

| Column Name | Null Count | Null % | Distinct Values | Sample Values |
| :--- | :--- | :--- | :--- | :--- |
| `Sr. No.` | 0 | 0.0% | 11,001 | `1, 2, 3` |
| `Work category` | 0 | 0.0% | 5 | `Normal/Others, Trust and Society, Repair and Renovation` |
| `Work` | 0 | 0.0% | 11,001 | `WS/	 MP620/2024-2025/133166-Construction of buildings for community cultural activities, WS/	 MP620/2025-2026/133167-Construction of rooms and halls in school and colleges, WS/	 MP620/2024-2025/133190-Construction of buildings for community cultural activities` |
| `State` | 0 | 0.0% | 32 | `Karnataka, Bihar, West Bengal` |
| `IDA` | 0 | 0.0% | 405 | `DHARWAD(DEPUTY COMMISSIONER DHARWAR_IDA), HAVERI(DEPUTY COMMISSIONER HAVERI_IDA), ARARIA(DISTRICT PLANNING OFFICER ARARIA_IDA)` |
| `Hon'ble Members of Parliament` | 0 | 0.0% | 296 | `Pralhad Venkatesh Joshi, Pradeep Kumar Singh, Dr Sukanta Majumdar` |
| `Constituency` | 0 | 0.0% | 296 | `DHARWAD, ARARIA, BALURGHAT` |
| `Work description` | 44 | 0.4% | 10,023 | `Construction of Community Bhavan at Navalgund TQ Belavatagi Village Pry No 1/A Near Shivanand Math Continue Work, Construction of College room of  CBS Charitable Foudation at Nulvi Vilage Pry No 817/3 Continued work, Construction of Community Bhavan of Veerashaiv Jangam Society (R) at Ward No 21 Chidamarnagar Dharwad` |
| `Recommended date` | 0 | 0.0% | 161 | `08-Jul-2024, 09-Jul-2024, 12-Jul-2024` |
| `Sanction Date` | 0 | 0.0% | 489 | `09-Jul-2024, 18-Sep-2025, 23-Sep-2024` |
| `Sanction Amount ( ₹ )` | 0 | 0.0% | 2,965 | `497185, 500000, 450000` |
| `Work Status` | 0 | 0.0% | 7 | `Physical Inspection, Sanction, Work partially Completed` |

#### Financial Column Aggregates

| Financial Column | Min Value (₹) | Max Value (₹) | Mean Value (₹) | Total Sum (₹) |
| :--- | :--- | :--- | :--- | :--- |
| `Recommended date` | ₹0.00 | ₹0.00 | ₹0.00 | ₹0.00 |
| `Sanction Date` | ₹0.00 | ₹0.00 | ₹0.00 | ₹0.00 |
| `Sanction Amount ( ₹ )` | ₹12,881.00 | ₹46,470,400.00 | ₹526,100.92 | ₹5,787,110,078.78 |

#### Date Ranges

| Date Column | Earliest Date | Latest Date | Valid Date Count |
| :--- | :--- | :--- | :--- |
| `Recommended date` | 2024-07-08 | 2025-10-02 | 11,000 |
| `Sanction Date` | 2024-07-09 | 2026-08-25 | 11,000 |

---

### 2.5 Allocated Limit for Honble MPs.csv

- **Total Records**: 544
- **Total Columns**: 5

#### Columns & Nullability

| Column Name | Null Count | Null % | Distinct Values | Sample Values |
| :--- | :--- | :--- | :--- | :--- |
| `Sr. No.` | 0 | 0.0% | 544 | `1, 2, 3` |
| `State` | 0 | 0.0% | 37 | `Maharashtra, Jammu And Kashmir, Bihar` |
| `Hon'ble Members of Parliaments` | 0 | 0.0% | 544 | `AASHTIKAR PATIL NAGESH BAPURAO, ABDUL RASHID SHEIKH, ABHAY KUMAR SINHA` |
| `Constituency` | 0 | 0.0% | 543 | `HINGOLI, BARAMULLAH, AURANGABAD_BR` |
| `Allocated AMOUNT ( ₹ )` | 1 | 0.18% | 152 | `190289442, 154773472.11, 147000000` |

#### Financial Column Aggregates

| Financial Column | Min Value (₹) | Max Value (₹) | Mean Value (₹) | Total Sum (₹) |
| :--- | :--- | :--- | :--- | :--- |
| `Allocated AMOUNT ( ₹ )` | ₹49,000,000.00 | ₹83,154,562,207.60 | ₹306,278,313.84 | ₹166,309,124,415.20 |

---

### 2.6 Amount consented for Calamity.csv

- **Total Records**: 13
- **Total Columns**: 6

#### Columns & Nullability

| Column Name | Null Count | Null % | Distinct Values | Sample Values |
| :--- | :--- | :--- | :--- | :--- |
| `Sr. No.` | 0 | 0.0% | 13 | `1, 2, 3` |
| `Calamity Type` | 0 | 0.0% | 3 | `National Calamity, State Calamity,  ` |
| `Calamity Name` | 0 | 0.0% | 7 | `Flood 2025 in Punjab, Andhra Pradesh rainfall and consequent floods - 2024, Meppadi landslides 2024` |
| `Hon'ble Members of Parliament` | 0 | 0.0% | 11 | `Shri Gurjeet Singh Aujla, GURMEET SINGH MEET HAYER, Shri Jual Oram` |
| `Date of Consent` | 0 | 0.0% | 12 | `07-Dec-2025, 03-Nov-2025, 10-Oct-2025` |
| `Consent Amount ( ₹ )` | 0 | 0.0% | 7 | `7067400, 7500000, 10000000` |

#### Financial Column Aggregates

| Financial Column | Min Value (₹) | Max Value (₹) | Mean Value (₹) | Total Sum (₹) |
| :--- | :--- | :--- | :--- | :--- |
| `Date of Consent` | ₹0.00 | ₹0.00 | ₹0.00 | ₹0.00 |
| `Consent Amount ( ₹ )` | ₹500,000.00 | ₹40,567,400.00 | ₹6,241,138.46 | ₹81,134,800.00 |

#### Date Ranges

| Date Column | Earliest Date | Latest Date | Valid Date Count |
| :--- | :--- | :--- | :--- |
| `Date of Consent` | 2024-09-03 | 2025-12-07 | 12 |

---

## 3. Pune Validation Checkpoints

| Dataset | IDA = PUNE(DISTRICT COLLECTOR PUNE_IDA) | Constituency = PUNE |
| :--- | :--- | :--- |
| `recommended` | 28 | 0 |
| `completed` | 68 | 12 |
| `expenditure` | 35 | 4 |
| `sanctioned` | 25 | 0 |
| `allocated` | 0 | 1 |
| `calamity` | 0 | 0 |
