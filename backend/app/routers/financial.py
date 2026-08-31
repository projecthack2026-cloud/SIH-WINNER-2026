from typing import Optional, List
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from backend.app.database import get_db
from backend.app.models.models import Project, ProjectExpenditure
from backend.app.schemas.project import ExpenditureSchema

router = APIRouter(prefix="/financial", tags=["Financial"])

@router.get("/summary")
def get_financial_summary(db: Session = Depends(get_db)):
    total_sanc = db.query(func.coalesce(func.sum(Project.sanctioned_amount), 0.0)).scalar()
    total_exp = db.query(func.coalesce(func.sum(ProjectExpenditure.fund_disbursed_amount), 0.0)).scalar()
    total_comp = db.query(func.coalesce(func.sum(Project.completed_amount), 0.0)).scalar()
    
    total_sanc_val = float(total_sanc or 0.0)
    total_exp_val = float(total_exp or 0.0)
    
    utilization_pct = round((total_exp_val / total_sanc_val * 100.0), 2) if total_sanc_val > 0 else 0.0
    remaining_val = max(total_sanc_val - total_exp_val, 0.0)

    tx_count = db.query(ProjectExpenditure).count()
    vendor_count = db.query(func.count(func.distinct(ProjectExpenditure.vendor_name))).scalar() or 0

    return {
        "total_sanctioned_amount": total_sanc_val,
        "total_expenditure": total_exp_val,
        "total_completed_amount": float(total_comp or 0.0),
        "remaining_amount": remaining_val,
        "utilization_percentage": utilization_pct,
        "expenditure_transaction_count": tx_count,
        "vendor_count": vendor_count
    }

@router.get("/expenditure", response_model=List[ExpenditureSchema])
def get_expenditures(
    state: Optional[str] = Query(None),
    constituency: Optional[str] = Query(None),
    mp: Optional[str] = Query(None),
    vendor: Optional[str] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db)
):
    query = db.query(ProjectExpenditure)
    if state:
        query = query.filter(func.lower(ProjectExpenditure.state) == state.lower())
    if constituency:
        query = query.filter(func.lower(ProjectExpenditure.constituency) == constituency.lower())
    if mp:
        query = query.filter(ProjectExpenditure.mp_name.ilike(f"%{mp}%"))
    if vendor:
        query = query.filter(ProjectExpenditure.vendor_name.ilike(f"%{vendor}%"))
        
    return query.offset(skip).limit(limit).all()
