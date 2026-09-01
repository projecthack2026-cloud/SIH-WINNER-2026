import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.routers import projects, financial, dashboard, mp, calamities, analytics, map

# Ensure models are loaded and tables exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_origin_regex=settings.CORS_ORIGIN_REGEX,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(projects.router, prefix=settings.API_V1_STR)
app.include_router(financial.router, prefix=settings.API_V1_STR)
app.include_router(dashboard.router, prefix=settings.API_V1_STR)
app.include_router(mp.router, prefix=settings.API_V1_STR)
app.include_router(calamities.router, prefix=settings.API_V1_STR)
app.include_router(analytics.router, prefix=settings.API_V1_STR)
app.include_router(map.router, prefix=settings.API_V1_STR)


@app.get("/")
def root():
    return {
        "title": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "online",
        "docs": f"{settings.API_V1_STR}/docs"
    }

@app.get("/health")
@app.get(f"{settings.API_V1_STR}/health")
def health_check():
    db_type = "postgresql" if settings.DATABASE_URL.startswith(("postgresql", "postgres")) else "sqlite"
    connected = False
    try:
        with engine.connect() as conn:
            connected = True
    except Exception:
        connected = False

    return {
        "status": "ok" if connected else "degraded",
        "database": "connected" if connected else "disconnected",
        "database_type": db_type
    }

@app.get("/admin/system/database")
@app.get(f"{settings.API_V1_STR}/admin/system/database")
def get_system_database_diagnostics():
    db_type = "postgresql" if settings.DATABASE_URL.startswith(("postgresql", "postgres")) else "sqlite"
    connected = False
    table_counts = {}

    try:
        from sqlalchemy import text
        with engine.connect() as conn:
            connected = True
            tables = [
                "users", "projects", "project_recommendations", "project_sanctions",
                "project_completions", "project_expenditures", "mp_allocations",
                "calamity_consents", "project_features", "anomaly_results",
                "risk_scores", "project_locations", "citizen_complaints", "audit_logs"
            ]
            for t in tables:
                try:
                    res = conn.execute(text(f"SELECT COUNT(*) FROM {t}"))
                    table_counts[t] = res.scalar() or 0
                except Exception:
                    table_counts[t] = 0
    except Exception as e:
        connected = False

    return {
        "database_type": db_type,
        "connected": connected,
        "tables": table_counts
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)
