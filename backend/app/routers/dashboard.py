from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, or_
from app.database import get_db
from app.models.models import Project, ProjectExpenditure, MpAllocation, CalamityConsent
from app.schemas.project import DashboardSummaryResponse

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("", response_model=DashboardSummaryResponse)
@router.get("/", response_model=DashboardSummaryResponse)
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
    sanc_count = query_p.filter(Project.sanctioned_amount > 0).count()
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

@router.get("/district")
def get_district_dashboard(
    district: Optional[str] = Query(None),
    state: Optional[str] = Query(None),
    constituency: Optional[str] = Query(None),
    filter_by: Optional[str] = Query("district", description="district | ida | constituency"),
    db: Session = Depends(get_db)
):
    target_dist = (district or "PUNE").strip()
    query_p = db.query(Project)
    query_e = db.query(ProjectExpenditure)

    if filter_by == "ida":
        query_p = query_p.filter(Project.ida.ilike(f"%{target_dist}%"))
        query_e = query_e.filter(ProjectExpenditure.work_id.in_(
            db.query(Project.canonical_work_id).filter(Project.ida.ilike(f"%{target_dist}%"))
        ))
    elif filter_by == "constituency":
        query_p = query_p.filter(func.lower(Project.constituency) == target_dist.lower())
        query_e = query_e.filter(func.lower(ProjectExpenditure.constituency) == target_dist.lower())
    else:
        query_p = query_p.filter(func.lower(Project.district) == target_dist.lower())
        query_e = query_e.filter(func.lower(ProjectExpenditure.state) == state.lower()) if state else query_e

    if state:
        query_p = query_p.filter(func.lower(Project.state) == state.lower())

    tot_works = query_p.count()
    rec_works = query_p.filter(Project.recommended_amount > 0).count()
    sanc_works = query_p.filter(Project.sanctioned_amount > 0).count()
    comp_works = query_p.filter(Project.current_status.ilike("%Completed%")).count()

    tot_rec_amt = float(query_p.with_entities(func.coalesce(func.sum(Project.recommended_amount), 0.0)).scalar() or 0.0)
    tot_sanc_amt = float(query_p.with_entities(func.coalesce(func.sum(Project.sanctioned_amount), 0.0)).scalar() or 0.0)
    tot_exp_amt = float(query_e.with_entities(func.coalesce(func.sum(ProjectExpenditure.fund_disbursed_amount), 0.0)).scalar() or 0.0)

    # Allocations
    alloc_query = db.query(func.coalesce(func.sum(MpAllocation.allocated_amount), 0.0))
    if constituency or filter_by == "constituency":
        target_c = constituency or target_dist
        alloc_query = alloc_query.filter(func.lower(MpAllocation.constituency) == target_c.lower())
    elif state:
        alloc_query = alloc_query.filter(func.lower(MpAllocation.state) == state.lower())

    tot_alloc_amt = float(alloc_query.scalar() or 0.0)
    util_pct = round((tot_exp_amt / tot_sanc_amt * 100.0), 2) if tot_sanc_amt > 0 else 0.0

    return {
        "district": target_dist,
        "filter_by": filter_by,
        "total_works": tot_works,
        "recommended_works": rec_works,
        "sanctioned_works": sanc_works,
        "completed_works": comp_works,
        "total_recommended_amount": tot_rec_amt,
        "total_sanction_amount": tot_sanc_amt,
        "total_expenditure": tot_exp_amt,
        "allocated_amount": tot_alloc_amt,
        "utilization_percentage": util_pct,
        "source": "Neon PostgreSQL - MPLADS Master Dataset"
    }

@router.get("/state")
def get_state_dashboard(
    state: str = Query("MAHARASHTRA"),
    db: Session = Depends(get_db)
):
    query_p = db.query(Project).filter(func.lower(Project.state) == state.lower())
    query_e = db.query(ProjectExpenditure).filter(func.lower(ProjectExpenditure.state) == state.lower())
    query_a = db.query(MpAllocation).filter(func.lower(MpAllocation.state) == state.lower())

    tot_works = query_p.count()
    comp_works = query_p.filter(Project.current_status.ilike("%Completed%")).count()
    sanc_works = query_p.filter(Project.sanctioned_amount > 0).count()
    rec_works = query_p.filter(Project.recommended_amount > 0).count()

    tot_sanc_amt = float(query_p.with_entities(func.coalesce(func.sum(Project.sanctioned_amount), 0.0)).scalar() or 0.0)
    tot_exp_amt = float(query_e.with_entities(func.coalesce(func.sum(ProjectExpenditure.fund_disbursed_amount), 0.0)).scalar() or 0.0)
    tot_alloc_amt = float(query_a.with_entities(func.coalesce(func.sum(MpAllocation.allocated_amount), 0.0)).scalar() or 0.0)

    dist_count = query_p.with_entities(func.count(func.distinct(Project.district))).scalar() or 0
    mp_count = query_p.with_entities(func.count(func.distinct(Project.mp_name))).scalar() or 0

    return {
        "state": state,
        "total_works": tot_works,
        "recommended_works": rec_works,
        "sanctioned_works": sanc_works,
        "completed_works": comp_works,
        "total_sanction_amount": tot_sanc_amt,
        "total_expenditure": tot_exp_amt,
        "total_allocated_amount": tot_alloc_amt,
        "total_districts": dist_count,
        "total_mps": mp_count,
        "source": "Neon PostgreSQL - MPLADS Master Dataset"
    }

@router.get("/ministry")
def get_ministry_dashboard(db: Session = Depends(get_db)):
    tot_projects = db.query(Project).count()
    rec_projects = db.query(Project).filter(Project.recommended_amount > 0).count()
    sanc_projects = db.query(Project).filter(Project.sanctioned_amount > 0).count()
    comp_projects = db.query(Project).filter(Project.current_status.ilike("%Completed%")).count()

    tot_rec_amt = float(db.query(func.coalesce(func.sum(Project.recommended_amount), 0.0)).scalar() or 0.0)
    tot_sanc_amt = float(db.query(func.coalesce(func.sum(Project.sanctioned_amount), 0.0)).scalar() or 0.0)
    tot_exp_amt = float(db.query(func.coalesce(func.sum(ProjectExpenditure.fund_disbursed_amount), 0.0)).scalar() or 0.0)
    tot_alloc_amt = float(db.query(func.coalesce(func.sum(MpAllocation.allocated_amount), 0.0)).scalar() or 0.0)
    tot_calamity_amt = float(db.query(func.coalesce(func.sum(CalamityConsent.consent_amount), 0.0)).scalar() or 0.0)

    states_cnt = db.query(func.count(func.distinct(Project.state))).scalar() or 0
    const_cnt = db.query(func.count(func.distinct(Project.constituency))).scalar() or 0
    mps_cnt = db.query(func.count(func.distinct(Project.mp_name))).scalar() or 0
    exp_tx_cnt = db.query(ProjectExpenditure).count()
    calamity_cases_cnt = db.query(CalamityConsent).count()

    return {
        "level": "Ministry of Statistics & Programme Implementation (MoSPI)",
        "total_projects": tot_projects,
        "recommended_projects": rec_projects,
        "sanctioned_projects": sanc_projects,
        "completed_projects": comp_projects,
        "total_recommended_amount": tot_rec_amt,
        "total_sanctioned_amount": tot_sanc_amt,
        "total_expenditure": tot_exp_amt,
        "total_mp_allocations": tot_alloc_amt,
        "total_calamity_consents": tot_calamity_amt,
        "calamity_cases_count": calamity_cases_cnt,
        "total_expenditure_transactions": exp_tx_cnt,
        "total_states": states_cnt,
        "total_constituencies": const_cnt,
        "total_mps": mps_cnt,
        "source": "Neon PostgreSQL - MPLADS Official Single Source of Truth"
    }
