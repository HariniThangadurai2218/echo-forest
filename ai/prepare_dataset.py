import os
import shutil
import pandas as pd


ESC50_DIR = r"D:\echoforest\ESC-50-master\ESC-50-master"
PROJECT_DATA = r"D:\echoforest\echo-forest\ai\data\raw"

CSV_PATH = os.path.join(
    ESC50_DIR,
    "meta",
    "esc50.csv"
)

AUDIO_DIR = os.path.join(
    ESC50_DIR,
    "audio"
)


mapping = {
    "chainsaw": "chainsaw",
    "engine": "vehicle",
    "car_horn": "vehicle",
    "footsteps": "human_activity",
    "chirping_birds": "wildlife",
    "crickets": "wildlife",
    "dog": "wildlife",
    "cat": "wildlife",
    "crow": "wildlife",
    "wind": "normal_forest",
    "rain": "normal_forest",
    "thunderstorm": "normal_forest"
}


df = pd.read_csv(CSV_PATH)

counts = {}


for source_class, target_class in mapping.items():

    target_dir = os.path.join(
        PROJECT_DATA,
        target_class
    )

    os.makedirs(
        target_dir,
        exist_ok=True
    )

    files = df[
        df["category"] == source_class
    ]["filename"].tolist()

    counts[target_class] = (
        counts.get(target_class, 0) + len(files)
    )

    for filename in files:

        source = os.path.join(
            AUDIO_DIR,
            filename
        )

        destination = os.path.join(
            target_dir,
            filename
        )

        if os.path.exists(source):

            shutil.copy2(
                source,
                destination
            )


print("\nDataset preparation complete!\n")


for folder in [
    "normal_forest",
    "wildlife",
    "human_activity",
    "vehicle",
    "chainsaw",
    "gunshot"
]:

    folder_path = os.path.join(
        PROJECT_DATA,
        folder
    )

    if os.path.exists(folder_path):

        count = len([
            f
            for f in os.listdir(folder_path)
            if f.lower().endswith(".wav")
        ])

    else:

        count = 0

    print(
        f"{folder:20} {count} audio files"
    )