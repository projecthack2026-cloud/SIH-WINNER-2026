from typing import Optional, List
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from backend.app.database import get_db
from backend.app.models.models import CalamityConsent
from backend.app.schemas.project import CalamityConsentResponse

router = APIRouter(prefix="/calamities", tags=["Calamity Consents"])

@router.get("", response_model=List[CalamityConsentResponse])
def get_calamity_consents(
    calamity_type: Optional[str] = Query(None),
    mp: Optional[str] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db)
):
    query = db.query(CalamityConsent)
    if calamity_type:
        query = query.filter(func.lower(CalamityConsent.calamity_type) == calamity_type.lower())
    if mp:
        query = query.filter(CalamityConsent.mp_name.ilike(f"%{mp}%"))
        
    return query.offset(skip).limit(limit).all()
