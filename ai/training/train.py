import os
import glob

import numpy as np
import librosa
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from sklearn.model_selection import train_test_split


DATA_DIR = "data/raw"

CLASSES = [
    "normal_forest",
    "wildlife",
    "human_activity",
    "vehicle",
    "chainsaw"
]

CLASS_TO_ID = {
    name: i
    for i, name in enumerate(CLASSES)
}

SAMPLE_RATE = 16000
DURATION = 5
SAMPLES = SAMPLE_RATE * DURATION


class AudioDataset(Dataset):

    def __init__(self, files):
        self.files = files

    def __len__(self):
        return len(self.files)

    def __getitem__(self, index):

        filepath, label = self.files[index]

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
        ).unsqueeze(0)

        label = torch.tensor(
            label,
            dtype=torch.long
        )

        return mel, label


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


def collect_files():

    files = []

    for class_name in CLASSES:

        folder = os.path.join(
            DATA_DIR,
            class_name
        )

        wav_files = glob.glob(
            os.path.join(
                folder,
                "*.wav"
            )
        )

        for wav in wav_files:

            files.append(
                (
                    wav,
                    CLASS_TO_ID[class_name]
                )
            )

    return files


def main():

    print("Collecting audio files...")

    all_files = collect_files()

    print(
        "Total files:",
        len(all_files)
    )

    labels = [
        label
        for _, label in all_files
    ]

    train_files, test_files = train_test_split(
        all_files,
        test_size=0.2,
        random_state=42,
        stratify=labels
    )

    print(
        "Training files:",
        len(train_files)
    )

    print(
        "Testing files:",
        len(test_files)
    )

    train_dataset = AudioDataset(
        train_files
    )

    test_dataset = AudioDataset(
        test_files
    )

    train_loader = DataLoader(
        train_dataset,
        batch_size=16,
        shuffle=True
    )

    test_loader = DataLoader(
        test_dataset,
        batch_size=16,
        shuffle=False
    )

    device = torch.device(
        "cuda"
        if torch.cuda.is_available()
        else "cpu"
    )

    print(
        "Using device:",
        device
    )

    if torch.cuda.is_available():

        print(
            "GPU:",
            torch.cuda.get_device_name(0)
        )

    model = AudioCNN(
        len(CLASSES)
    ).to(device)

    class_weights = torch.tensor(
        [
            0.8,
            0.48,
            2.4,
            1.2,
            2.4
        ],
        dtype=torch.float32
    ).to(device)

    criterion = nn.CrossEntropyLoss(
        weight=class_weights
    )

    optimizer = torch.optim.Adam(
        model.parameters(),
        lr=0.001
    )

    epochs = 15

    for epoch in range(epochs):

        model.train()

        total_loss = 0
        correct = 0
        total = 0

        for inputs, labels in train_loader:

            inputs = inputs.to(device)
            labels = labels.to(device)

            optimizer.zero_grad()

            outputs = model(inputs)

            loss = criterion(
                outputs,
                labels
            )

            loss.backward()

            optimizer.step()

            total_loss += loss.item()

            predictions = outputs.argmax(
                dim=1
            )

            correct += (
                predictions == labels
            ).sum().item()

            total += labels.size(0)

        accuracy = (
            100 * correct / total
        )

        print(
            f"Epoch {epoch + 1}/{epochs} "
            f"Loss: "
            f"{total_loss / len(train_loader):.4f} "
            f"Accuracy: "
            f"{accuracy:.2f}%"
        )

    model.eval()

    correct = 0
    total = 0

    with torch.no_grad():

        for inputs, labels in test_loader:

            inputs = inputs.to(device)
            labels = labels.to(device)

            outputs = model(inputs)

            predictions = outputs.argmax(
                dim=1
            )

            correct += (
                predictions == labels
            ).sum().item()

            total += labels.size(0)

    test_accuracy = (
        100 * correct / total
    )

    print()

    print(
        f"Test Accuracy: "
        f"{test_accuracy:.2f}%"
    )

    os.makedirs(
        "models",
        exist_ok=True
    )

    torch.save(
        {
            "model_state":
                model.state_dict(),

            "classes":
                CLASSES
        },
        "models/audio_classifier.pth"
    )

    print(
        "Model saved to "
        "models/audio_classifier.pth"
    )


if __name__ == "__main__":
    main()