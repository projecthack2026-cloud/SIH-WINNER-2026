import os
import pandas as pd

DATA_DIR = "./data"

def clean_numeric_series(series):
    """
    Safely converts dirty/corrupted string numbers to float.
    Replaces non-numeric characters and handles parsing errors gracefully.
    """
    if series is None or series.empty:
        return pd.Series(dtype=float)
    
    # Strip commas, spaces, currency symbols, and non-numeric garbage
    cleaned = (
        series.astype(str)
        .str.replace(r'[^\d.-]', '', regex=True)
        .str.strip()
    )
    return pd.to_numeric(cleaned, errors='coerce').fillna(0.0)

def load_data(house, region_name="National"):
    """
    Loads slugified CSV files from ./data/
    LS uses *_ls.csv, RS uses *_rs.csv
    """
    tag = "rs" if house == 'RS' else "ls"
    
    try:
        alloc_file = os.path.join(DATA_DIR, f"allocated_limit_{tag}.csv")
        sanc_file = os.path.join(DATA_DIR, f"works_sanctioned_{tag}.csv")
        exp_file = os.path.join(DATA_DIR, f"expenditure_{tag}.csv")

        allocated_df = pd.read_csv(alloc_file, encoding='utf-8-sig') if os.path.exists(alloc_file) else pd.DataFrame()
        sanctioned_df = pd.read_csv(sanc_file, encoding='utf-8-sig') if os.path.exists(sanc_file) else pd.DataFrame()
        expenditure_df = pd.read_csv(exp_file, encoding='utf-8-sig') if os.path.exists(exp_file) else pd.DataFrame()

        # Clean whitespace in column headers
        for df in [allocated_df, sanctioned_df, expenditure_df]:
            if not df.empty:
                df.columns = df.columns.str.strip()

        # Filter region if requested
        if region_name and region_name != "National":
            # Clean search target: uppercase and stripped
            clean_target = str(region_name).strip().upper()

            if house == 'LS':
                # Check if region matches a State name
                is_state = False
                if not allocated_df.empty and 'State' in allocated_df.columns:
                    state_list = allocated_df['State'].astype(str).str.strip().str.upper().unique()
                    if clean_target in state_list:
                        is_state = True

                if is_state:
                    # Filter by State
                    if not allocated_df.empty and 'State' in allocated_df.columns:
                        allocated_df = allocated_df[allocated_df['State'].astype(str).str.strip().str.upper() == clean_target]
                    if not sanctioned_df.empty and 'State' in sanctioned_df.columns:
                        sanctioned_df = sanctioned_df[sanctioned_df['State'].astype(str).str.strip().str.upper() == clean_target]
                    if not expenditure_df.empty and 'State' in expenditure_df.columns:
                        expenditure_df = expenditure_df[expenditure_df['State'].astype(str).str.strip().str.upper() == clean_target]
                else:
                    # Filter by Constituency (Case-insensitive & substring match to handle (SC)/(ST) suffixes)
                    if not allocated_df.empty and 'Constituency' in allocated_df.columns:
                        allocated_df = allocated_df[allocated_df['Constituency'].astype(str).str.strip().str.upper().str.contains(clean_target, regex=False, na=False)]
                    if not sanctioned_df.empty and 'Constituency' in sanctioned_df.columns:
                        sanctioned_df = sanctioned_df[sanctioned_df['Constituency'].astype(str).str.strip().str.upper().str.contains(clean_target, regex=False, na=False)]
                    if not expenditure_df.empty and 'Constituency' in expenditure_df.columns:
                        expenditure_df = expenditure_df[expenditure_df['Constituency'].astype(str).str.strip().str.upper().str.contains(clean_target, regex=False, na=False)]
            else:
                # Rajya Sabha is strictly State-wide
                if not allocated_df.empty and 'State' in allocated_df.columns:
                    allocated_df = allocated_df[allocated_df['State'].astype(str).str.strip().str.upper() == clean_target]
                if not sanctioned_df.empty and 'State' in sanctioned_df.columns:
                    sanctioned_df = sanctioned_df[sanctioned_df['State'].astype(str).str.strip().str.upper() == clean_target]
                if not expenditure_df.empty and 'State' in expenditure_df.columns:
                    expenditure_df = expenditure_df[expenditure_df['State'].astype(str).str.strip().str.upper() == clean_target]

        return allocated_df, sanctioned_df, expenditure_df

    except Exception as e:
        print(f"Error loading CSV data: {e}")
        return pd.DataFrame(), pd.DataFrame(), pd.DataFrame()
