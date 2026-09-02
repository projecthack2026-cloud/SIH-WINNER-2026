import os
import sys
import glob
import re
import pandas as pd
import numpy as np

# Set stdout encoding for Windows Powershell compatibility
sys.stdout.reconfigure(encoding='utf-8')

DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "src", "data"))
DOCS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "docs"))
os.makedirs(DOCS_DIR, exist_ok=True)

DATASETS = {
    "recommended": "Works Recommended.csv",
    "completed": "Works Completed.csv",
    "expenditure": "Expenditure on Completed and On-going Works as on Date.csv",
    "sanctioned": "Works Sanctioned.csv",
    "allocated": "Allocated Limit for Honble MPs.csv",
    "calamity": "Amount consented for Calamity.csv"
}

def clean_monetary(series):
    def parse_val(v):
        if pd.isna(v) or v is None:
            return np.nan
        s = str(v).replace('₹', '').replace(',', '').strip()
        try:
            return float(s)
        except ValueError:
            return np.nan
    return series.apply(parse_val)

def parse_dates(series):
    def parse_d(v):
        if pd.isna(v) or v is None:
            return pd.NaT
        s = str(v).strip()
        if not s or s.lower() == 'nan':
            return pd.NaT
        try:
            return pd.to_datetime(s, format='%d-%b-%Y', errors='coerce')
        except Exception:
            return pd.to_datetime(s, errors='coerce')
    return series.apply(parse_d)

def profile_dataset(name, filename):
    filepath = os.path.join(DATA_DIR, filename)
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return None

    df = pd.read_csv(filepath, encoding='utf-8')
    row_count = len(df)
    col_count = len(df.columns)

    cols_profile = []
    for col in df.columns:
        null_cnt = df[col].isna().sum()
        non_null_cnt = row_count - null_cnt
        unique_cnt = df[col].nunique(dropna=True)
        sample_vals = df[col].dropna().unique()[:3]
        sample_str = ", ".join([str(v) for v in sample_vals])

        cols_profile.append({
            "column": col,
            "null_count": int(null_cnt),
            "null_pct": round(float(null_cnt / row_count * 100), 2) if row_count > 0 else 0.0,
            "unique_count": int(unique_cnt),
            "sample_values": sample_str
        })

    # Find monetary columns
    monetary_stats = {}
    for col in df.columns:
        if any(term in col.lower() for term in ['amount', 'disbursed', 'expenditure', 'sanction', 'recommended', 'consent', 'allocated']):
            clean_s = clean_monetary(df[col])
            monetary_stats[col] = {
                "min": float(clean_s.min()) if not clean_s.dropna().empty else 0.0,
                "max": float(clean_s.max()) if not clean_s.dropna().empty else 0.0,
                "sum": float(clean_s.sum()) if not clean_s.dropna().empty else 0.0,
                "mean": float(clean_s.mean()) if not clean_s.dropna().empty else 0.0,
                "count": int(clean_s.count())
            }

    # Find date columns
    date_stats = {}
    for col in df.columns:
        if 'date' in col.lower():
            dt_s = parse_dates(df[col]).dropna()
            if not dt_s.empty:
                date_stats[col] = {
                    "min_date": dt_s.min().strftime('%Y-%m-%d'),
                    "max_date": dt_s.max().strftime('%Y-%m-%d'),
                    "valid_count": int(len(dt_s))
                }

    # Entity counts
    distinct_states = df['State'].nunique() if 'State' in df.columns else 0
    distinct_const = df['Constituency'].nunique() if 'Constituency' in df.columns else 0
    
    mp_col = [c for c in df.columns if 'member' in c.lower() or 'mp' in c.lower()]
    distinct_mps = df[mp_col[0]].nunique() if mp_col else 0
    
    ida_col = [c for c in df.columns if 'ida' in c.lower()]
    distinct_idas = df[ida_col[0]].nunique() if ida_col else 0

    return {
        "name": name,
        "filename": filename,
        "row_count": row_count,
        "col_count": col_count,
        "cols_profile": cols_profile,
        "monetary_stats": monetary_stats,
        "date_stats": date_stats,
        "distinct_states": distinct_states,
        "distinct_constituencies": distinct_const,
        "distinct_mps": distinct_mps,
        "distinct_idas": distinct_idas,
        "df": df
    }

