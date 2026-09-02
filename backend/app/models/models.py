import datetime
from sqlalchemy import (
    Column, Integer, String, Float, Numeric, DateTime, Date, Boolean, Text, ForeignKey, Index
)
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(100), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    role = Column(String(50), nullable=False) # mp, district, state, ministry, admin
    full_name = Column(String(255), nullable=True)
    state = Column(String(100), nullable=True, index=True)
    district = Column(String(100), nullable=True)
    constituency = Column(String(100), nullable=True, index=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    canonical_work_id = Column(String(255), unique=True, index=True, nullable=False)
    work_category = Column(String(255), index=True, nullable=True)
    work_title = Column(Text, nullable=False)
    work_description = Column(Text, nullable=True)
    
    state = Column(String(100), index=True, nullable=True)
    district = Column(String(100), index=True, nullable=True)
    ida = Column(String(255), nullable=True) # Implementing District Authority
    
    mp_name = Column(String(255), index=True, nullable=True)
    constituency = Column(String(255), index=True, nullable=True)
    
    recommended_date = Column(Date, index=True, nullable=True)
    sanction_date = Column(Date, index=True, nullable=True)
    completion_date = Column(Date, index=True, nullable=True)
    
    recommended_amount = Column(Numeric(15, 2), default=0.0)
    sanctioned_amount = Column(Numeric(15, 2), default=0.0)
    completed_amount = Column(Numeric(15, 2), default=0.0)
    
    current_status = Column(String(100), default="Recommended", index=True) # Recommended, Sanctioned, Ongoing, Completed
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    # Relationships
    recommendations = relationship("ProjectRecommendation", back_populates="project", cascade="all, delete-orphan")
    sanctions = relationship("ProjectSanction", back_populates="project", cascade="all, delete-orphan")
    completions = relationship("ProjectCompletion", back_populates="project", cascade="all, delete-orphan")
    expenditures = relationship("ProjectExpenditure", back_populates="project", cascade="all, delete-orphan")
    features = relationship("ProjectFeature", back_populates="project", uselist=False, cascade="all, delete-orphan")
    anomalies = relationship("AnomalyResult", back_populates="project", cascade="all, delete-orphan")
    risk_scores = relationship("RiskScore", back_populates="project", cascade="all, delete-orphan")
    location = relationship("ProjectLocation", back_populates="project", uselist=False, cascade="all, delete-orphan")

class ProjectRecommendation(Base):
    __tablename__ = "project_recommendations"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="SET NULL"), nullable=True, index=True)
    original_sr_no = Column(String(100), nullable=True)
    work_category = Column(String(255), nullable=True)
    recommendation_date = Column(Date, nullable=True)
    recommended_amount = Column(Numeric(15, 2), nullable=True)
    raw_work_value = Column(Text, nullable=True)
    source_file = Column(String(255), default="Works Recommended.csv")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    project = relationship("Project", back_populates="recommendations")

class ProjectSanction(Base):
    __tablename__ = "project_sanctions"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    original_sr_no = Column(String(100), nullable=True)
    sanction_date = Column(Date, index=True, nullable=True)
    sanction_amount = Column(Numeric(15, 2), nullable=True)
    work_status = Column(String(100), nullable=True)
    source_file = Column(String(255), default="Works Sanctioned.csv")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    project = relationship("Project", back_populates="sanctions")

class ProjectCompletion(Base):
    __tablename__ = "project_completions"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    original_sr_no = Column(String(100), nullable=True)
    completion_date = Column(Date, index=True, nullable=True)
    amount_disbursed = Column(Numeric(15, 2), nullable=True)
    image_reference = Column(Text, nullable=True)
    source_file = Column(String(255), default="Works Completed.csv")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    project = relationship("Project", back_populates="completions")

class ProjectExpenditure(Base):
    __tablename__ = "project_expenditures"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="SET NULL"), nullable=True, index=True)
    work_id = Column(String(255), index=True, nullable=True)
    expenditure_date = Column(Date, index=True, nullable=True)
    vendor_name = Column(String(255), index=True, nullable=True)
    payment_status = Column(String(100), nullable=True)
    fund_disbursed_amount = Column(Numeric(15, 2), nullable=True)
    state = Column(String(100), index=True, nullable=True)
    constituency = Column(String(100), index=True, nullable=True)
    mp_name = Column(String(255), index=True, nullable=True)
    source_file = Column(String(255), default="Expenditure on Completed and On-going Works as on Date.csv")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    project = relationship("Project", back_populates="expenditures")

class MpAllocation(Base):
    __tablename__ = "mp_allocations"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    state = Column(String(100), index=True, nullable=True)
    mp_name = Column(String(255), index=True, nullable=True)
    constituency = Column(String(255), index=True, nullable=True)
    allocated_amount = Column(Numeric(15, 2), nullable=True)
    source_file = Column(String(255), default="Allocated Limit for Honble MPs.csv")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class CalamityConsent(Base):
    __tablename__ = "calamity_consents"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    calamity_type = Column(String(100), nullable=True)
    calamity_name = Column(String(255), nullable=True)
    mp_name = Column(String(255), index=True, nullable=True)
    consent_date = Column(Date, nullable=True)
    consent_amount = Column(Numeric(15, 2), nullable=True)
    source_file = Column(String(255), default="Amount consented for Calamity.csv")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

