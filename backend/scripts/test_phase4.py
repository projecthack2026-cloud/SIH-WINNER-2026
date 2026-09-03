import sys
sys.path.insert(0, 'backend')
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

tests = [
    ("1. GET /api/projects?district=Pune&limit=100", "/api/projects?district=Pune&limit=100"),
    ("2. GET /api/projects?district=Pune%20District&limit=100", "/api/projects?district=Pune%20District&limit=100"),
    ("3. GET /api/dashboard/summary?district=Pune", "/api/dashboard/summary?district=Pune"),
    ("4. GET /api/dashboard/summary?district=Pune%20District", "/api/dashboard/summary?district=Pune%20District"),
    ("5. GET /api/map/district/Pune/summary", "/api/map/district/Pune/summary"),
    ("6. GET /api/map/district/Pune%20District/summary", "/api/map/district/Pune%20District/summary"),
]

print("=== EXECUTING PHASE 4 BACKEND API ENDPOINT TESTS ===\n")

for label, url in tests:
    res = client.get(url)
    print(f"*** {label} ***")
    print(f"HTTP Status: {res.status_code}")
    data = res.json()
    if isinstance(data, list):
        print(f"Records Returned: {len(data)}")
        if len(data) > 0:
            first = data[0]
            print(f"  Sample Record -> ID: {first.get('id')}, Canonical ID: {first.get('canonical_work_id')}, Title: {first.get('work_title') or first.get('title')}, District: {first.get('district')}")
    elif isinstance(data, dict):
        print("  Returned Metrics:")
        for k in ["total_projects", "district", "completed_projects", "sanctioned_projects", "total_expenditure", "number_of_expenditure_transactions", "project_count", "expenditure"]:
            if k in data:
                print(f"    - {k}: {data[k]}")
    print()
