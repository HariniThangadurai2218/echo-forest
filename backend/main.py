from fastapi import FastAPI

from backend.database import create_tables
from backend.routers.events import router as events_router


app = FastAPI(
    title="Echo Forest API",
    description="Backend API for AI-powered forest acoustic monitoring",
    version="0.1.0"
)


create_tables()

app.include_router(events_router)


@app.get("/")
def root():
    return {
        "message": "Echo Forest API is running",
        "status": "online"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }