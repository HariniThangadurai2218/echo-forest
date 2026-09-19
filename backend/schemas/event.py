from datetime import datetime

from pydantic import BaseModel, Field


class EventCreate(BaseModel):
    event_type: str = Field(..., min_length=1, max_length=50)
    confidence: float = Field(..., ge=0.0, le=1.0)
    latitude: float
    longitude: float
    severity: str = Field(..., min_length=1, max_length=20)


class AlertResponse(BaseModel):
    alert_level: str
    title: str
    message: str
    requires_action: bool


class EventResponse(EventCreate):
    id: int
    status: str
    timestamp: datetime
    alert: AlertResponse

    model_config = {
        "from_attributes": True
    }