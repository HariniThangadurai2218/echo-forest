import sys

import librosa
import numpy as np
import torch
import torch.nn as nn


CLASSES = [
    "normal_forest",
    "wildlife",
    "human_activity",
    "vehicle",
    "chainsaw"
]

SAMPLE_RATE = 16000
SAMPLES = 80000


class AudioCNN(nn.Module):

    def __init__(self, num_classes):

        super().__init__()

        self.network = nn.Sequential(

            nn.Conv2d(
                1,
                16,
                3,
                padding=1
            ),

            nn.ReLU(),

            nn.MaxPool2d(2),

            nn.Conv2d(
                16,
                32,
                3,
                padding=1
            ),

            nn.ReLU(),

            nn.MaxPool2d(2),

            nn.Conv2d(
                32,
                64,
                3,
                padding=1
            ),

            nn.ReLU(),

            nn.MaxPool2d(2),

            nn.AdaptiveAvgPool2d(
                (1, 1)
            )
        )

        self.classifier = nn.Linear(
            64,
            num_classes
        )

    def forward(self, x):

        x = self.network(x)

        x = x.view(
            x.size(0),
            -1
        )

        return self.classifier(x)


def preprocess(filepath):

    audio, sr = librosa.load(
        filepath,
        sr=SAMPLE_RATE,
        mono=True
    )

    if len(audio) < SAMPLES:

        audio = np.pad(
            audio,
            (0, SAMPLES - len(audio))
        )

    else:

        audio = audio[:SAMPLES]

    mel = librosa.feature.melspectrogram(
        y=audio,
        sr=SAMPLE_RATE,
        n_mels=64,
        n_fft=1024,
        hop_length=512
    )

    mel = librosa.power_to_db(
        mel,
        ref=np.max
    )

    mel = (
        mel - mel.mean()
    ) / (
        mel.std() + 1e-8
    )

    mel = torch.tensor(
        mel,
        dtype=torch.float32
    )

    return mel.unsqueeze(0).unsqueeze(0)


def predict(filepath):

    device = torch.device(
        "cuda"
        if torch.cuda.is_available()
        else "cpu"
    )

    checkpoint = torch.load(
        "models/audio_classifier.pth",
        map_location=device
    )

    model = AudioCNN(
        len(checkpoint["classes"])
    ).to(device)

    model.load_state_dict(
        checkpoint["model_state"]
    )

    model.eval()

    audio = preprocess(
        filepath
    ).to(device)

    with torch.no_grad():

        output = model(audio)

        probabilities = torch.softmax(
            output,
            dim=1
        )[0]

        predicted_id = (
            probabilities.argmax().item()
        )

        event = CLASSES[
            predicted_id
        ]

        confidence = (
            probabilities[
                predicted_id
            ].item()
        )

    return {
        "event": event,
        "confidence": round(
            confidence,
            4
        )
    }


def main():

    if len(sys.argv) < 2:

        print(
            "Usage:"
        )

        print(
            "python "
            "inference\\predict.py "
            "<audio_file>"
        )

        return

    filepath = sys.argv[1]

    result = predict(filepath)

    print()

    print(
        "========== ECHO-FOREST AI =========="
    )

    print(
        "Audio:",
        filepath
    )

    print(
        "Event:",
        result["event"]
    )

    print(
        "Confidence:",
        f'{result["confidence"] * 100:.2f}%'
    )

    print(
        "===================================="
    )


if __name__ == "__main__":
    main()