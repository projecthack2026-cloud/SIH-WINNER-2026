import sys
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, 'backend')
from app.database import SessionLocal
from app.models.models import Project, ProjectExpenditure
from sqlalchemy import func

db = SessionLocal()

print('=== PROJECTS TABLE INSPECTION FOR MAVAL AND RAIGAD ===')
maval_projs = db.query(Project).filter(func.lower(Project.constituency) == 'maval').all()
print(f'Projects with constituency MAVAL: {len(maval_projs)}')
dist_counts = {}
for p in maval_projs:
    d_val = p.district or 'NULL'
    dist_counts[d_val] = dist_counts.get(d_val, 0) + 1
for d_val, cnt in dist_counts.items():
    print(f'  - District: "{d_val}" | Count: {cnt}')

print('\n=== EXPENDITURE CSV ROW ANALYSIS FOR MAVAL ===')
# Read CSV directly to see all columns
import pandas as pd
df_exp = pd.read_csv('src/data/Expenditure on Completed and On-going Works as on Date.csv', dtype=str)
maval_exp = df_exp[df_exp['Constituency'].astype(str).str.upper() == 'MAVAL']
print(f'Expenditure CSV rows for MAVAL: {len(maval_exp)}')
for ida_val, group in maval_exp.groupby('IDA'):
    print(f'  - IDA: "{ida_val}" | Count: {len(group)}')

# Check which constituencies are strictly in Pune District in projects table
pune_projs = db.query(Project).filter(func.lower(Project.district) == 'pune').all()
pune_consts_in_db = set(p.constituency for p in pune_projs if p.constituency)
print(f'\nConstituencies of Pune District projects in DB: {pune_consts_in_db}')

# For each constituency, check how many projects in DB belong to Pune vs other districts
for c in pune_consts_in_db:
    c_projs = db.query(Project).filter(func.lower(Project.constituency) == c.lower()).all()
    dists = set(p.district for p in c_projs if p.district)
    print(f'  - Constituency "{c}": total projects = {len(c_projs)}, districts = {dists}')

db.close()
