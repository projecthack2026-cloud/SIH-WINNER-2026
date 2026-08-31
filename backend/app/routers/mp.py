from typing import Optional, List
from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, or_
from app.database import get_db
from app.models.models import MpAllocation, Project, ProjectExpenditure
from app.schemas.project import MpAllocationResponse, MpSummaryResponse

router = APIRouter(prefix="/mp", tags=["MP Allocations"])

@router.get("/allocations", response_model=List[MpAllocationResponse])
def get_mp_allocations(
    state: Optional[str] = Query(None),
    mp: Optional[str] = Query(None),
    constituency: Optional[str] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db)
):
    query = db.query(MpAllocation)
    if state:
        query = query.filter(func.lower(MpAllocation.state) == state.lower())
    if mp:
        query = query.filter(MpAllocation.mp_name.ilike(f"%{mp}%"))
    if constituency:
        query = query.filter(func.lower(MpAllocation.constituency) == constituency.lower())
        
    return query.offset(skip).limit(limit).all()

@router.get("/summary", response_model=MpSummaryResponse)
def get_mp_summary(
    mp: str = Query(..., description="MP name or pattern"),
    constituency: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    alloc_rec = db.query(MpAllocation).filter(MpAllocation.mp_name.ilike(f"%{mp}%")).first()
    alloc_amt = float(alloc_rec.allocated_amount) if (alloc_rec and alloc_rec.allocated_amount) else 250000000.0 # Default 25 Cr per term

    proj_query = db.query(Project).filter(Project.mp_name.ilike(f"%{mp}%"))
    if constituency:
        proj_query = proj_query.filter(func.lower(Project.constituency) == constituency.lower())

    tot_proj = proj_query.count()
    sanc_proj = proj_query.filter(Project.current_status.ilike("%Sanctioned%")).count()
    comp_proj = proj_query.filter(Project.current_status.ilike("%Completed%")).count()
    ong_proj = proj_query.filter(or_(*[Project.current_status.ilike(f"%{s}%") for s in ["Ongoing", "In Progress", "Executing"]])).count()

    tot_sanc_amt = float(proj_query.with_entities(func.coalesce(func.sum(Project.sanctioned_amount), 0.0)).scalar() or 0.0)

    exp_query = db.query(ProjectExpenditure).filter(ProjectExpenditure.mp_name.ilike(f"%{mp}%"))
    tot_exp_amt = float(exp_query.with_entities(func.coalesce(func.sum(ProjectExpenditure.fund_disbursed_amount), 0.0)).scalar() or 0.0)

    rem_alloc = max(alloc_amt - tot_sanc_amt, 0.0)
    util_pct = round((tot_exp_amt / tot_sanc_amt * 100.0), 2) if tot_sanc_amt > 0 else 0.0

    st_name = proj_query.first().state if proj_query.first() else (alloc_rec.state if alloc_rec else "India")
    const_name = constituency or (proj_query.first().constituency if proj_query.first() else (alloc_rec.constituency if alloc_rec else "Constituency"))

    return MpSummaryResponse(
        mp_name=mp,
        constituency=const_name,
        state=st_name,
        allocated_amount=alloc_amt,
        total_projects=tot_proj,
        sanctioned_projects=sanc_proj,
        completed_projects=comp_proj,
        ongoing_projects=ong_proj,
        total_sanctioned_amount=tot_sanc_amt,
        total_expenditure=tot_exp_amt,
        remaining_allocation=rem_alloc,
        utilization_percentage=util_pct
    )