def main():
    print("==================================================")
    print("PROFILING REAL MPLADS DATASETS")
    print("==================================================")

    profiles = {}
    for key, fname in DATASETS.items():
        print(f"Profiling {fname}...")
        p = profile_dataset(key, fname)
        if p:
            profiles[key] = p
            print(f"  -> Rows: {p['row_count']}, Cols: {p['col_count']}")

    # Cross-dataset reconciliation analysis
    rec_df = profiles['recommended']['df']
    sanc_df = profiles['sanctioned']['df']
    comp_df = profiles['completed']['df']
    exp_df = profiles['expenditure']['df']

    rec_works = set(rec_df['WORK'].dropna().astype(str).str.strip())
    sanc_works = set(sanc_df['Work'].dropna().astype(str).str.strip())
    comp_works = set(comp_df['Work'].dropna().astype(str).str.strip())
    exp_works = set(exp_df['Work ID'].dropna().astype(str).str.strip())

    overlap_rec_sanc = len(rec_works.intersection(sanc_works))
    overlap_sanc_comp = len(sanc_works.intersection(comp_works))
    overlap_exp_sanc = len(exp_works.intersection(sanc_works))

    # Pune audit
    pune_audit = {}
    for key, p in profiles.items():
        df = p['df']
        pune_ida_cnt = 0
        pune_const_cnt = 0
        
        ida_cols = [c for c in df.columns if 'ida' in c.lower()]
        if ida_cols:
            pune_ida_cnt = df[df[ida_cols[0]].astype(str).str.upper().str.contains('PUNE', na=False)].shape[0]
            
        if 'Constituency' in df.columns:
            pune_const_cnt = df[df['Constituency'].astype(str).str.upper().str.strip() == 'PUNE'].shape[0]
            
        pune_audit[key] = {
            "pune_ida_count": pune_ida_cnt,
            "pune_constituency_count": pune_const_cnt
        }

    print("\n==================================================")
    print("RECONCILIATION SUMMARY")
    print("==================================================")
    print(f"Unique Recommended Works : {len(rec_works)}")
    print(f"Unique Sanctioned Works  : {len(sanc_works)}")
    print(f"Unique Completed Works   : {len(comp_works)}")
    print(f"Unique Expenditure WorkIDs: {len(exp_works)}")
    print(f"Recommended & Sanctioned Overlap: {overlap_rec_sanc}")

    # Generate MPLADS_DATA_PROFILE.md
    profile_md_path = os.path.join(DOCS_DIR, "MPLADS_DATA_PROFILE.md")
    with open(profile_md_path, "w", encoding="utf-8") as f:
        f.write("# MPLADS Real Datasets Profile & Metrics Report\n\n")
        f.write("This document summarizes the exact profiling metrics derived directly from the six official MPLADS CSV datasets.\n\n")
        f.write("## 1. Executive Dataset Summary\n\n")
        f.write("| Dataset Key | Filename | Row Count | Column Count | Distinct States | Distinct Constituencies | Distinct MPs | Distinct IDAs |\n")
        f.write("| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n")
        for key, p in profiles.items():
            f.write(f"| `{key}` | `{p['filename']}` | {p['row_count']:,} | {p['col_count']} | {p['distinct_states']} | {p['distinct_constituencies']} | {p['distinct_mps']} | {p['distinct_idas']} |\n")

        f.write("\n## 2. Dataset Specific Profiles\n\n")
        for key, p in profiles.items():
            f.write(f"### 2.{list(profiles.keys()).index(key)+1} {p['filename']}\n\n")
            f.write(f"- **Total Records**: {p['row_count']:,}\n")
            f.write(f"- **Total Columns**: {p['col_count']}\n\n")
            f.write("#### Columns & Nullability\n\n")
            f.write("| Column Name | Null Count | Null % | Distinct Values | Sample Values |\n")
            f.write("| :--- | :--- | :--- | :--- | :--- |\n")
            for c in p['cols_profile']:
                f.write(f"| `{c['column']}` | {c['null_count']:,} | {c['null_pct']}% | {c['unique_count']:,} | `{c['sample_values']}` |\n")

            if p['monetary_stats']:
                f.write("\n#### Financial Column Aggregates\n\n")
                f.write("| Financial Column | Min Value (₹) | Max Value (₹) | Mean Value (₹) | Total Sum (₹) |\n")
                f.write("| :--- | :--- | :--- | :--- | :--- |\n")
                for m_col, m_s in p['monetary_stats'].items():
                    f.write(f"| `{m_col}` | ₹{m_s['min']:,.2f} | ₹{m_s['max']:,.2f} | ₹{m_s['mean']:,.2f} | ₹{m_s['sum']:,.2f} |\n")

            if p['date_stats']:
                f.write("\n#### Date Ranges\n\n")
                f.write("| Date Column | Earliest Date | Latest Date | Valid Date Count |\n")
                f.write("| :--- | :--- | :--- | :--- |\n")
                for d_col, d_s in p['date_stats'].items():
                    f.write(f"| `{d_col}` | {d_s['min_date']} | {d_s['max_date']} | {d_s['valid_count']:,} |\n")

            f.write("\n---\n\n")

        f.write("## 3. Pune Validation Checkpoints\n\n")
        f.write("| Dataset | IDA = PUNE(DISTRICT COLLECTOR PUNE_IDA) | Constituency = PUNE |\n")
        f.write("| :--- | :--- | :--- |\n")
        for key, audit in pune_audit.items():
            f.write(f"| `{key}` | {audit['pune_ida_count']} | {audit['pune_constituency_count']} |\n")

    # Generate MPLADS_DATA_DICTIONARY.md
    dict_md_path = os.path.join(DOCS_DIR, "MPLADS_DATA_DICTIONARY.md")
    with open(dict_md_path, "w", encoding="utf-8") as f:
        f.write("# MPLADS Data Dictionary\n\n")
        f.write("Official data dictionary mapping source CSV columns to target PostgreSQL database table schemas.\n\n")
        for key, p in profiles.items():
            f.write(f"## Table: `mplads_{key}` (Source: `{p['filename']}`)\n\n")
            f.write("| Source Column Name | Recommended PostgreSQL Column | Data Type | Nullable | Description & Business Rules |\n")
            f.write("| :--- | :--- | :--- | :--- | :--- |\n")
            for c in p['cols_profile']:
                col_name = c['column']
                clean_name = re.sub(r'[^a-zA-Z0-9_]', '_', col_name.lower().replace("hon'ble members of parliament", "mp_name").replace("hon'ble members of parliaments", "mp_name")).strip('_')
                clean_name = re.sub(r'_+', '_', clean_name)
                
                dtype = "VARCHAR(255)"
                if any(term in col_name.lower() for term in ['amount', 'disbursed', 'expenditure', 'sanction', 'recommended', 'consent', 'allocated']):
                    dtype = "NUMERIC(15, 2)"
                elif 'date' in col_name.lower():
                    dtype = "DATE"
                elif 'description' in col_name.lower() or 'work' == col_name.lower():
                    dtype = "TEXT"
                elif col_name == 'Sr. No.':
                    dtype = "INTEGER"

                nullable = "YES" if c['null_count'] > 0 else "NO"
                f.write(f"| `{col_name}` | `{clean_name}` | `{dtype}` | {nullable} | Source column from `{p['filename']}` |\n")
            f.write("\n---\n\n")

    print(f"Profiling completed! Documents created:\n  - {profile_md_path}\n  - {dict_md_path}")

if __name__ == "__main__":
    main()
