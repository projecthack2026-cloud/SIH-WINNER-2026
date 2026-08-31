from typing import Optional, Tuple

class LocationValidationService:
    """
    Validates geographic coordinates and spatial integrity.
    Strictly rejects nulls, NaN, 0.0/0.0, or out-of-range coordinates (-90..90 lat, -180..180 lon).
    """

    @classmethod
    def validate_coordinates(cls, latitude: Optional[float], longitude: Optional[float]) -> Tuple[bool, Optional[str]]:
        """
        Validates latitude and longitude. Returns (is_valid, reason).
        """
        if latitude is None or longitude is None:
            return False, "Coordinates are missing/null"

        try:
            lat = float(latitude)
            lon = float(longitude)
        except (ValueError, TypeError):
            return False, "Coordinates are not valid numeric values"

        if lat == 0.0 and lon == 0.0:
            return False, "Coordinates (0.0, 0.0) represent null/unspecified position"

        if not (-90.0 <= lat <= 90.0):
            return False, f"Latitude {lat} out of range (-90 to 90)"

        if not (-180.0 <= lon <= 180.0):
            return False, f"Longitude {lon} out of range (-180 to 180)"

        # Check if coordinates fall within Indian geographic bounding box
        # India rough bbox: Lat 6.0 to 37.5, Lon 68.0 to 97.5
        if not (6.0 <= lat <= 37.5 and 68.0 <= lon <= 97.5):
            return True, "Valid global coordinate (outside India primary bbox)"

        return True, "Valid coordinate"
