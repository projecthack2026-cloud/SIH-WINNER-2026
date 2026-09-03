import sys
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, 'backend')
import pandas as pd

csv_path = 'src/data/Expenditure on Completed and On-going Works as on Date.csv'
df_exp = pd.read_csv(csv_path, dtype=str)

def clean_amt(val):
    if not val or pd.isna(val): return 0.0
    try: return float(str(val).replace(',', '').replace('₹', '').strip())
    except: return 0.0

df_exp['amt'] = df_exp['Fund Disbursed Amount ( ₹ )'].apply(clean_amt)

# Check all rows in CSV for IDA
pune_high = df_exp[df_exp['IDA'].astype(str).str.lower().str.contains('pune', na=False)]
maval_raigad = df_exp[(df_exp['Constituency'].astype(str).str.upper() == 'MAVAL') & (df_exp['IDA'].astype(str).str.upper().str.contains('RAIGAD', na=False))]

print('=== PUNE ADMINISTRATIVE EXPENDITURE CLASSIFICATION ===\n')
print(f'1. HIGH CONFIDENCE (IDA = PUNE(DISTRICT COLLECTOR PUNE_IDA)):')
print(f'   - Count: {len(pune_high)}')
print(f'   - Total SUM: INR {pune_high["amt"].sum():,.2f}')
print(f'   - Sample Row IDs: {list(pune_high["Sr. No."])[:5]}')

print(f'\n2. REJECTED / RAIGAD DISTRICT (Constituency = MAVAL, IDA = RAIGAD):')
print(f'   - Count: {len(maval_raigad)}')
print(f'   - Total SUM: INR {maval_raigad["amt"].sum():,.2f}')
print(f'   - Row IDs: {list(maval_raigad["Sr. No."])}')

print(f'\n3. CONSTITUENCY-BASED TOTAL (40 rows):')
print(f'   - 35 Pune IDA rows (INR 25,901,337.00) + 5 Raigad IDA rows (INR 2,750,000.00) = INR 28,651,337.00')

print('\n4. CHECK IF ANY OTHER CSV ROWS MENTION PUNE IN WORK DESCRIPTION OR TITLE:')
pune_work_other = df_exp[(~df_exp['IDA'].astype(str).str.lower().str.contains('pune', na=False)) & (df_exp['Work'].astype(str).str.lower().str.contains('pune', na=False))]
print(f'   - Count of non-Pune-IDA rows mentioning Pune in Work text: {len(pune_work_other)}')
for idx, row in pune_work_other.iterrows():
    print(f'     * Sr. No. {row["Sr. No."]} | IDA: "{row["IDA"]}" | Constituency: "{row["Constituency"]}" | Work: "{row["Work"][:60]}..." | Amt: INR {row["amt"]:,.2f}')

