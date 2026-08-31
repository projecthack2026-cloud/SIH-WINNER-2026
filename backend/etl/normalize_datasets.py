import re
from etl.clean_datasets import clean_string

def extract_canonical_work_id(raw_work_val: str | None) -> str | None:
    """
    Extracts canonical work identifier from Work string.
    Example raw value:
    'WS/\t MP620/2024-2025/133166-Construction of buildings...' -> 'WS/MP620/2024-2025/133166'
    'WS/MP18080/2025-2026/181959' -> 'WS/MP18080/2025-2026/181959'
    """
    cleaned = clean_string(raw_work_val)
    if not cleaned:
        return None
        
    # Match standard MPLADS work code prefix pattern
    match = re.search(r'(WS\s*/\s*MP\d+/\d{4}-\d{4}/\d+)', cleaned, re.IGNORECASE)
    if match:
        # Strip all inner whitespace and uppercase
        return re.sub(r'\s+', '', match.group(1)).upper()
        
    # Check fallback: if string starts with code separated by hyphen
    parts = cleaned.split('-')
    if len(parts) > 1:
        prefix = re.sub(r'\s+', '', parts[0]).upper()
        if 'MP' in prefix and 'WS/' in prefix:
            return prefix

    # If no pattern matches, return sanitized full string
    return cleaned.upper()

def normalize_mp_name(mp_name: str | None) -> str | None:
    """Normalizes MP name by removing honorifics and converting to uppercase for comparison"""
    cleaned = clean_string(mp_name)
    if not cleaned:
        return None
    
    # Remove common honorifics
    name = re.sub(r'\b(Hon\'ble|Shri|Smt|Dr|Prof|Mr|Mrs|Member of Parliament)\b', '', cleaned, flags=re.IGNORECASE)
    name = re.sub(r'\s+', ' ', name).strip().upper()
    return name

def normalize_entity_name(val: str | None) -> str | None:
    """Normalizes state, constituency, IDA, or category names"""
    cleaned = clean_string(val)
    if not cleaned:
        return None
    return re.sub(r'\s+', ' ', cleaned).strip().upper()
