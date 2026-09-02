import re
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, or_

from app.database import get_db
from app.config import settings
from app.models.models import Project, ProjectLocation, ProjectExpenditure, ProjectFeature
from app.schemas.map import (
    MapProjectResponse, UnmappedProjectResponse, GlobalMapSummaryResponse,
    DistrictSummaryResponse, DistrictItem, StateItem, BhuvanConfigResponse,
    LocationProcessingStatsResponse, LocationQualitySummaryResponse
)
from app.services.district_utils import ensure_districts_populated, normalize_district_name, apply_district_filter_to_query

router = APIRouter(prefix="/map", tags=["Geospatial Map"])

def is_valid_coordinate(lat: Optional[float], lon: Optional[float]) -> bool:
    if lat is None or lon is None:
        return False
    if lat == 0.0 and lon == 0.0:
        return False
    if not (-90.0 <= lat <= 90.0):
        return False
    if not (-180.0 <= lon <= 180.0):
        return False
    return True

def clean_district_param(district_param: Optional[str]) -> str:
    if not district_param or not isinstance(district_param, str) or not district_param.strip():
        return ""
    d = district_param.strip()
    # Strip parenthetical counts e.g. "(20)", "(1033)"
    d = re.sub(r"\s*\(\s*\d+\s*\)\s*$", "", d, flags=re.IGNORECASE).strip()
    # Strip word "District" or "(District)" from end
    d = re.sub(r"\s+district\b", "", d, flags=re.IGNORECASE).strip()
    d = re.sub(r"\s*\(\s*district\s*\)", "", d, flags=re.IGNORECASE).strip()
    return d

def apply_district_filter(query, district_param: Optional[str]):
    clean_d = clean_district_param(district_param)
    if not clean_d:
        return query
    d_lower = clean_d.lower()
    return query.filter(
        or_(
            func.lower(Project.district) == d_lower,
            func.lower(Project.district).like(f"%{d_lower}%"),
            func.lower(Project.ida).like(f"%{d_lower}%"),
            func.lower(Project.constituency).like(f"%{d_lower}%")
        )
    )

