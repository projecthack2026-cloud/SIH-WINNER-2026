import sys
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, 'backend')
from app.database import SessionLocal
from sqlalchemy import text

db = SessionLocal()
res = db.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name = 'project_expenditures'")).fetchall()
cols = [r[0] for r in res]
print(f'Columns in project_expenditures Neon DB table: {cols}')
db.close()
