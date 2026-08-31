import os
import sys
import logging
from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import func, text

# Ensure backend package can be imported
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from backend.app.database import engine, Base, SessionLocal
from backend.app.models.models import Project, ProjectLocation
from backend.app.services.location_extraction import LocationExtractionService
from backend.app.services.location_normalization import LocationNormalizationService
from backend.app.services.location_validation import LocationValidationService
from backend.app.services.bhuvan_geocoding import BhuvanGeocodingService
from backend.app.services.district_utils import ensure_districts_populated

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger("LocationProcessor")

def run_location_processing(limit: Optional[int] = None) -> dict:
    logger.info("Starting Natural Language Location Extraction Pipeline...")
    
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    # Safely backfill districts first if needed
    ensure_districts_populated(db)

    # Safely alter table to add missing columns if needed
    for col_def in [
        ("location_text", "TEXT"),
        ("village", "VARCHAR(255)"),
        ("locality", "VARCHAR(255)"),
        ("taluka", "VARCHAR(255)"),
        ("from_location", "VARCHAR(255)"),
        ("to_location", "VARCHAR(255)"),
        ("confidence_score", "VARCHAR(50) DEFAULT 'UNKNOWN'"),
        ("location_status", "VARCHAR(100) DEFAULT 'NOT_PROCESSED'")
    ]:
        col_name, col_type = col_def
        try:
            db.execute(text(f"ALTER TABLE project_locations ADD COLUMN {col_name} {col_type}"))
            db.commit()
        except Exception:
            db.rollback()

    stats = {
        "total_projects": 0,
        "locations_extracted": 0,
        "geocoding_success": 0,
        "geocoding_failed": 0,
        "ambiguous_locations": 0,
        "coordinates_available": 0,
        "coordinates_missing": 0
    }

    try:
        query = db.query(Project)
        if limit:
            query = query.limit(limit)

        projects = query.all()
        stats["total_projects"] = len(projects)
        logger.info(f"Processing location extraction for {stats['total_projects']} project records...")

        is_bhuvan_configured = BhuvanGeocodingService.is_configured()

        for p in projects:
            # Check existing location record
            loc = db.query(ProjectLocation).filter(ProjectLocation.project_id == p.id).first()

            # Priority Rule #1: Preserve existing genuine coordinates (e.g., GPS, SURVEY, OFFICIAL_DATA)
            if loc and loc.latitude is not None and loc.longitude is not None and (loc.latitude != 0.0 or loc.longitude != 0.0):
                valid, _ = LocationValidationService.validate_coordinates(loc.latitude, loc.longitude)
                if valid:
                    stats["coordinates_available"] += 1
                    if loc.location_text:
                        stats["locations_extracted"] += 1
                    continue

            # Extract location entities from work_description
            extracted = LocationExtractionService.extract_location(p.work_description, p.district, p.state)
            
            location_text = extracted.get("location_text")
            village = LocationNormalizationService.normalize_name(extracted.get("village"))
            locality = LocationNormalizationService.normalize_name(extracted.get("locality"))
            taluka = LocationNormalizationService.normalize_name(extracted.get("taluka"))
            from_loc = LocationNormalizationService.normalize_name(extracted.get("from_location"))
            to_loc = LocationNormalizationService.normalize_name(extracted.get("to_location"))
            status = extracted.get("location_status", "NOT_PROCESSED")
            conf = extracted.get("confidence_score", "UNKNOWN")

            if status == "AMBIGUOUS":
                stats["ambiguous_locations"] += 1

            if location_text or village or locality or from_loc:
                stats["locations_extracted"] += 1
                # Development logging
                logger.info(f"[NLP Extraction] Project ID: {p.canonical_work_id} | Extracted: '{location_text}'")

            # Check Bhuvan Geocoding (only when configured)
            lat, lon = None, None
            if is_bhuvan_configured and location_text:
                geo_res = BhuvanGeocodingService.geocode_village(village or location_text, p.district, p.state)
                if geo_res.get("status") == "success" and geo_res.get("coordinates"):
                    lat, lon = geo_res["coordinates"]["lat"], geo_res["coordinates"]["lon"]
                    status = "GEOCODED"
                    stats["geocoding_success"] += 1
                else:
                    status = "FAILED"
                    stats["geocoding_failed"] += 1
            else:
                if status == "LOCATION_EXTRACTED":
                    status = "NOT_CONFIGURED"

            # Create or update ProjectLocation
            if not loc:
                loc = ProjectLocation(project_id=p.id)
                db.add(loc)

            loc.location_text = location_text
            loc.village = village
            loc.locality = locality
            loc.taluka = taluka
            loc.from_location = from_loc
            loc.to_location = to_loc
            loc.location_status = status
            loc.confidence_score = conf
            if not loc.source or loc.source == "OFFICIAL_DATA":
                loc.source = "WORK_DESCRIPTION"

            if lat is not None and lon is not None:
                is_valid, _ = LocationValidationService.validate_coordinates(lat, lon)
                if is_valid:
                    loc.latitude = lat
                    loc.longitude = lon
                    loc.location_accuracy = "VILLAGE_LEVEL"
                    loc.source = "BHUVAN_GEOCODING"
                    stats["coordinates_available"] += 1
                else:
                    stats["coordinates_missing"] += 1
            else:
                stats["coordinates_missing"] += 1

        db.commit()

        print("\n==================================================")
        print("      LOCATION EXTRACTION PIPELINE REPORT         ")
        print("==================================================")
        print(f"Total Projects Processed   : {stats['total_projects']}")
        print(f"Locations Identified       : {stats['locations_extracted']}")
        print(f"Geocoding Success          : {stats['geocoding_success']}")
        print(f"Ambiguous Descriptions     : {stats['ambiguous_locations']}")
        print(f"Projects with Coordinates  : {stats['coordinates_available']}")
        print(f"Projects Unmapped/Pending  : {stats['coordinates_missing']}")
        print("==================================================\n")

        return stats

    except Exception as e:
        db.rollback()
        logger.exception("Error during location processing pipeline!")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    run_location_processing()
