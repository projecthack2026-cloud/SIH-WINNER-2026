from typing import Optional, Dict, Any
from backend.app.config import settings

class BhuvanGeocodingService:
    """
    Interface for ISRO Bhuvan Village & Infrastructure Geocoding API.
    Prepared for future activation when BHUVAN_ACCESS_TOKEN and BHUVAN_GEOCODING_URL are configured.
    """
    
    @classmethod
    def is_configured(cls) -> bool:
        return bool(settings.BHUVAN_GEOCODING_URL and settings.BHUVAN_ACCESS_TOKEN)

    @classmethod
    def geocode_village(cls, village_name: str, district: Optional[str] = None, state: Optional[str] = None) -> Dict[str, Any]:
        """
        Geocodes a village or locality address via ISRO Bhuvan service.
        Returns graceful status when token/URL is unconfigured.
        """
        if not cls.is_configured():
            return {
                "status": "unconfigured",
                "message": "Geocoding service not configured",
                "coordinates": None
            }

        # Future API execution when credentials are provided
        return {
            "status": "pending_execution",
            "message": f"Bhuvan geocoding request queued for {village_name}",
            "coordinates": None
        }

    @classmethod
    def reverse_geocode(cls, latitude: float, longitude: float) -> Dict[str, Any]:
        """
        Reverse geocodes lat/lon into village, district, state metadata via ISRO Bhuvan.
        """
        if not cls.is_configured():
            return {
                "status": "unconfigured",
                "message": "Geocoding service not configured",
                "address": None
            }

        return {
            "status": "pending_execution",
            "message": f"Reverse geocoding queued for ({latitude}, {longitude})",
            "address": None
        }
