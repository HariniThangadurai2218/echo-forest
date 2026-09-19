from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.models.event import AcousticEvent
from backend.schemas.event import EventCreate, EventResponse
from backend.services.alert_service import generate_alert


router = APIRouter(
    prefix="/events",
    tags=["Events"]
)


@router.post("/", response_model=EventResponse)
def create_event(
    event: EventCreate,
    db: Session = Depends(get_db)
):
    alert = generate_alert(
        event.event_type,
        event.confidence
    )

    new_event = AcousticEvent(
        event_type=event.event_type,
        confidence=event.confidence,
        latitude=event.latitude,
        longitude=event.longitude,
        severity=event.severity,
        status="NEW"
    )

    db.add(new_event)
    db.commit()
    db.refresh(new_event)

    return {
        **new_event.__dict__,
        "alert": alert
    }

@router.get("/", response_model=list[EventResponse])
def get_events(
    db: Session = Depends(get_db)
):
    events = (
        db.query(AcousticEvent)
        .order_by(AcousticEvent.timestamp.desc())
        .all()
    )

    result = []

    for event in events:
        alert = generate_alert(
            event.event_type,
            event.confidence
        )

        result.append({
            **event.__dict__,
            "alert": alert
        })

    return result
@router.get("/alerts")
def get_alerts(
    db: Session = Depends(get_db)
):
    events = (
        db.query(AcousticEvent)
        .order_by(AcousticEvent.timestamp.desc())
        .all()
    )

    alerts = []

    for event in events:
        alert = generate_alert(
            event.event_type,
            event.confidence
        )

        alerts.append({
            "event_id": event.id,
            "event_type": event.event_type,
            "confidence": event.confidence,
            "latitude": event.latitude,
            "longitude": event.longitude,
            "severity": event.severity,
            "status": event.status,
            "timestamp": event.timestamp,
            **alert
        })

    return alerts