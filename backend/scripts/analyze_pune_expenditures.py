import sys
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, 'backend')
import pandas as pd
from app.database import SessionLocal
from app.models.models import Project, ProjectExpenditure
from sqlalchemy import func

csv_path = 'src/data/Expenditure on Completed and On-going Works as on Date.csv'
df_exp = pd.read_csv(csv_path, dtype=str)

print('=== 1. SOURCE CSV IDA COLUMN INSPECTION FOR PUNE ===')
print(f'CSV Columns: {list(df_exp.columns)}')

# Filter CSV by IDA containing 'pune' (case-insensitive)
if 'IDA' in df_exp.columns:
    pune_ida_csv = df_exp[df_exp['IDA'].astype(str).str.lower().str.contains('pune', na=False)]
    print(f'\nSource CSV rows with IDA containing "pune": {len(pune_ida_csv)}')

    def clean_amt(val):
        if not val or pd.isna(val): return 0.0
        try: return float(str(val).replace(',', '').replace('₹', '').strip())
        except: return 0.0

    pune_ida_csv['amt'] = pune_ida_csv['Fund Disbursed Amount ( ₹ )'].apply(clean_amt)
    print(f'Source CSV Total Expenditure for IDA Pune: INR {pune_ida_csv["amt"].sum():,.2f}')
    print('\nDistinct IDA values in CSV for Pune:')
    for ida_val, group in pune_ida_csv.groupby('IDA'):
        print(f'  - IDA: "{ida_val}" | Count: {len(group)} | SUM: INR {group["amt"].sum():,.2f}')
else:
    print('Column "IDA" not found in CSV.')

print('\n=== 2. DATABASE PROJECTS TABLE IDA INSPECTION FOR PUNE ===')
db = SessionLocal()
pune_db_projects = db.query(Project).filter(func.lower(Project.district) == 'pune').all()
print(f'Pune Projects in DB: {len(pune_db_projects)}')

pune_db_idas = {}
for p in pune_db_projects:
    ida_val = p.ida or 'NULL / Empty'
    pune_db_idas[ida_val] = pune_db_idas.get(ida_val, 0) + 1

for ida_val, cnt in pune_db_idas.items():
    print(f'  - Project.ida: "{ida_val}" | Count: {cnt}')

print('\n=== 3. CONSTITUENCY VS IDA COMPARISON IN CSV ===')
# Compare CSV rows where Constituency is in [BARAMATI, PUNE, SHIRUR, MAVAL] vs IDA containing Pune
consts = ['baramati', 'pune', 'shirur', 'maval']
pune_const_csv = df_exp[df_exp['Constituency'].astype(str).str.lower().isin(consts)]
pune_const_csv['amt'] = pune_const_csv['Fund Disbursed Amount ( ₹ )'].apply(clean_amt)

print(f'CSV rows with Constituency in [BARAMATI, PUNE, SHIRUR, MAVAL]: {len(pune_const_csv)} | Total SUM: INR {pune_const_csv["amt"].sum():,.2f}')

print('\nBreakdown by Constituency in CSV:')
for c_val, group in pune_const_csv.groupby('Constituency'):
    print(f'  - Constituency: "{c_val}" | Count: {len(group)} | SUM: INR {group["amt"].sum():,.2f}')

print('\nBreakdown of IDA values within those 40 Constituency rows:')
for ida_val, group in pune_const_csv.groupby('IDA'):
    print(f'  - IDA: "{ida_val}" | Count: {len(group)} | SUM: INR {group["amt"].sum():,.2f}')

db.close()
