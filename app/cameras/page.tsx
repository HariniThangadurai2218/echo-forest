"use client";

import { useState } from "react";

const cameras = [
  {
    id: "CAM-01",
    name: "North Forest Camera",
    zone: "Zone A1",
    status: "Online",
    lastEvent: "No recent event",
  },
  {
    id: "CAM-02",
    name: "East Forest Camera",
    zone: "Zone A2",
    status: "Online",
    lastEvent: "Chainsaw Detected",
  },
  {
    id: "CAM-03",
    name: "Central Forest Camera",
    zone: "Zone B3",
    status: "Online",
    lastEvent: "Possible Gunshot",
  },
  {
    id: "CAM-04",
    name: "West Forest Camera",
    zone: "Zone C1",
    status: "Offline",
    lastEvent: "Human Activity",
  },
  {
    id: "CAM-05",
    name: "South Forest Camera",
    zone: "Zone D2",
    status: "Online",
    lastEvent: "No recent event",
  },
  {
    id: "CAM-06",
    name: "Central East Camera",
    zone: "Zone B4",
    status: "Online",
    lastEvent: "No recent event",
  },
];

export default function Cameras() {
  const [selectedCamera, setSelectedCamera] = useState<
    (typeof cameras)[0] | null
  >(null);

  const onlineCount = cameras.filter(
    (camera) => camera.status === "Online"
  ).length;

  const offlineCount = cameras.filter(
    (camera) => camera.status === "Offline"
  ).length;

  const alertCount = cameras.filter(
    (camera) =>
      camera.lastEvent !== "No recent event"
  ).length;

  return (
    <main className="min-h-screen bg-[#08120d] p-8 text-white">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Cameras
        </h1>

        <p className="mt-2 text-gray-400">
          Monitor camera feeds and verify detected events.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">

        <div className="rounded-xl bg-[#122219] p-6">
          <p className="text-gray-400">
            Cameras Online
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-400">
            {onlineCount}
          </h2>
        </div>

        <div className="rounded-xl bg-[#122219] p-6">
          <p className="text-gray-400">
            Cameras Offline
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-400">
            {offlineCount}
          </h2>
        </div>

        <div className="rounded-xl bg-[#122219] p-6">
          <p className="text-gray-400">
            Cameras With Events
          </p>

          <h2 className="mt-2 text-3xl font-bold text-orange-400">
            {alertCount}
          </h2>
        </div>

      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        {cameras.map((camera) => (

          <div
            key={camera.id}
            className="overflow-hidden rounded-xl bg-[#122219]"
          >

            {/* Camera Preview */}
            <div className="relative flex h-56 items-center justify-center bg-black">

              <div className="text-center">

                <div className="mb-3 text-5xl">
                  📹
                </div>

                <p className="text-sm text-gray-400">
                  {camera.name}
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Live feed
                </p>

              </div>

              {/* Status */}
              <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5">

                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    camera.status === "Online"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />

                <span className="text-xs">
                  {camera.status}
                </span>

              </div>

              {/* Camera ID */}
              <span className="absolute right-3 top-3 rounded bg-black/60 px-2 py-1 text-xs text-gray-300">
                {camera.id}
              </span>

            </div>

            {/* Camera Information */}
            <div className="p-5">

              <div className="flex items-start justify-between">

                <div>
                  <h2 className="font-semibold">
                    {camera.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {camera.zone}
                  </p>
                </div>

              </div>

              {/* Latest Event */}
              <div className="mt-4 rounded-lg bg-[#0b1811] p-3">

                <p className="text-xs text-gray-500">
                  Latest Event
                </p>

                <p
                  className={`mt-1 text-sm ${
                    camera.lastEvent ===
                    "No recent event"
                      ? "text-gray-400"
                      : "text-orange-400"
                  }`}
                >
                  {camera.lastEvent}
                </p>

              </div>

              {/* Button */}
              <button
                onClick={() =>
                  setSelectedCamera(camera)
                }
                disabled={camera.status === "Offline"}
                className="mt-4 w-full rounded-lg bg-[#1b3326] px-4 py-2.5 text-sm font-medium hover:bg-[#254936] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {camera.status === "Online"
                  ? "View Camera"
                  : "Camera Offline"}
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* Camera Modal */}
      {selectedCamera && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

          <div className="w-full max-w-4xl rounded-2xl bg-[#122219] p-6">

            {/* Modal Header */}
            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold">
                  {selectedCamera.name}
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  {selectedCamera.id} •{" "}
                  {selectedCamera.zone}
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedCamera(null)
                }
                className="rounded-lg px-3 py-2 text-xl text-gray-400 hover:bg-[#1b3326] hover:text-white"
              >
                ✕
              </button>

            </div>

            {/* Large Camera Feed */}
            <div className="flex h-[450px] items-center justify-center rounded-xl bg-black">

              <div className="text-center">

                <div className="mb-4 text-7xl">
                  📹
                </div>

                <p className="text-xl font-semibold">
                  Live Camera Feed
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  {selectedCamera.name}
                </p>

                <div className="mt-4 flex items-center justify-center gap-2">

                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                  <span className="text-sm text-green-400">
                    LIVE
                  </span>

                </div>

              </div>

            </div>

            {/* Camera Details */}
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">

              <div className="rounded-lg bg-[#0b1811] p-4">
                <p className="text-xs text-gray-500">
                  Status
                </p>

                <p className="mt-1 font-medium text-green-400">
                  {selectedCamera.status}
                </p>
              </div>

              <div className="rounded-lg bg-[#0b1811] p-4">
                <p className="text-xs text-gray-500">
                  Location
                </p>

                <p className="mt-1 font-medium">
                  {selectedCamera.zone}
                </p>
              </div>

              <div className="rounded-lg bg-[#0b1811] p-4">
                <p className="text-xs text-gray-500">
                  Latest Event
                </p>

                <p className="mt-1 font-medium text-orange-400">
                  {selectedCamera.lastEvent}
                </p>
              </div>

            </div>

            {/* Close */}
            <div className="mt-5 flex justify-end">

              <button
                onClick={() =>
                  setSelectedCamera(null)
                }
                className="rounded-lg border border-gray-700 px-5 py-2 text-sm text-gray-300 hover:bg-[#1b3326]"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}