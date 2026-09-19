"use client";

import { useState } from "react";

const initialAlerts = [
  {
    id: 1,
    type: "Possible Gunshot",
    icon: "🚨",
    location: "Zone B3",
    time: "14:32:08",
    confidence: 94,
    source: "Acoustic Sensor 07",
    status: "Pending Verification",
  },
  {
    id: 2,
    type: "Chainsaw Detected",
    icon: "⚠️",
    location: "Zone A2",
    time: "13:17:42",
    confidence: 91,
    source: "Acoustic Sensor 03",
    status: "Pending Verification",
  },
  {
    id: 3,
    type: "Human Activity",
    icon: "⚠️",
    location: "Zone C1",
    time: "11:45:19",
    confidence: 87,
    source: "Acoustic Sensor 11",
    status: "Verified",
  },
];

export default function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);

  const [selectedAlert, setSelectedAlert] = useState<
    (typeof initialAlerts)[0] | null
  >(null);

  const updateAlertStatus = (
    id: number,
    status: string
  ) => {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === id
          ? { ...alert, status }
          : alert
      )
    );

    setSelectedAlert(null);
  };

  const pendingCount = alerts.filter(
    (alert) => alert.status === "Pending Verification"
  ).length;

  const verifiedCount = alerts.filter(
    (alert) => alert.status === "Verified"
  ).length;

  const falseAlarmCount = alerts.filter(
    (alert) => alert.status === "False Alarm"
  ).length;

  return (
    <main className="min-h-screen bg-[#08120d] p-8 text-white">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Alerts
        </h1>

        <p className="mt-2 text-gray-400">
          Monitor and verify detected forest events.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-4">

        <div className="rounded-xl bg-[#122219] p-6">
          <p className="text-gray-400">
            Total Alerts
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {alerts.length}
          </h2>
        </div>

        <div className="rounded-xl bg-[#122219] p-6">
          <p className="text-gray-400">
            Pending Verification
          </p>

          <h2 className="mt-2 text-3xl font-bold text-orange-400">
            {pendingCount}
          </h2>
        </div>

        <div className="rounded-xl bg-[#122219] p-6">
          <p className="text-gray-400">
            Verified
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-400">
            {verifiedCount}
          </h2>
        </div>

        <div className="rounded-xl bg-[#122219] p-6">
          <p className="text-gray-400">
            False Alarms
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-400">
            {falseAlarmCount}
          </h2>
        </div>

      </div>

      {/* Alert List */}
      <div className="space-y-5">

        {alerts.map((alert) => (

          <div
            key={alert.id}
            className="rounded-xl bg-[#122219] p-6"
          >

            {/* Alert Header */}
            <div className="flex flex-col justify-between gap-4 md:flex-row">

              <div className="flex items-center gap-3">

                <span className="text-2xl">
                  {alert.icon}
                </span>

                <div>

                  <h2
                    className={`text-xl font-semibold ${
                      alert.type === "Possible Gunshot"
                        ? "text-red-400"
                        : "text-orange-400"
                    }`}
                  >
                    {alert.type}
                  </h2>

                  <p className="text-sm text-gray-400">
                    {alert.location} • {alert.time}
                  </p>

                </div>

              </div>

              {/* Confidence */}
              <div className="text-left md:text-right">

                <p className="text-sm text-gray-400">
                  Detection Confidence
                </p>

                <p className="text-2xl font-bold">
                  {alert.confidence}%
                </p>

              </div>

            </div>

            {/* Details */}
            <div className="mt-6 grid grid-cols-1 gap-4 rounded-lg bg-[#0b1811] p-5 md:grid-cols-2">

              <div>
                <p className="text-sm text-gray-500">
                  Location
                </p>

                <p className="mt-1 font-medium">
                  {alert.location}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Detection Time
                </p>

                <p className="mt-1 font-medium">
                  {alert.time}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Detection Source
                </p>

                <p className="mt-1 font-medium">
                  {alert.source}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Status
                </p>

                <p
                  className={`mt-1 font-medium ${
                    alert.status === "Verified"
                      ? "text-green-400"
                      : alert.status === "False Alarm"
                      ? "text-gray-400"
                      : "text-orange-400"
                  }`}
                >
                  {alert.status}
                </p>
              </div>

            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap gap-3">

              <button
                className="rounded-lg bg-[#1b3326] px-4 py-2 text-sm font-medium hover:bg-[#254936]"
              >
                View Location
              </button>

              <button
                onClick={() => setSelectedAlert(alert)}
                disabled={alert.status !== "Pending Verification"}
                className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                📹 Check Camera
              </button>

              {alert.status === "Pending Verification" && (
                <button
                  onClick={() =>
                    updateAlertStatus(
                      alert.id,
                      "Verified"
                    )
                  }
                  className="rounded-lg border border-green-700 px-4 py-2 text-sm text-green-400 hover:bg-green-900/30"
                >
                  ✓ Confirm
                </button>
              )}

            </div>

          </div>
        ))}

      </div>

      {/* Camera Verification Modal */}
      {selectedAlert && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

          <div className="w-full max-w-3xl rounded-2xl bg-[#122219] p-6 shadow-2xl">

            {/* Header */}
            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold">
                  Camera Verification
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Verify the detected event visually.
                </p>
              </div>

              <button
                onClick={() => setSelectedAlert(null)}
                className="rounded-lg px-3 py-2 text-xl text-gray-400 hover:bg-[#1b3326] hover:text-white"
              >
                ✕
              </button>

            </div>

            {/* Detection Info */}
            <div className="mb-5 rounded-lg bg-[#0b1811] p-4">

              <div className="flex flex-wrap gap-6">

                <div>
                  <p className="text-xs text-gray-500">
                    Detection
                  </p>

                  <p className="font-medium">
                    {selectedAlert.type}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Location
                  </p>

                  <p className="font-medium">
                    {selectedAlert.location}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Time
                  </p>

                  <p className="font-medium">
                    {selectedAlert.time}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Confidence
                  </p>

                  <p className="font-medium">
                    {selectedAlert.confidence}%
                  </p>
                </div>

              </div>

            </div>

            {/* Camera */}
            <div className="flex h-80 items-center justify-center rounded-xl bg-black">

              <div className="text-center">

                <div className="mb-3 text-5xl">
                  📹
                </div>

                <p className="text-lg font-medium">
                  Camera Feed
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Camera for {selectedAlert.location}
                </p>

                <p className="mt-3 text-xs text-gray-600">
                  Live camera stream will be connected here
                </p>

              </div>

            </div>

            {/* Verification */}
            <div className="mt-5 flex flex-wrap justify-end gap-3">

              <button
                onClick={() => setSelectedAlert(null)}
                className="rounded-lg border border-gray-700 px-5 py-2 text-sm text-gray-300 hover:bg-[#1b3326]"
              >
                Close
              </button>

              <button
                onClick={() =>
                  updateAlertStatus(
                    selectedAlert.id,
                    "False Alarm"
                  )
                }
                className="rounded-lg bg-gray-700 px-5 py-2 text-sm font-medium hover:bg-gray-600"
              >
                ❌ False Alarm
              </button>

              <button
                onClick={() =>
                  updateAlertStatus(
                    selectedAlert.id,
                    "Verified"
                  )
                }
                className="rounded-lg bg-green-700 px-5 py-2 text-sm font-medium hover:bg-green-600"
              >
                ✅ Confirm Event
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}