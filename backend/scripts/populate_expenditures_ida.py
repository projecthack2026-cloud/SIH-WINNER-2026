import sys
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, 'backend')
import pandas as pd
from app.database import SessionLocal
from app.models.models import ProjectExpenditure
from sqlalchemy import text, func

db = SessionLocal()

print('Adding ida column to project_expenditures table if not exists...', flush=True)
db.execute(text('ALTER TABLE project_expenditures ADD COLUMN IF NOT EXISTS ida VARCHAR(255);'))
db.commit()

csv_path = 'src/data/Expenditure on Completed and On-going Works as on Date.csv'
df_exp = pd.read_csv(csv_path, dtype=str)

print(f'Populating ida column for all {len(df_exp)} rows from source CSV...', flush=True)
values_tuples = []
for idx, row in df_exp.iterrows():
    r_id = idx + 1
    ida_val = str(row.get('IDA', '')).strip().replace("'", "''")
    values_tuples.append(f"({r_id}, '{ida_val}')")

values_sql = ','.join(values_tuples)
sql_query = f"""
UPDATE project_expenditures AS p
SET ida = v.ida
FROM (VALUES {values_sql}) AS v(id, ida)
WHERE p.id = v.id;
"""

db.execute(text(sql_query))
db.commit()
print('SUCCESS: ida column added and populated in Neon PostgreSQL DB!', flush=True)

# Verification
cnt = db.query(ProjectExpenditure).filter(ProjectExpenditure.ida.isnot(None)).count()
print(f'Total ProjectExpenditure rows with ida populated: {cnt} / 16,001')

pune_cnt = db.query(ProjectExpenditure).filter(func.lower(ProjectExpenditure.ida).like('%pune%')).count()
pune_sum = float(db.query(func.coalesce(func.sum(ProjectExpenditure.fund_disbursed_amount), 0.0)).filter(func.lower(ProjectExpenditure.ida).like('%pune%')).scalar() or 0.0)

print(f'Pune IDA query count: {pune_cnt} (EXPECTED: 35)')
print(f'Pune IDA query total expenditure: INR {pune_sum:,.2f} (EXPECTED: 25,901,337.00)')

raigad_cnt = db.query(ProjectExpenditure).filter(func.lower(ProjectExpenditure.ida).like('%raigad%')).count()
raigad_sum = float(db.query(func.coalesce(func.sum(ProjectExpenditure.fund_disbursed_amount), 0.0)).filter(func.lower(ProjectExpenditure.ida).like('%raigad%')).scalar() or 0.0)

print(f'Raigad IDA query count: {raigad_cnt} (EXPECTED: 5)')
print(f'Raigad IDA query total expenditure: INR {raigad_sum:,.2f} (EXPECTED: 2,750,000.00)')

db.close()
