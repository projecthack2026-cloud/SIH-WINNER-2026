import os
from dotenv import load_dotenv

# Load .env file
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env')
load_dotenv(dotenv_path=env_path)

class Settings:
    PROJECT_NAME: str = "MPLADS AI Monitor — Infrastructure Monitoring & Accountability"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite:///./mplads.db"
    )
    
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "*"
    ]
    
    BHUVAN_WMS_URL: str = os.getenv("BHUVAN_WMS_URL", "")
    BHUVAN_WMTS_URL: str = os.getenv("BHUVAN_WMTS_URL", "")
    BHUVAN_GEOCODING_URL: str = os.getenv("BHUVAN_GEOCODING_URL", "")
    BHUVAN_ACCESS_TOKEN: str = os.getenv("BHUVAN_ACCESS_TOKEN", "")

settings = Settings()
