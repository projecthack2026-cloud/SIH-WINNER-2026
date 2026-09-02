import sys
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, 'backend')
from app.database import SessionLocal
from app.routers.projects import get_projects
from app.routers.dashboard import get_dashboard_summary
from app.routers.map import get_district_map_summary

db = SessionLocal()

print("=== EXECUTING FINAL VERIFICATION TESTS FOR PUNE & RAIGAD ===\n")

# 1. GET /api/projects?district=Pune&limit=100
proj_pune = get_projects(state=None, district="Pune", constituency=None, mp=None, status=None, search=None, skip=0, limit=100, db=db)
print(f"1. GET /api/projects?district=Pune&limit=100")
print(f"   Records count: {len(proj_pune)}")
print()

# 2. GET /api/projects?district=Pune%20District&limit=100
proj_pune_dist = get_projects(state=None, district="Pune District", constituency=None, mp=None, status=None, search=None, skip=0, limit=100, db=db)
print(f"2. GET /api/projects?district=Pune%20District&limit=100")
print(f"   Records count: {len(proj_pune_dist)}")
print()

# 3. GET /api/dashboard/summary?district=Pune
dash_pune = get_dashboard_summary(state=None, district="Pune", constituency=None, mp=None, db=db)
print(f"3. GET /api/dashboard/summary?district=Pune")
print(f"   Total Projects: {dash_pune.total_projects}")
print(f"   Sanctioned Projects: {dash_pune.sanctioned_projects}")
print(f"   Completed Projects: {dash_pune.completed_projects}")
print(f"   Total Expenditure: INR {dash_pune.total_expenditure:,.2f}")
print(f"   Expenditure Transactions: {dash_pune.number_of_expenditure_transactions}")
print()

# 4. GET /api/dashboard/summary?district=Pune%20District
dash_pune_dist = get_dashboard_summary(state=None, district="Pune District", constituency=None, mp=None, db=db)
print(f"4. GET /api/dashboard/summary?district=Pune%20District")
print(f"   Total Projects: {dash_pune_dist.total_projects}")
print(f"   Sanctioned Projects: {dash_pune_dist.sanctioned_projects}")
print(f"   Completed Projects: {dash_pune_dist.completed_projects}")
print(f"   Total Expenditure: INR {dash_pune_dist.total_expenditure:,.2f}")
print(f"   Expenditure Transactions: {dash_pune_dist.number_of_expenditure_transactions}")
print()

# 5. GET /api/map/district/Pune/summary
map_pune = get_district_map_summary(district="Pune", state=None, db=db)
print(f"5. GET /api/map/district/Pune/summary")
print(f"   District: {map_pune.district}")
print(f"   Project Count: {map_pune.project_count}")
print(f"   Completed Count: {map_pune.completed_count}")
print(f"   Expenditure: INR {map_pune.expenditure:,.2f}")
print()

# 6. GET /api/map/district/Pune%20District/summary
map_pune_dist = get_district_map_summary(district="Pune District", state=None, db=db)
print(f"6. GET /api/map/district/Pune%20District/summary")
print(f"   District: {map_pune_dist.district}")
print(f"   Project Count: {map_pune_dist.project_count}")
print(f"   Completed Count: {map_pune_dist.completed_count}")
print(f"   Expenditure: INR {map_pune_dist.expenditure:,.2f}")
print()

# 7. GET /api/dashboard/summary?district=Raigad
dash_raigad = get_dashboard_summary(state=None, district="Raigad", constituency=None, mp=None, db=db)
print(f"7. GET /api/dashboard/summary?district=Raigad")
print(f"   Total Projects: {dash_raigad.total_projects}")
print(f"   Sanctioned Projects: {dash_raigad.sanctioned_projects}")
print(f"   Completed Projects: {dash_raigad.completed_projects}")
print(f"   Total Expenditure: INR {dash_raigad.total_expenditure:,.2f}")
print(f"   Expenditure Transactions: {dash_raigad.number_of_expenditure_transactions}")
print()

# 8. GET /api/map/district/Raigad/summary
map_raigad = get_district_map_summary(district="Raigad", state=None, db=db)
print(f"8. GET /api/map/district/Raigad/summary")
print(f"   District: {map_raigad.district}")
print(f"   Project Count: {map_raigad.project_count}")
print(f"   Completed Count: {map_raigad.completed_count}")
print(f"   Expenditure: INR {map_raigad.expenditure:,.2f}")
print()

db.close()
