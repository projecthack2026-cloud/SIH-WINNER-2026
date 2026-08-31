from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, or_
from app.database import get_db
from app.models.models import Project, ProjectExpenditure, ProjectFeature
from app.schemas.project import (
    ProjectResponse, ProjectDetailResponse, ProjectFinancialResponse, 
    ProjectTimelineResponse, ExpenditureSchema
)

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("", response_model=List[ProjectResponse])
def get_projects(
    state: Optional[str] = Query(None, description="Filter by state"),
    constituency: Optional[str] = Query(None, description="Filter by constituency"),
    mp: Optional[str] = Query(None, description="Filter by MP name"),
    status: Optional[str] = Query(None, description="Filter by current status"),
    search: Optional[str] = Query(None, description="Search work title or ID"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db)
):
    query = db.query(Project)
    
    if state:
        query = query.filter(func.lower(Project.state) == state.lower())
    if constituency:
        query = query.filter(func.lower(Project.constituency) == constituency.lower())
    if mp:
        query = query.filter(Project.mp_name.ilike(f"%{mp}%"))
    if status:
        query = query.filter(Project.current_status.ilike(f"%{status}%"))
    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            or_(
                Project.canonical_work_id.ilike(search_pattern),
                Project.work_title.ilike(search_pattern),
                Project.work_description.ilike(search_pattern)
            )
        )
        
    return query.offset(skip).limit(limit).all()

@router.get("/{project_id}", response_model=ProjectDetailResponse)
def get_project_by_id(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.get("/{project_id}/financial", response_model=ProjectFinancialResponse)
def get_project_financial(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    exp_records = db.query(ProjectExpenditure).filter(ProjectExpenditure.project_id == project.id).all()
    total_exp = sum([float(e.fund_disbursed_amount or 0.0) for e in exp_records])
    tx_count = len(exp_records)
    vendor_count = len(set([e.vendor_name for e in exp_records if e.vendor_name]))
    
    sanc_amt = float(project.sanctioned_amount or 0.0)
    utilization_pct = round((total_exp / sanc_amt * 100.0), 2) if sanc_amt > 0 else 0.0
    remaining_amt = max(sanc_amt - total_exp, 0.0)
    avg_tx_val = round(total_exp / tx_count, 2) if tx_count > 0 else 0.0

    return ProjectFinancialResponse(
        project_id=project.id,
        canonical_work_id=project.canonical_work_id,
        sanctioned_amount=sanc_amt,
        total_expenditure=total_exp,
        remaining_amount=remaining_amt,
        utilization_percentage=utilization_pct,
        expenditure_transaction_count=tx_count,
        vendor_count=vendor_count,
        average_transaction_value=avg_tx_val
    )

@router.get("/{project_id}/expenditure", response_model=List[ExpenditureSchema])
def get_project_expenditures(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return db.query(ProjectExpenditure).filter(ProjectExpenditure.project_id == project.id).all()

@router.get("/{project_id}/timeline", response_model=ProjectTimelineResponse)
def get_project_timeline(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    rec_to_sanc = None
    if project.recommended_date and project.sanction_date:
        rec_to_sanc = (project.sanction_date - project.recommended_date).days

    sanc_to_comp = None
    if project.sanction_date and project.completion_date:
        sanc_to_comp = (project.completion_date - project.sanction_date).days

    total_dur = None
    if project.recommended_date and project.completion_date:
        total_dur = (project.completion_date - project.recommended_date).days
    elif rec_to_sanc is not None and sanc_to_comp is not None:
        total_dur = rec_to_sanc + sanc_to_comp

    return ProjectTimelineResponse(
        project_id=project.id,
        canonical_work_id=project.canonical_work_id,
        recommended_date=project.recommended_date,
        sanction_date=project.sanction_date,
        completion_date=project.completion_date,
        recommendation_to_sanction_days=rec_to_sanc,
        sanction_to_completion_days=sanc_to_comp,
        project_duration_days=total_dur
    )
