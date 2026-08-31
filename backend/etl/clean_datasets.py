import re
import datetime
import pandas as pd
import numpy as np

def clean_currency(val) -> float | None:
    """Transforms currency strings like ' ₹42,50,000 ' to float 4250000.0"""
    if pd.isna(val) or val is None:
        return None
    s = str(val).replace('₹', '').replace(',', '').strip()
    if not s or s.lower() in ['n/a', 'null', 'none', '-']:
        return None
    try:
        num = float(s)
        return num
    except (ValueError, TypeError):
        return None

def clean_date(val) -> datetime.date | None:
    """Parses various date formats into datetime.date objects"""
    if pd.isna(val) or val is None:
        return None
    s = str(val).strip()
    if not s or s.lower() in ['n/a', 'null', 'none', '-']:
        return None
    
    # Common formats
    for fmt in ['%d-%m-%Y', '%Y-%m-%d', '%d/%m/%Y', '%Y/%m/%d', '%d-%b-%Y', '%d %b %Y']:
        try:
            return datetime.datetime.strptime(s, fmt).date()
        except ValueError:
            pass
            
    # Try pd.to_datetime fallback
    try:
        dt = pd.to_datetime(s, errors='coerce', dayfirst=True)
        if pd.notna(dt):
            return dt.date()
    except Exception:
        pass
        
    return None

def clean_string(val) -> str | None:
    """Cleans whitespace, tabs, BOMs, and standardizes null strings"""
    if pd.isna(val) or val is None:
        return None
    s = str(val).replace('\ufeff', '').replace('\t', ' ').strip()
    s = re.sub(r'\s+', ' ', s)
    if not s or s.lower() in ['n/a', 'null', 'none', '-']:
        return None
    return s
