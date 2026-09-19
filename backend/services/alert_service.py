def generate_alert(event_type: str, confidence: float) -> dict:
    event_type = event_type.lower()

    if event_type == "gunshot" and confidence >= 0.80:
        return {
            "alert_level": "CRITICAL",
            "title": "Possible Gunshot Detected",
            "message": "A high-confidence gunshot-like acoustic event was detected. Immediate verification is recommended.",
            "requires_action": True,
        }

    if event_type == "chainsaw" and confidence >= 0.80:
        return {
            "alert_level": "HIGH",
            "title": "Possible Illegal Logging Activity",
            "message": "A high-confidence chainsaw-like acoustic event was detected.",
            "requires_action": True,
        }

    if event_type == "human_intrusion" and confidence >= 0.80:
        return {
            "alert_level": "HIGH",
            "title": "Possible Human Intrusion",
            "message": "A high-confidence human activity event was detected in the monitored area.",
            "requires_action": True,
        }

    if event_type == "vehicle" and confidence >= 0.80:
        return {
            "alert_level": "MEDIUM",
            "title": "Vehicle Activity Detected",
            "message": "A vehicle-like acoustic event was detected in the monitored area.",
            "requires_action": False,
        }

    if event_type == "animal" and confidence >= 0.80:
        return {
            "alert_level": "LOW",
            "title": "Wildlife Activity Detected",
            "message": "A possible wildlife acoustic event was detected.",
            "requires_action": False,
        }

    return {
        "alert_level": "INFO",
        "title": "Acoustic Event Detected",
        "message": "An acoustic event was detected but does not currently require immediate action.",
        "requires_action": False,
    }