@router.get("/debug")
def get_map_debug(
    district: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Diagnostic endpoint returning database & location processing health statistics.
    """
    from app.services.bhuvan_geocoding import BhuvanGeocodingService
    
    ensure_districts_populated(db)
    
    total_projects = db.query(Project).count()
    projects_with_desc = db.query(Project).filter(Project.work_description.isnot(None), Project.work_description != "").count()
    processed_locations = db.query(ProjectLocation).count()
    locations_identified = db.query(ProjectLocation).filter(ProjectLocation.location_text.isnot(None), ProjectLocation.location_text != "").count()
    projects_with_coords = db.query(ProjectLocation).filter(
        ProjectLocation.latitude.isnot(None), 
        ProjectLocation.longitude.isnot(None),
        ProjectLocation.latitude != 0.0,
        ProjectLocation.longitude != 0.0
    ).count()

    selected_district_projects = total_projects
    selected_district_locations_extracted = locations_identified
    selected_district_coordinates = projects_with_coords
    
    clean_d = clean_district_param(district)
    if clean_d:
        dist_query = apply_district_filter(db.query(Project), clean_d)
        selected_district_projects = dist_query.count()

        loc_dist_query = apply_district_filter(
            db.query(ProjectLocation).join(Project, ProjectLocation.project_id == Project.id),
            clean_d
        )
        selected_district_locations_extracted = loc_dist_query.filter(ProjectLocation.location_text.isnot(None), ProjectLocation.location_text != "").count()
        selected_district_coordinates = loc_dist_query.filter(
            ProjectLocation.latitude.isnot(None), 
            ProjectLocation.longitude.isnot(None),
            ProjectLocation.latitude != 0.0,
            ProjectLocation.longitude != 0.0
        ).count()

    return {
        "database_connected": True,
        "project_table": "projects",
        "total_projects": total_projects,
        "projects_with_work_description": projects_with_desc,
        "selected_district": clean_d or "All Districts",
        "selected_district_projects": selected_district_projects,
        "selected_district_locations_extracted": selected_district_locations_extracted,
        "selected_district_coordinates": selected_district_coordinates,
        "locations_processed": processed_locations,
        "locations_identified": locations_identified,
        "existing_coordinates": projects_with_coords,
        "projects_with_coordinates": projects_with_coords,
        "project_locations_count": processed_locations,
        "bhuvan_configured": BhuvanGeocodingService.is_configured()
    }

@router.get("/bhuvan/config", response_model=BhuvanConfigResponse)
def get_bhuvan_config():
    """
    Returns Bhuvan configuration status.
    Uses public OpenStreetMap as default base map when Bhuvan credentials are empty.
    """
    wms_active = bool(settings.BHUVAN_WMS_URL)
    wmts_active = bool(settings.BHUVAN_WMTS_URL)
    bhuvan_active = wms_active or wmts_active
    geocoding_active = bool(settings.BHUVAN_GEOCODING_URL and settings.BHUVAN_ACCESS_TOKEN)
    
    return BhuvanConfigResponse(
        bhuvan_configured=bhuvan_active,
        satellite_configured=wmts_active or wms_active,
        geocoding_configured=geocoding_active,
        active_map_provider="ISRO Bhuvan" if bhuvan_active else "OpenStreetMap",
        wms_url=settings.BHUVAN_WMS_URL,
        wmts_url=settings.BHUVAN_WMTS_URL,
        geocoding_url=settings.BHUVAN_GEOCODING_URL,
        supported_layers=["Base Map (OSM/Bhuvan)", "Administrative Boundary", "Infrastructure Projects"]
    )

@router.post("/process-locations", response_model=LocationProcessingStatsResponse)
def process_project_locations(
    limit: Optional[int] = Query(None, description="Max projects to process"),
    db: Session = Depends(get_db)
):
    """
    Triggers the Natural Language Location Extraction Pipeline on project records.
    Extracts village, locality, and road endpoints from work_description.
    """
    from etl.process_locations import run_location_processing
    try:
        lim = limit if isinstance(limit, int) else None
        stats = run_location_processing(limit=lim)
        return LocationProcessingStatsResponse(**stats)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Location processing error: {str(e)}")

@router.get("/location-quality-summary", response_model=LocationQualitySummaryResponse)
def get_location_quality_summary(
    state: Optional[str] = Query(None),
    district: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Returns counts of projects grouped by location accuracy & verification quality.
    """
    ensure_districts_populated(db)
    
    query = db.query(Project)
    if state and isinstance(state, str):
        query = query.filter(func.lower(Project.state) == state.lower())
    if district and isinstance(district, str):
        query = apply_district_filter(query, district)

    total = query.count()

    loc_query = db.query(ProjectLocation).join(Project, ProjectLocation.project_id == Project.id)
    if state and isinstance(state, str):
        loc_query = loc_query.filter(func.lower(Project.state) == state.lower())
    if district and isinstance(district, str):
        loc_query = apply_district_filter(loc_query, district)

    extracted_cnt = loc_query.filter(ProjectLocation.location_text.isnot(None), ProjectLocation.location_text != "").count()
    geocoded_cnt = loc_query.filter(ProjectLocation.location_status == "GEOCODED").count()
    exact_cnt = loc_query.filter(ProjectLocation.verified == True, ProjectLocation.latitude.isnot(None)).count()
    village_cnt = loc_query.filter(ProjectLocation.location_accuracy == "VILLAGE_LEVEL", ProjectLocation.latitude.isnot(None)).count()
    approx_cnt = loc_query.filter(ProjectLocation.location_accuracy.in_(["APPROXIMATE", "DISTRICT_CENTROID"]), ProjectLocation.latitude.isnot(None)).count()

    mapped_cnt = loc_query.filter(ProjectLocation.latitude.isnot(None), ProjectLocation.latitude != 0.0).count()
    unmapped_cnt = max(total - mapped_cnt, 0)

    return LocationQualitySummaryResponse(
        total_projects=total,
        locations_extracted=extracted_cnt,
        geocoded=geocoded_cnt,
        verified_exact=exact_cnt,
        village_level=village_cnt,
        approximate=approx_cnt,
        unmapped=unmapped_cnt
    )

@router.get("/summary", response_model=GlobalMapSummaryResponse)
def get_global_map_summary(
    state: Optional[str] = Query(None),
    district: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Returns global or state/district filtered mapped vs unmapped statistics.
    """
    ensure_districts_populated(db)

    query = db.query(Project)
    if state and isinstance(state, str):
        query = query.filter(func.lower(Project.state) == state.lower())
    if district and isinstance(district, str):
        query = apply_district_filter(query, district)

    total = query.count()
    comp_count = query.filter(Project.current_status.ilike("%Completed%")).count()
    ongoing_count = query.filter(or_(*[Project.current_status.ilike(f"%{s}%") for s in ["Ongoing", "In Progress", "In-Progress", "Executing"]])).count()
    partial_count = query.filter(Project.current_status.ilike("%Partially%")).count()
    sanc_count = query.filter(Project.current_status.ilike("%Sanctioned%")).count()

    mapped_query = (
        db.query(ProjectLocation)
        .join(Project, ProjectLocation.project_id == Project.id)
        .filter(ProjectLocation.latitude.isnot(None), ProjectLocation.longitude.isnot(None))
        .filter(ProjectLocation.latitude != 0.0, ProjectLocation.longitude != 0.0)
    )
    if state and isinstance(state, str):
        mapped_query = mapped_query.filter(func.lower(Project.state) == state.lower())
    if district and isinstance(district, str):
        mapped_query = apply_district_filter(mapped_query, district)

    mapped_count = mapped_query.count()
    unmapped_count = max(total - mapped_count, 0)

    return GlobalMapSummaryResponse(
        mapped_projects=mapped_count,
        unmapped_projects=unmapped_count,
        completed=comp_count,
        ongoing=ongoing_count,
        partial=partial_count,
        sanctioned=sanc_count
    )

@router.get("/unmapped-projects", response_model=List[UnmappedProjectResponse])
def get_unmapped_projects(
    state: Optional[str] = Query(None),
    district: Optional[str] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db)
):
    """
    Returns list of project records without valid geographic coordinates.
    Includes extracted location_text if identified from work_description.
    """
    ensure_districts_populated(db)

    s = skip if isinstance(skip, int) else 0
    l = limit if isinstance(limit, int) else 50

    mapped_ids_select = (
        db.query(ProjectLocation.project_id)
        .filter(ProjectLocation.latitude.isnot(None), ProjectLocation.longitude.isnot(None))
        .filter(ProjectLocation.latitude != 0.0, ProjectLocation.longitude != 0.0)
    )

    query = (
        db.query(Project, ProjectLocation)
        .outerjoin(ProjectLocation, Project.id == ProjectLocation.project_id)
        .filter(Project.id.notin_(mapped_ids_select))
    )
    if state and isinstance(state, str):
        query = query.filter(func.lower(Project.state) == state.lower())
    if district and isinstance(district, str):
        query = apply_district_filter(query, district)

    results = query.offset(s).limit(l).all()

    out: List[UnmappedProjectResponse] = []
    for proj, loc in results:
        sanc_amt = float(proj.sanctioned_amount or 0.0)
        comp_amt = float(proj.completed_amount or 0.0)
        util = round((comp_amt / sanc_amt * 100.0), 2) if sanc_amt > 0 else 0.0

        out.append(
            UnmappedProjectResponse(
                project_id=proj.id,
                canonical_work_id=proj.canonical_work_id,
                title=proj.work_title,
                description=proj.work_description,
                work_category=proj.work_category,
                status=proj.current_status,
                state=proj.state,
                district=proj.district,
                constituency=proj.constituency,
                mp=proj.mp_name,
                sanctioned_amount=sanc_amt,
                financial_utilization=util,
                location_text=loc.location_text if loc else None,
                location_status=loc.location_status if loc else "NOT_PROCESSED"
            )
        )

    return out

@router.get("/states", response_model=List[StateItem])
def get_map_states(db: Session = Depends(get_db)):
    """
    Returns list of all states available in database with project and district counts.
    """
    ensure_districts_populated(db)

    states_query = (
        db.query(
            Project.state,
            func.count(func.distinct(Project.district)).label("district_count"),
            func.count(Project.id).label("project_count")
        )
        .filter(Project.state.isnot(None), Project.state != "")
        .group_by(Project.state)
        .order_by(Project.state)
        .all()
    )

    return [
        StateItem(
            state=r.state,
            district_count=r.district_count or 0,
            project_count=r.project_count or 0
        )
        for r in states_query
    ]

@router.get("/districts", response_model=List[DistrictItem])
def get_map_districts(
    state: Optional[str] = Query(None, description="Filter districts by state"),
    db: Session = Depends(get_db)
):
    """
    Returns list of districts available in database with mapped vs unmapped project counts.
    """
    ensure_districts_populated(db)

    query = db.query(
        Project.state,
        Project.district,
        func.count(Project.id).label("project_count")
    ).filter(Project.district.isnot(None), Project.district != "")

    if state and isinstance(state, str):
        query = query.filter(func.lower(Project.state) == state.lower())

    results = query.group_by(Project.state, Project.district).order_by(Project.district).all()

    mapped_counts_query = (
        db.query(Project.district, func.count(Project.id).label("mapped_count"))
        .join(ProjectLocation, Project.id == ProjectLocation.project_id)
        .filter(ProjectLocation.latitude.isnot(None), ProjectLocation.longitude.isnot(None))
        .filter(ProjectLocation.latitude != 0.0, ProjectLocation.longitude != 0.0)
    )
    if state and isinstance(state, str):
        mapped_counts_query = mapped_counts_query.filter(func.lower(Project.state) == state.lower())
    
    mapped_dict = {
        row.district: row.mapped_count 
        for row in mapped_counts_query.group_by(Project.district).all() 
        if row.district
    }

    out: List[DistrictItem] = []
    for r in results:
        total = r.project_count or 0
        mapped = mapped_dict.get(r.district, 0)
        unmapped = max(total - mapped, 0)
        out.append(
            DistrictItem(
                state=r.state,
                district=r.district,
                project_count=total,
                mapped_count=mapped,
                unmapped_count=unmapped
            )
        )
    return out

@router.get("/district/{district}/summary", response_model=DistrictSummaryResponse)
def get_district_map_summary(
    district: str,
    state: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Returns real aggregated metrics for a specific district.
    """
    ensure_districts_populated(db)

    query = apply_district_filter(db.query(Project), district)
    if state and isinstance(state, str):
        query = query.filter(func.lower(Project.state) == state.lower())

    total_projects = query.count()
    if total_projects == 0:
        return DistrictSummaryResponse(
            district=district,
            state=state,
            project_count=0
        )

    matched_state = query.first().state if query.first() else state

    comp_count = query.filter(Project.current_status.ilike("%Completed%")).count()
    ongoing_count = query.filter(or_(*[Project.current_status.ilike(f"%{s}%") for s in ["Ongoing", "In Progress", "In-Progress", "Executing"]])).count()
    partial_count = query.filter(Project.current_status.ilike("%Partially%")).count()
    sanc_count = query.filter(Project.current_status.ilike("%Sanctioned%")).count()

    total_sanc_amt = float(query.with_entities(func.coalesce(func.sum(Project.sanctioned_amount), 0.0)).scalar() or 0.0)

    norm_dist = normalize_district_name(district)
    dist_cids = [p.canonical_work_id for p in query.all() if p.canonical_work_id]
    exp_query = db.query(ProjectExpenditure)
    if matched_state:
        exp_query = exp_query.filter(func.lower(ProjectExpenditure.state) == matched_state.lower())
    filters = []
    if norm_dist:
        filters.append(func.lower(ProjectExpenditure.ida).like(f"%{norm_dist.lower()}%"))
    if dist_cids:
        filters.append(ProjectExpenditure.work_id.in_(dist_cids))
    if filters:
        exp_query = exp_query.filter(or_(*filters))
    total_exp_amt = float(exp_query.with_entities(func.coalesce(func.sum(ProjectExpenditure.fund_disbursed_amount), 0.0)).scalar() or 0.0)

    util_rate = round((total_exp_amt / total_sanc_amt * 100.0), 2) if total_sanc_amt > 0 else 0.0

    mapped_count = apply_district_filter(
        db.query(ProjectLocation).join(Project, ProjectLocation.project_id == Project.id),
        district
    ).filter(ProjectLocation.latitude.isnot(None), ProjectLocation.longitude.isnot(None))\
     .filter(ProjectLocation.latitude != 0.0, ProjectLocation.longitude != 0.0)\
     .count()

    unmapped_count = max(total_projects - mapped_count, 0)

    return DistrictSummaryResponse(
        district=district,
        state=matched_state,
        project_count=total_projects,
        completed_count=comp_count,
        ongoing_count=ongoing_count,
        partial_count=partial_count,
        sanctioned_count=sanc_count,
        sanctioned_amount=total_sanc_amt,
        expenditure=total_exp_amt,
        utilization_rate=util_rate,
        mapped_projects=mapped_count,
        unmapped_projects=unmapped_count
    )

@router.get("/projects", response_model=List[MapProjectResponse])
def get_map_projects(
    state: Optional[str] = Query(None, description="Filter by state"),
    district: Optional[str] = Query(None, description="Filter by district"),
    status: Optional[str] = Query(None, description="Filter by status"),
    category: Optional[str] = Query(None, description="Filter by work category"),
    mp: Optional[str] = Query(None, description="Filter by MP name"),
    constituency: Optional[str] = Query(None, description="Filter by constituency"),
    location_quality: Optional[str] = Query(None, description="Filter by location quality: ALL, VERIFIED, VILLAGE_LEVEL, APPROXIMATE"),
    search: Optional[str] = Query(None, description="Search work title or ID"),
    min_lat: Optional[float] = Query(None),
    max_lat: Optional[float] = Query(None),
    min_lon: Optional[float] = Query(None),
    max_lon: Optional[float] = Query(None),
    limit: int = Query(250, ge=1, le=1000),
    db: Session = Depends(get_db)
):
    """
    Returns only projects with valid real coordinates in project_locations.
    Supports filtering by location_quality (VERIFIED, VILLAGE_LEVEL, APPROXIMATE).
    """
    ensure_districts_populated(db)

    query = (
        db.query(Project, ProjectLocation)
        .join(ProjectLocation, Project.id == ProjectLocation.project_id)
        .filter(ProjectLocation.latitude.isnot(None), ProjectLocation.longitude.isnot(None))
        .filter(ProjectLocation.latitude != 0.0, ProjectLocation.longitude != 0.0)
    )

    if state and isinstance(state, str):
        query = query.filter(func.lower(Project.state) == state.lower())
    if district and isinstance(district, str):
        query = apply_district_filter(query, district)
    if status and isinstance(status, str):
        query = query.filter(Project.current_status.ilike(f"%{status}%"))
    if category and isinstance(category, str):
        query = query.filter(Project.work_category.ilike(f"%{category}%"))
    if mp and isinstance(mp, str):
        query = query.filter(Project.mp_name.ilike(f"%{mp}%"))
    if constituency and isinstance(constituency, str):
        query = query.filter(func.lower(Project.constituency) == constituency.lower())
    
    if location_quality and isinstance(location_quality, str) and location_quality.upper() != "ALL":
        lq = location_quality.upper()
        if lq == "VERIFIED":
            query = query.filter(ProjectLocation.verified == True)
        elif lq == "VILLAGE_LEVEL":
            query = query.filter(ProjectLocation.location_accuracy == "VILLAGE_LEVEL")
        elif lq == "APPROXIMATE":
            query = query.filter(ProjectLocation.location_accuracy.in_(["APPROXIMATE", "DISTRICT_CENTROID"]))

    if search and isinstance(search, str):
        pattern = f"%{search}%"
        query = query.filter(
            or_(
                Project.canonical_work_id.ilike(pattern),
                Project.work_title.ilike(pattern),
                Project.work_description.ilike(pattern),
                Project.mp_name.ilike(pattern),
                Project.constituency.ilike(pattern)
            )
        )

    if isinstance(min_lat, (int, float)):
        query = query.filter(ProjectLocation.latitude >= min_lat)
    if isinstance(max_lat, (int, float)):
        query = query.filter(ProjectLocation.latitude <= max_lat)
    if isinstance(min_lon, (int, float)):
        query = query.filter(ProjectLocation.longitude >= min_lon)
    if isinstance(max_lon, (int, float)):
        query = query.filter(ProjectLocation.longitude <= max_lon)

    lim = limit if isinstance(limit, int) else 250
    results = query.limit(lim).all()

    response: List[MapProjectResponse] = []
    for proj, loc in results:
        if not is_valid_coordinate(loc.latitude, loc.longitude):
            continue

        sanc_amt = float(proj.sanctioned_amount or 0.0)
        comp_amt = float(proj.completed_amount or 0.0)
        util = round((comp_amt / sanc_amt * 100.0), 2) if sanc_amt > 0 else 0.0

        response.append(
            MapProjectResponse(
                project_id=proj.id,
                canonical_work_id=proj.canonical_work_id,
                title=proj.work_title,
                description=proj.work_description,
                work_category=proj.work_category,
                status=proj.current_status,
                latitude=loc.latitude,
                longitude=loc.longitude,
                sanctioned_amount=sanc_amt,
                expenditure=comp_amt,
                financial_utilization=util,
                state=proj.state,
                district=proj.district,
                constituency=proj.constituency,
                mp=proj.mp_name,
                location_text=loc.location_text,
                village=loc.village,
                locality=loc.locality,
                location_accuracy=loc.location_accuracy or "VILLAGE_LEVEL",
                confidence_score=loc.confidence_score or "MEDIUM",
                location_status=loc.location_status or "GEOCODED",
                source=loc.source or "WORK_DESCRIPTION_EXTRACTION",
                verified=bool(loc.verified)
            )
        )

    return response
