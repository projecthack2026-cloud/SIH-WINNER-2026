from typing import Optional, List
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, or_
from app.database import get_db
from app.models.models import Project, ProjectExpenditure, AnomalyResult
from app.schemas.project import StateRankingSchema, DistrictRankingSchema, AnomalyResponseSchema

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/state-rankings", response_model=List[StateRankingSchema])
def get_state_rankings(db: Session = Depends(get_db)):
    results = db.query(
        Project.state,
        func.count(func.distinct(Project.district)).label("total_districts"),
        func.count(Project.id).label("total_projects"),
        func.coalesce(func.sum(Project.sanctioned_amount), 0.0).label("sanctioned_amount"),
        func.coalesce(func.sum(Project.completed_amount), 0.0).label("expenditure_amount")
    ).filter(Project.state.isnot(None)).group_by(Project.state).order_by(func.count(Project.id).desc()).all()

    rankings = []
    for row in results:
        state_name = row.state or "Unknown"
        tot_proj = row.total_projects or 0
        sanc_amt = float(row.sanctioned_amount or 0.0)
        exp_amt = float(row.expenditure_amount or 0.0)

        completed_cnt = db.query(Project).filter(
            func.lower(Project.state) == state_name.lower(),
            Project.current_status.ilike("%Completed%")
        ).count()

        ongoing_cnt = db.query(Project).filter(
            func.lower(Project.state) == state_name.lower(),
            or_(*[Project.current_status.ilike(f"%{s}%") for s in ["Ongoing", "In Progress", "Executing"]])
        ).count()

        high_risk_cnt = db.query(AnomalyResult).join(Project).filter(
            func.lower(Project.state) == state_name.lower()
        ).count()

        comp_rate = round((completed_cnt / tot_proj * 100.0), 1) if tot_proj > 0 else 0.0
        util_rate = round((exp_amt / sanc_amt * 100.0), 1) if sanc_amt > 0 else 0.0
        overall_risk = min(int(high_risk_cnt * 10 + (100 - util_rate) * 0.2), 100) if sanc_amt > 0 else 15

        rankings.append(StateRankingSchema(
            state=state_name,
            total_districts=row.total_districts or 1,
            total_projects=tot_proj,
            sanctioned_amount=sanc_amt,
            expenditure_amount=exp_amt,
            completed_projects=completed_cnt,
            ongoing_projects=ongoing_cnt,
            completion_rate=comp_rate,
            utilization_rate=util_rate,
            high_risk_count=high_risk_cnt,
            overall_risk_score=overall_risk
        ))

    return rankings

@router.get("/district-rankings", response_model=List[DistrictRankingSchema])
def get_district_rankings(
    state: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(
        Project.district,
        Project.state,
        func.count(Project.id).label("total_projects"),
        func.coalesce(func.sum(Project.sanctioned_amount), 0.0).label("sanctioned_amount"),
        func.coalesce(func.sum(Project.completed_amount), 0.0).label("expenditure_amount")
    ).filter(Project.district.isnot(None))

    if state:
        query = query.filter(func.lower(Project.state) == state.lower())

    results = query.group_by(Project.district, Project.state).order_by(func.count(Project.id).desc()).limit(100).all()

    rankings = []
    for row in results:
        dist_name = row.district or "District HQ"
        st_name = row.state or "State"
        tot_proj = row.total_projects or 0
        sanc_amt = float(row.sanctioned_amount or 0.0)
        exp_amt = float(row.expenditure_amount or 0.0)

        completed_cnt = db.query(Project).filter(
            func.lower(Project.district) == dist_name.lower(),
            Project.current_status.ilike("%Completed%")
        ).count()

        ongoing_cnt = db.query(Project).filter(
            func.lower(Project.district) == dist_name.lower(),
            or_(*[Project.current_status.ilike(f"%{s}%") for s in ["Ongoing", "In Progress", "Executing"]])
        ).count()

        high_risk_cnt = db.query(AnomalyResult).join(Project).filter(
            func.lower(Project.district) == dist_name.lower()
        ).count()

        comp_rate = round((completed_cnt / tot_proj * 100.0), 1) if tot_proj > 0 else 0.0
        util_rate = round((exp_amt / sanc_amt * 100.0), 1) if sanc_amt > 0 else 0.0

        rankings.append(DistrictRankingSchema(
            district=dist_name,
            state=st_name,
            total_projects=tot_proj,
            sanctioned_amount=sanc_amt,
            expenditure_amount=exp_amt,
            completed_projects=completed_cnt,
            ongoing_projects=ongoing_cnt,
            completion_rate=comp_rate,
            utilization_rate=util_rate,
            high_risk_count=high_risk_cnt
        ))

    return rankings

@router.get("/anomalies", response_model=List[AnomalyResponseSchema])
def get_anomalies(
    state: Optional[str] = Query(None),
    mp: Optional[str] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db)
):
    query = db.query(AnomalyResult, Project).join(Project, AnomalyResult.project_id == Project.id)

    if state:
        query = query.filter(func.lower(Project.state) == state.lower())
    if mp:
        query = query.filter(Project.mp_name.ilike(f"%{mp}%"))

    results = query.offset(skip).limit(limit).all()

    anomalies = []
    for anomaly, proj in results:
        anomalies.append(AnomalyResponseSchema(
            id=anomaly.id,
            project_id=proj.id,
            canonical_work_id=proj.canonical_work_id,
            work_title=proj.work_title,
            state=proj.state,
            district=proj.district,
            mp_name=proj.mp_name,
            anomaly_type=anomaly.anomaly_type,
            rule_code=anomaly.rule_code,
            description=anomaly.description,
            severity=anomaly.severity,
            score=anomaly.score,
            created_at=anomaly.created_at
        ))

    return anomalies

@router.get("/duplicates")
def get_duplicate_candidates():
    return {
        "status": "success",
        "message": "No duplicate candidates detected in the system.",
        "data": []
    }

@router.get("/compliance")
def get_compliance_results():
    return {
        "status": "success",
        "message": "Compliance assessment not yet available.",
        "data": []
    }
