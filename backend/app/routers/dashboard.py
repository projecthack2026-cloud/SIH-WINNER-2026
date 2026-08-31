from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, or_
from app.database import get_db
from app.models.models import Project, ProjectExpenditure
from app.schemas.project import DashboardSummaryResponse

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/summary", response_model=DashboardSummaryResponse)
def get_dashboard_summary(
    state: Optional[str] = Query(None),
    district: Optional[str] = Query(None),
    constituency: Optional[str] = Query(None),
    mp: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query_p = db.query(Project)
    query_e = db.query(ProjectExpenditure)

    if state:
        query_p = query_p.filter(func.lower(Project.state) == state.lower())
        query_e = query_e.filter(func.lower(ProjectExpenditure.state) == state.lower())
    if district:
        query_p = query_p.filter(func.lower(Project.district) == district.lower())
    if constituency:
        query_p = query_p.filter(func.lower(Project.constituency) == constituency.lower())
        query_e = query_e.filter(func.lower(ProjectExpenditure.constituency) == constituency.lower())
    if mp:
        query_p = query_p.filter(Project.mp_name.ilike(f"%{mp}%"))
        query_e = query_e.filter(ProjectExpenditure.mp_name.ilike(f"%{mp}%"))

    total_projects = query_p.count()
    rec_count = query_p.filter(Project.current_status.ilike("%Recommended%")).count()
    sanc_count = query_p.filter(Project.current_status.ilike("%Sanctioned%")).count()
    ongoing_count = query_p.filter(or_(*[Project.current_status.ilike(f"%{s}%") for s in ["Ongoing", "In Progress", "In-Progress", "Executing"]])).count()
    comp_count = query_p.filter(Project.current_status.ilike("%Completed%")).count()
    partial_count = query_p.filter(Project.current_status.ilike("%Partially%")).count()

    total_rec_amt = float(query_p.with_entities(func.coalesce(func.sum(Project.recommended_amount), 0.0)).scalar() or 0.0)
    total_sanc_amt = float(query_p.with_entities(func.coalesce(func.sum(Project.sanctioned_amount), 0.0)).scalar() or 0.0)
    total_exp_amt = float(query_e.with_entities(func.coalesce(func.sum(ProjectExpenditure.fund_disbursed_amount), 0.0)).scalar() or 0.0)
    total_comp_amt = float(query_p.with_entities(func.coalesce(func.sum(Project.completed_amount), 0.0)).scalar() or 0.0)

    vendor_cnt = query_e.with_entities(func.count(func.distinct(ProjectExpenditure.vendor_name))).scalar() or 0
    tx_cnt = query_e.count()
    state_cnt = query_p.with_entities(func.count(func.distinct(Project.state))).scalar() or 0
    constituency_cnt = query_p.with_entities(func.count(func.distinct(Project.constituency))).scalar() or 0
    mp_cnt = query_p.with_entities(func.count(func.distinct(Project.mp_name))).scalar() or 0

    return DashboardSummaryResponse(
        total_projects=total_projects,
        recommended_projects=rec_count,
        sanctioned_projects=sanc_count,
        ongoing_projects=ongoing_count,
        completed_projects=comp_count,
        partially_completed_projects=partial_count,
        total_recommended_amount=total_rec_amt,
        total_sanctioned_amount=total_sanc_amt,
        total_expenditure=total_exp_amt,
        total_completed_amount=total_comp_amt,
        number_of_vendors=vendor_cnt,
        number_of_expenditure_transactions=tx_cnt,
        number_of_states=state_cnt,
        number_of_constituencies=constituency_cnt,
        number_of_mps=mp_cnt
    )

def or_status(status_list: list[str]):
    from sqlalchemy import or_
    return or_(*[Project.current_status.ilike(f"%{s}%") for s in status_list])
