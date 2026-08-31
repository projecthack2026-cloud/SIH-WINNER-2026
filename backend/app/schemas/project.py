import datetime
from pydantic import BaseModel
from typing import Optional, List

class RecommendationSchema(BaseModel):
    id: int
    original_sr_no: Optional[str] = None
    work_category: Optional[str] = None
    recommendation_date: Optional[datetime.date] = None
    recommended_amount: float = 0.0
    raw_work_value: Optional[str] = None

    class Config:
        from_attributes = True

class SanctionSchema(BaseModel):
    id: int
    original_sr_no: Optional[str] = None
    sanction_date: Optional[datetime.date] = None
    sanction_amount: float = 0.0
    work_status: Optional[str] = None

    class Config:
        from_attributes = True

class CompletionSchema(BaseModel):
    id: int
    original_sr_no: Optional[str] = None
    completion_date: Optional[datetime.date] = None
    amount_disbursed: float = 0.0
    image_reference: Optional[str] = None

    class Config:
        from_attributes = True

class ExpenditureSchema(BaseModel):
    id: int
    work_id: Optional[str] = None
    expenditure_date: Optional[datetime.date] = None
    vendor_name: Optional[str] = None
    payment_status: Optional[str] = None
    fund_disbursed_amount: float = 0.0
    state: Optional[str] = None
    constituency: Optional[str] = None
    mp_name: Optional[str] = None

    class Config:
        from_attributes = True

class ProjectResponse(BaseModel):
    id: int
    canonical_work_id: str
    work_category: Optional[str] = None
    work_title: str
    work_description: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    ida: Optional[str] = None
    mp_name: Optional[str] = None
    constituency: Optional[str] = None
    recommended_date: Optional[datetime.date] = None
    sanction_date: Optional[datetime.date] = None
    completion_date: Optional[datetime.date] = None
    recommended_amount: float = 0.0
    sanctioned_amount: float = 0.0
    completed_amount: float = 0.0
    current_status: str

    class Config:
        from_attributes = True

class ProjectDetailResponse(ProjectResponse):
    recommendations: List[RecommendationSchema] = []
    sanctions: List[SanctionSchema] = []
    completions: List[CompletionSchema] = []
    expenditures: List[ExpenditureSchema] = []

class ProjectFinancialResponse(BaseModel):
    project_id: int
    canonical_work_id: str
    sanctioned_amount: float
    total_expenditure: float
    remaining_amount: float
    utilization_percentage: float
    expenditure_transaction_count: int
    vendor_count: int
    average_transaction_value: float

class ProjectTimelineResponse(BaseModel):
    project_id: int
    canonical_work_id: str
    recommended_date: Optional[datetime.date] = None
    sanction_date: Optional[datetime.date] = None
    completion_date: Optional[datetime.date] = None
    recommendation_to_sanction_days: Optional[int] = None
    sanction_to_completion_days: Optional[int] = None
    project_duration_days: Optional[int] = None

class DashboardSummaryResponse(BaseModel):
    total_projects: int
    recommended_projects: int
    sanctioned_projects: int
    ongoing_projects: int
    completed_projects: int
    partially_completed_projects: int
    total_recommended_amount: float
    total_sanctioned_amount: float
    total_expenditure: float
    total_completed_amount: float
    number_of_vendors: int
    number_of_expenditure_transactions: int
    number_of_states: int
    number_of_constituencies: int
    number_of_mps: int

class MpAllocationResponse(BaseModel):
    id: int
    state: Optional[str] = None
    mp_name: Optional[str] = None
    constituency: Optional[str] = None
    allocated_amount: float = 0.0

    class Config:
        from_attributes = True

class CalamityConsentResponse(BaseModel):
    id: int
    calamity_type: Optional[str] = None
    calamity_name: Optional[str] = None
    mp_name: Optional[str] = None
    consent_date: Optional[datetime.date] = None
    consent_amount: float = 0.0

    class Config:
        from_attributes = True

class StateRankingSchema(BaseModel):
    state: str
    total_districts: int
    total_projects: int
    sanctioned_amount: float
    expenditure_amount: float
    completed_projects: int
    ongoing_projects: int
    completion_rate: float
    utilization_rate: float
    high_risk_count: int
    overall_risk_score: int

class DistrictRankingSchema(BaseModel):
    district: str
    state: str
    total_projects: int
    sanctioned_amount: float
    expenditure_amount: float
    completed_projects: int
    ongoing_projects: int
    completion_rate: float
    utilization_rate: float
    high_risk_count: int

class AnomalyResponseSchema(BaseModel):
    id: int
    project_id: int
    canonical_work_id: str
    work_title: str
    state: Optional[str] = None
    district: Optional[str] = None
    mp_name: Optional[str] = None
    anomaly_type: str
    rule_code: str
    description: str
    severity: str
    score: float
    created_at: Optional[datetime.datetime] = None

class MpSummaryResponse(BaseModel):
    mp_name: str
    constituency: Optional[str] = None
    state: Optional[str] = None
    allocated_amount: float
    total_projects: int
    sanctioned_projects: int
    completed_projects: int
    ongoing_projects: int
    total_sanctioned_amount: float
    total_expenditure: float
    remaining_allocation: float
    utilization_percentage: float

