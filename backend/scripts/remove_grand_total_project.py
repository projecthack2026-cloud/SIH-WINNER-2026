import sys
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, 'backend')
from app.database import SessionLocal, engine
from app.models.models import Project, ProjectCompletion, ProjectSanction, ProjectRecommendation
from sqlalchemy import text, inspect

db = SessionLocal()
pid = 41051
canonical_id = 'COMP-GEN-33857'

print('=== BEFORE REMOVAL VERIFICATION ===')
p_before = db.query(Project).filter(Project.id == pid).first()
if p_before:
    print(f'Found target project: ID={p_before.id}, Canonical ID={p_before.canonical_work_id}, Status={p_before.current_status}')
else:
    print(f'Project ID {pid} not found!')

completed_p_before = db.query(Project).filter(Project.current_status.ilike('%Completed%')).count()
completions_db_before = db.query(ProjectCompletion).count()
sanc_db_before = db.query(ProjectSanction).count()
rec_db_before = db.query(ProjectRecommendation).count()

print(f'Projects WHERE status ILIKE "%Completed%": {completed_p_before}')
print(f'project_completions table count: {completions_db_before}')
print(f'project_sanctions table count: {sanc_db_before}')
print(f'project_recommendations table count: {rec_db_before}')

# Confirm foreign key CASCADE definitions
print('\n=== CONFIRMING FOREIGN KEY CASCADE DEFINITIONS ===')
inspector = inspect(engine)
for fk in inspector.get_foreign_keys('project_features'):
    if fk.get('referred_table') == 'projects':
        print(f'project_features FK options: {fk.get("options")}')
for fk in inspector.get_foreign_keys('project_locations'):
    if fk.get('referred_table') == 'projects':
        print(f'project_locations FK options: {fk.get("options")}')

# Safely delete ONLY project 41051
if p_before:
    print(f'\nDeleting ONLY project id = {pid} ({canonical_id})...')
    db.delete(p_before)
    db.commit()
    print('SUCCESS: Project 41051 deleted from projects table!')

print('\n=== AFTER REMOVAL VERIFICATION ===')
completed_p_after = db.query(Project).filter(Project.current_status.ilike('%Completed%')).count()
completions_db_after = db.query(ProjectCompletion).count()
sanc_db_after = db.query(ProjectSanction).count()
rec_db_after = db.query(ProjectRecommendation).count()

comp_gen_check = db.query(Project).filter(Project.canonical_work_id == canonical_id).first()

print(f'Projects WHERE status ILIKE "%Completed%": {completed_p_after} (EXPECTED: 33,856)')
print(f'project_completions table count: {completions_db_after} (EXPECTED: 33,856)')
print(f'project_sanctions table count: {sanc_db_after} (EXPECTED: 11,000)')
print(f'project_recommendations table count: {rec_db_after} (EXPECTED: 11,000)')
print(f'Project with canonical_work_id = "{canonical_id}" exists: {comp_gen_check is not None} (EXPECTED: False / 0 rows)')

db.close()
