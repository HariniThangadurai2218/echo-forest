import json
import sys

from predict import predict


# Virtual sensor locations
SENSORS = {
    "S1": {
        "latitude": 12.3456,
        "longitude": 78.9012
    },
    "S2": {
        "latitude": 12.3468,
        "longitude": 78.9031
    },
    "S3": {
        "latitude": 12.3442,
        "longitude": 78.8998
    }
}


def get_severity(event_type, confidence):

    if event_type == "chainsaw" and confidence >= 0.50:
        return "HIGH"

    if event_type == "vehicle" and confidence >= 0.70:
        return "MEDIUM"

    if event_type == "human_activity" and confidence >= 0.70:
        return "MEDIUM"

    if event_type in ["wildlife", "normal_forest"]:
        return "LOW"

    return "LOW"


def create_event(audio_file, sensor_id="S1"):

    prediction = predict(audio_file)

    event_type = prediction["event"]
    confidence = prediction["confidence"]

    sensor = SENSORS[sensor_id]

    severity = get_severity(
        event_type,
        confidence
    )

    result = {
        "event_type": event_type,
        "confidence": confidence,
        "latitude": sensor["latitude"],
        "longitude": sensor["longitude"],
        "severity": severity
    }

    return result


def main():

    if len(sys.argv) < 2:

        print(
            "Usage:"
        )

        print(
            "python inference\\event_processor.py <audio_file>"
        )

        return

    audio_file = sys.argv[1]

    result = create_event(
        audio_file,
        sensor_id="S1"
    )

    print(
        json.dumps(
            result,
            indent=2
        )
    )


if __name__ == "__main__":
    main()