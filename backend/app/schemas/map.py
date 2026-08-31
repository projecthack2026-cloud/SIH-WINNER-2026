from typing import Optional, List
from pydantic import BaseModel

class MapProjectResponse(BaseModel):
    project_id: int
    canonical_work_id: str
    title: str
    description: Optional[str] = None
    work_category: Optional[str] = None
    status: str
    latitude: float
    longitude: float
    sanctioned_amount: float = 0.0
    expenditure: float = 0.0
    financial_utilization: float = 0.0
    state: Optional[str] = None
    district: Optional[str] = None
    constituency: Optional[str] = None
    mp: Optional[str] = None
    location_text: Optional[str] = None
    village: Optional[str] = None
    locality: Optional[str] = None
    location_accuracy: Optional[str] = "VILLAGE_LEVEL"
    confidence_score: Optional[str] = "UNKNOWN"
    location_status: Optional[str] = "NOT_PROCESSED"
    source: Optional[str] = "OFFICIAL_DATA"
    verified: bool = False

    class Config:
        from_attributes = True

class UnmappedProjectResponse(BaseModel):
    project_id: int
    canonical_work_id: str
    title: str
    description: Optional[str] = None
    work_category: Optional[str] = None
    status: str
    state: Optional[str] = None
    district: Optional[str] = None
    constituency: Optional[str] = None
    mp: Optional[str] = None
    sanctioned_amount: float = 0.0
    financial_utilization: float = 0.0
    location_text: Optional[str] = None
    location_status: Optional[str] = "NOT_PROCESSED"

    class Config:
        from_attributes = True

class GlobalMapSummaryResponse(BaseModel):
    mapped_projects: int = 0
    unmapped_projects: int = 0
    completed: int = 0
    ongoing: int = 0
    partial: int = 0
    sanctioned: int = 0

class LocationQualitySummaryResponse(BaseModel):
    total_projects: int = 0
    locations_extracted: int = 0
    geocoded: int = 0
    verified_exact: int = 0
    village_level: int = 0
    approximate: int = 0
    unmapped: int = 0

class LocationProcessingStatsResponse(BaseModel):
    total_projects: int = 0
    locations_extracted: int = 0
    geocoding_success: int = 0
    geocoding_failed: int = 0
    ambiguous_locations: int = 0
    coordinates_available: int = 0
    coordinates_missing: int = 0

class DistrictSummaryResponse(BaseModel):
    district: str
    state: Optional[str] = None
    project_count: int = 0
    completed_count: int = 0
    ongoing_count: int = 0
    partial_count: int = 0
    sanctioned_count: int = 0
    sanctioned_amount: float = 0.0
    expenditure: float = 0.0
    utilization_rate: float = 0.0
    mapped_projects: int = 0
    unmapped_projects: int = 0

class DistrictItem(BaseModel):
    state: Optional[str] = None
    district: str
    project_count: int = 0
    mapped_count: int = 0
    unmapped_count: int = 0

class StateItem(BaseModel):
    state: str
    district_count: int = 0
    project_count: int = 0

class BhuvanConfigResponse(BaseModel):
    bhuvan_configured: bool
    satellite_configured: bool
    geocoding_configured: bool
    active_map_provider: str
    wms_url: Optional[str] = ""
    wmts_url: Optional[str] = ""
    geocoding_url: Optional[str] = ""
    supported_layers: List[str]
