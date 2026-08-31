import re
from typing import Optional

class LocationNormalizationService:
    """
    Standardizes and normalizes extracted location strings (e.g. 'Village ABC' -> 'ABC Village').
    Removes extraneous noise tokens while leaving original work_description untouched.
    """
    
    NOISE_WORDS = [
        r"\bno\s*\d+\b",
        r"\bpry\s*no\s*\d+\b",
        r"\bsr\s*no\s*\d+\b",
        r"\bplot\s*no\s*\d+\b",
        r"\bwork\s*no\s*\d+\b"
    ]

    @classmethod
    def normalize_name(cls, name: Optional[str]) -> Optional[str]:
        if not name or not name.strip():
            return None

        cleaned = name.strip()

        # Remove noise words like "Pry No 96", "Sr No 12"
        for noise in cls.NOISE_WORDS:
            cleaned = re.sub(noise, "", cleaned, flags=re.IGNORECASE).strip()

        # Standardize "Village X" to "X Village"
        match = re.match(r"^village\s+(.+)$", cleaned, re.IGNORECASE)
        if match:
            cleaned = f"{match.group(1).title()} Village"
        else:
            cleaned = cleaned.title()

        # Clean trailing commas or hyphens
        cleaned = re.sub(r"^[,\-\s]+|[,\-\s]+$", "", cleaned)
        return cleaned if len(cleaned) > 2 else None
