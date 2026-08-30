import os
import shutil

SOURCE_DIR = "./data"
TARGET_DIR = "./data"

os.makedirs(TARGET_DIR, exist_ok=True)

# Mapping messy CSV names -> clean slugified names in ./data/
FILE_MAPPING = {
    "Allocated Limit for Honble MPs.csv": "allocated_limit_ls.csv",
    "Allocated Limit for Honble MPs(1).csv": "allocated_limit_rs.csv",
    "Works Sanctioned.csv": "works_sanctioned_ls.csv",
    "Works Sanctioned(1).csv": "works_sanctioned_rs.csv",
    "Expenditure on Completed and On-going Works as on Date.csv": "expenditure_ls.csv",
    "Expenditure on Completed and On-going Works as on Date(1).csv": "expenditure_rs.csv",
    "Works Recommended.csv": "works_recommended_ls.csv",
    "Works Recommended(1).csv": "works_recommended_rs.csv",
    "Works Completed.csv": "works_completed_ls.csv",
    "Works Completed(1).csv": "works_completed_rs.csv",
    "Amount consented for Calamity.csv": "calamity_ls.csv",
    "Amount consented for Calamity(1).csv": "calamity_rs.csv",
}

for src_name, dest_name in FILE_MAPPING.items():
    src_path = os.path.join(SOURCE_DIR, src_name)
    dest_path = os.path.join(TARGET_DIR, dest_name)
    if os.path.exists(src_path):
        shutil.move(src_path, dest_path)
        print(f"Moved: {src_name} -> {dest_path}")

print("File migration to ./data/ complete!")