def get_dashboard_stats(house, region_name):
    alloc_df, sanc_df, exp_df = load_data(house, region_name)

    # 1. Total Allocated
    total_allocated = 0.0
    if not alloc_df.empty:
        col = [c for c in alloc_df.columns if 'Allocated' in c or 'AMOUNT' in c]
        if col:
            total_allocated = float(clean_numeric_series(alloc_df[col[0]]).sum())

    # 2. Total Disbursed / Expenditure
    total_disbursed = 0.0
    if not exp_df.empty:
        col = [c for c in exp_df.columns if 'Disbursed' in c or 'Fund' in c or 'Amount' in c]
        if col:
            total_disbursed = float(clean_numeric_series(exp_df[col[0]]).sum())

    alloc_cr = round(total_allocated / 10_000_000, 2)
    disb_cr = round(total_disbursed / 10_000_000, 2)
    utilization_rate = round((total_disbursed / total_allocated) * 100, 1) if total_allocated > 0 else 0.0
    unspent_cr = round(alloc_cr - disb_cr, 2)

    # 3. Anomaly Detection
    anomalies_count = 0
    if not sanc_df.empty:
        sanc_col = [c for c in sanc_df.columns if 'Sanction Amount' in c or 'Amount' in c]
        if sanc_col:
            numeric_sanc = clean_numeric_series(sanc_df[sanc_col[0]])
            anomalies_count = int(((numeric_sanc >= 490000) & (numeric_sanc <= 499999)).sum())

    # 4. Sector Breakdown
    sector_labels = []
    sector_data = []
    if not sanc_df.empty:
        cat_col = [c for c in sanc_df.columns if 'category' in c.lower() or 'work' in c.lower()]
        sanc_amt_col = [c for c in sanc_df.columns if 'Sanction Amount' in c or 'Amount' in c]
        if cat_col and sanc_amt_col:
            temp_df = sanc_df.copy()
            temp_df['Clean_Amount'] = clean_numeric_series(temp_df[sanc_amt_col[0]])
            sector_group = temp_df.groupby(cat_col[0])['Clean_Amount'].sum().sort_values(ascending=False).head(5)
            sector_labels = sector_group.index.tolist()
            sector_data = [float(round(v / 10_000_000, 2)) for v in sector_group.values]

    # 5. Work Status Pipeline
    status_labels = []
    status_data = []
    if not sanc_df.empty:
        status_col = [c for c in sanc_df.columns if 'Status' in c]
        if status_col:
            status_group = sanc_df[status_col[0]].value_counts()
            status_labels = status_group.index.tolist()
            status_data = [int(v) for v in status_group.values]

    # 6. Extract MP Name (Lok Sabha Constituencies only)
    mp_name_str = "N/A"
    if house == 'LS' and region_name != "National" and not alloc_df.empty:
        # Find the column that contains the MP's name
        mp_col = [c for c in alloc_df.columns if 'Member' in c or 'MP' in c]
        if mp_col:
            mps = alloc_df[mp_col[0]].dropna().unique()
            # Only show if it's a constituency level (1 or 2 MPs max). 
            # If it's a state, there will be 30+, so we ignore it.
            if 0 < len(mps) <= 3:
                mp_name_str = ", ".join([str(m).strip() for m in mps])

    return {
        "mp_name": mp_name_str,
        "kpis": {
            "allocated_cr": alloc_cr,
            "disbursed_cr": disb_cr,
            "utilization_pct": utilization_rate,
            "unspent_cr": unspent_cr,
            "anomalies": anomalies_count
        },
        "charts": {
            "sectors": {"labels": sector_labels, "data": sector_data},
            "statuses": {"labels": status_labels, "data": status_data}
        }
    }
