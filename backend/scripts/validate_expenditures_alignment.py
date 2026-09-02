import sys
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, 'backend')
import pandas as pd
from datetime import datetime
from app.database import SessionLocal
from app.models.models import ProjectExpenditure

csv_path = 'src/data/Expenditure on Completed and On-going Works as on Date.csv'
df_csv = pd.read_csv(csv_path, dtype=str)

db = SessionLocal()
db_rows = db.query(ProjectExpenditure).order_by(ProjectExpenditure.id).all()

total_csv = len(df_csv)
total_db = len(db_rows)

def clean_str(val):
    if val is None or pd.isna(val):
        return ''
    return str(val).strip()

def clean_amt(val):
    if not val or pd.isna(val):
        return 0.0
    val_str = str(val).replace(',', '').replace('₹', '').strip()
    try:
        return round(float(val_str), 2)
    except:
        return 0.0

def parse_date_to_iso(val):
    if not val or pd.isna(val):
        return ''
    val_str = str(val).strip()
    for fmt in ('%d-%b-%Y', '%Y-%m-%d', '%d/%m/%Y', '%d-%m-%Y'):
        try:
            return datetime.strptime(val_str, fmt).strftime('%Y-%m-%d')
        except ValueError:
            pass
    return val_str

field_mismatch_counts = {
    'id_vs_sr_no': 0,
    'state': 0,
    'constituency': 0,
    'mp_name': 0,
    'expenditure_date_semantic': 0,
    'vendor_name': 0,
    'payment_status': 0,
    'fund_disbursed_amount': 0
}

exact_semantic_aligned_rows = 0

for i in range(min(total_csv, total_db)):
    csv_r = df_csv.iloc[i]
    db_r = db_rows[i]

    # Extract CSV fields
    c_state = clean_str(csv_r.get('State'))
    c_mp = clean_str(csv_r.get('Hon\'ble Members of Parliament'))
    c_const = clean_str(csv_r.get('Constituency'))
    c_exp_date_iso = parse_date_to_iso(csv_r.get('Expenditure Date'))
    c_vendor = clean_str(csv_r.get('Vendor Name'))
    c_status = clean_str(csv_r.get('Payment Status'))
    c_amt = clean_amt(csv_r.get('Fund Disbursed Amount ( ₹ )'))

    # Extract DB fields
    d_id = str(db_r.id)
    d_state = clean_str(db_r.state)
    d_mp = clean_str(db_r.mp_name)
    d_const = clean_str(db_r.constituency)
    d_exp_date = clean_str(db_r.expenditure_date)
    d_vendor = clean_str(db_r.vendor_name)
    d_status = clean_str(db_r.payment_status)
    d_amt = round(float(db_r.fund_disbursed_amount or 0.0), 2)

    row_mismatches = 0

    if d_id != str(i + 1):
        field_mismatch_counts['id_vs_sr_no'] += 1
        row_mismatches += 1

    if c_state and d_state and c_state.lower() != d_state.lower():
        field_mismatch_counts['state'] += 1
        row_mismatches += 1

    if c_const and d_const and c_const.lower() != d_const.lower():
        field_mismatch_counts['constituency'] += 1
        row_mismatches += 1

    if c_mp and d_mp and c_mp.lower() != d_mp.lower():
        field_mismatch_counts['mp_name'] += 1
        row_mismatches += 1

    if c_exp_date_iso and d_exp_date and c_exp_date_iso != d_exp_date:
        field_mismatch_counts['expenditure_date_semantic'] += 1
        row_mismatches += 1

    if c_vendor and d_vendor and c_vendor.lower() != d_vendor.lower():
        field_mismatch_counts['vendor_name'] += 1
        row_mismatches += 1

    if c_status and d_status and c_status.lower() != d_status.lower():
        field_mismatch_counts['payment_status'] += 1
        row_mismatches += 1

    if c_amt != d_amt:
        field_mismatch_counts['fund_disbursed_amount'] += 1
        row_mismatches += 1

    if row_mismatches == 0:
        exact_semantic_aligned_rows += 1

print('=== ALL 16,001 ROW SEMANTIC ALIGNMENT RESULT ===')
print(f'Exact Semantic Row Alignment Count: {exact_semantic_aligned_rows} / 16,001')
print(f'Amount Mismatch Count: {field_mismatch_counts["fund_disbursed_amount"]}')
print('Field Mismatch Breakdown (Semantic):')
for field, cnt in field_mismatch_counts.items():
    print(f'  - {field}: {cnt}')

db.close()
