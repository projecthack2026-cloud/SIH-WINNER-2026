import os
from dotenv import load_dotenv

# Load .env file
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env')
load_dotenv(dotenv_path=env_path)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DEFAULT_DB_PATH = os.path.join(BASE_DIR, "mplads.db")

def parse_cors_origins() -> list[str]:
    raw = os.getenv("CORS_ORIGINS")
    default_origins = [
        "https://sih-winner-2026-indol.vercel.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000"
    ]
    if not raw:
        return default_origins
    raw_str = raw.strip()
    if raw_str.startswith("[") and raw_str.endswith("]"):
        import json
        try:
            parsed = json.loads(raw_str)
            if isinstance(parsed, list):
                return parsed
        except Exception:
            pass
    origins = [o.strip() for o in raw_str.split(",") if o.strip()]
    return origins if origins else default_origins

class Settings:
    PROJECT_NAME: str = "MPLADS AI Monitor — Infrastructure Monitoring & Accountability"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        f"sqlite:///{DEFAULT_DB_PATH}"
    )
    
    CORS_ORIGINS: list[str] = parse_cors_origins()
    
    BHUVAN_WMS_URL: str = os.getenv("BHUVAN_WMS_URL", "")
    BHUVAN_WMTS_URL: str = os.getenv("BHUVAN_WMTS_URL", "")
    BHUVAN_GEOCODING_URL: str = os.getenv("BHUVAN_GEOCODING_URL", "")
    BHUVAN_ACCESS_TOKEN: str = os.getenv("BHUVAN_ACCESS_TOKEN", "")

settings = Settings()