# AI Feature Engineering & Analytics Tables
class ProjectFeature(Base):
    __tablename__ = "project_features"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    sanctioned_amount = Column(Numeric(15, 2), default=0.0)
    total_expenditure = Column(Numeric(15, 2), default=0.0)
    utilization_percentage = Column(Float, default=0.0)
    expenditure_transaction_count = Column(Integer, default=0)
    vendor_count = Column(Integer, default=0)
    project_duration_days = Column(Integer, nullable=True)
    recommendation_to_sanction_days = Column(Integer, nullable=True)
    sanction_to_completion_days = Column(Integer, nullable=True)
    status = Column(String(100), nullable=True)
    work_category = Column(String(255), nullable=True)
    state = Column(String(100), nullable=True)
    constituency = Column(String(100), nullable=True)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    project = relationship("Project", back_populates="features")

class AnomalyResult(Base):
    __tablename__ = "anomaly_results"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    anomaly_type = Column(String(100), nullable=False) # Potential Anomaly, Potential Irregularity, High Risk, Review Required
    rule_code = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    severity = Column(String(50), default="MEDIUM") # LOW, MEDIUM, HIGH, CRITICAL
    score = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    project = relationship("Project", back_populates="anomalies")

class RiskScore(Base):
    __tablename__ = "risk_scores"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    overall_risk_score = Column(Float, default=0.0)
    financial_risk_score = Column(Float, default=0.0)
    delay_risk_score = Column(Float, default=0.0)
    vendor_risk_score = Column(Float, default=0.0)
    risk_level = Column(String(50), default="LOW") # LOW, MEDIUM, HIGH, CRITICAL
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    project = relationship("Project", back_populates="risk_scores")

class DuplicateCandidate(Base):
    __tablename__ = "duplicate_candidates"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    project_id_1 = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    project_id_2 = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    similarity_score = Column(Float, default=0.0)
    matching_reason = Column(Text, nullable=True)
    review_status = Column(String(50), default="PENDING") # PENDING, CONFIRMED_DUPLICATE, REJECTED
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ComplianceResult(Base):
    __tablename__ = "compliance_results"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    rule_name = Column(String(255), nullable=False)
    is_compliant = Column(Boolean, default=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, nullable=True)
    action = Column(String(255), nullable=False)
    entity_type = Column(String(100), nullable=False)
    entity_id = Column(String(255), nullable=True)
    details = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

# Future Tables (Designed Schema per requirements)
class ProjectLocation(Base):
    __tablename__ = "project_locations"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    address = Column(Text, nullable=True)
    pincode = Column(String(20), nullable=True)
    geofence_radius_meters = Column(Float, default=100.0)
    
    # NLP Location Extraction & Normalization Fields
    location_text = Column(Text, nullable=True) # Extracted location phrase
    village = Column(String(255), nullable=True)
    locality = Column(String(255), nullable=True)
    taluka = Column(String(255), nullable=True)
    from_location = Column(String(255), nullable=True) # For road projects
    to_location = Column(String(255), nullable=True) # For road projects
    
    # Accuracy, Quality & Confidence Metrics
    location_accuracy = Column(String(100), default="UNKNOWN") # EXACT, VILLAGE_LEVEL, APPROXIMATE, DISTRICT_CENTROID, UNKNOWN
    confidence_score = Column(String(50), default="UNKNOWN") # HIGH, MEDIUM, LOW, UNKNOWN
    location_status = Column(String(100), default="NOT_PROCESSED") # NOT_PROCESSED, LOCATION_EXTRACTED, GEOCODING_PENDING, GEOCODED, VERIFIED, FAILED, NOT_CONFIGURED, AMBIGUOUS
    source = Column(String(100), default="OFFICIAL_DATA") # OFFICIAL_DATA, BHUVAN_GEOCODING, GPS, SURVEY, MANUAL_VERIFIED, WORK_DESCRIPTION_EXTRACTION
    verified = Column(Boolean, default=False)
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    project = relationship("Project", back_populates="location")


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    document_type = Column(String(100), nullable=False) # Sanction Letter, Utilization Cert, Inspection Photo
    file_path = Column(Text, nullable=False)
    file_name = Column(String(255), nullable=False)
    uploaded_at = Column(DateTime, default=datetime.datetime.utcnow)

class DocumentExtraction(Base):
    __tablename__ = "document_extractions"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    document_id = Column(Integer, ForeignKey("documents.id", ondelete="CASCADE"), nullable=False, index=True)
    extracted_text = Column(Text, nullable=True)
    confidence_score = Column(Float, default=0.0)
    extraction_metadata = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class SatelliteObservation(Base):
    __tablename__ = "satellite_observations"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    satellite_source = Column(String(100), default="Sentinel-2")
    observation_date = Column(Date, nullable=False)
    ndvi_value = Column(Float, nullable=True)
    construction_progress_estimate = Column(Float, nullable=True)
    image_url = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class CitizenComplaint(Base):
    __tablename__ = "citizen_complaints"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    ticket_id = Column(String(100), unique=True, index=True, nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="SET NULL"), nullable=True, index=True)
    citizen_name = Column(String(255), nullable=True)
    citizen_phone = Column(String(50), nullable=True)
    complaint_category = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    status = Column(String(50), default="SUBMITTED", index=True) # SUBMITTED, IN_INVESTIGATION, RESOLVED, REJECTED
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ComplaintEvidence(Base):
    __tablename__ = "complaint_evidence"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    complaint_id = Column(Integer, ForeignKey("citizen_complaints.id", ondelete="CASCADE"), nullable=False, index=True)
    file_path = Column(Text, nullable=False)
    file_type = Column(String(50), nullable=False) # image, video, pdf
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
