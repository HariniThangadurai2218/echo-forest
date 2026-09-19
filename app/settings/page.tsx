"use client";

import { useState } from "react";

export default function Settings() {
  const [acousticMonitoring, setAcousticMonitoring] = useState(true);
  const [cameraVerification, setCameraVerification] = useState(true);
  const [highConfidenceOnly, setHighConfidenceOnly] = useState(false);
  const [alertSound, setAlertSound] = useState(true);

  return (
    <main className="min-h-screen bg-[#08120d] p-8 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-gray-400">
          Configure the forest monitoring system
        </p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Monitoring Settings */}
        <section className="rounded-xl bg-[#122219] p-6">
          <h2 className="text-xl font-semibold">Monitoring</h2>
          <p className="mt-1 text-sm text-gray-500">
            Control the main surveillance systems
          </p>

          <div className="mt-6 space-y-5">
            <SettingRow
              title="Acoustic Monitoring"
              description="Continuously monitor forest sounds for suspicious activity"
              enabled={acousticMonitoring}
              onChange={() => setAcousticMonitoring(!acousticMonitoring)}
            />

            <SettingRow
              title="Camera Verification"
              description="Use nearby cameras to verify acoustic detections"
              enabled={cameraVerification}
              onChange={() => setCameraVerification(!cameraVerification)}
            />

            <SettingRow
              title="High Confidence Alerts Only"
              description="Only generate alerts when detection confidence is high"
              enabled={highConfidenceOnly}
              onChange={() => setHighConfidenceOnly(!highConfidenceOnly)}
            />
          </div>
        </section>

        {/* Alert Settings */}
        <section className="rounded-xl bg-[#122219] p-6">
          <h2 className="text-xl font-semibold">Alerts</h2>
          <p className="mt-1 text-sm text-gray-500">
            Configure how system alerts are handled
          </p>

          <div className="mt-6 space-y-5">
            <SettingRow
              title="Alert Sound"
              description="Play a sound when a critical event is detected"
              enabled={alertSound}
              onChange={() => setAlertSound(!alertSound)}
            />
          </div>
        </section>

        {/* Detection Thresholds */}
        <section className="rounded-xl bg-[#122219] p-6">
          <h2 className="text-xl font-semibold">Detection Thresholds</h2>
          <p className="mt-1 text-sm text-gray-500">
            Configure confidence levels for event detection
          </p>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm text-gray-400">
                Alert Confidence Threshold
              </label>

              <div className="mt-2 flex items-center gap-3">
                <input
                  type="number"
                  defaultValue={80}
                  min={0}
                  max={100}
                  className="w-full rounded-lg border border-gray-700 bg-[#0b1811] px-4 py-3 text-white outline-none focus:border-green-600"
                />
                <span className="text-gray-400">%</span>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Critical Alert Threshold
              </label>

              <div className="mt-2 flex items-center gap-3">
                <input
                  type="number"
                  defaultValue={90}
                  min={0}
                  max={100}
                  className="w-full rounded-lg border border-gray-700 bg-[#0b1811] px-4 py-3 text-white outline-none focus:border-green-600"
                />
                <span className="text-gray-400">%</span>
              </div>
            </div>
          </div>
        </section>

        {/* System Information */}
        <section className="rounded-xl bg-[#122219] p-6">
          <h2 className="text-xl font-semibold">System Information</h2>

          <div className="mt-5 space-y-4">
            <InfoRow label="System Status" value="Online" green />
            <InfoRow label="Active Nodes" value="24" />
            <InfoRow label="Connected Cameras" value="5 / 6" />
            <InfoRow label="Backend Status" value="Connected" green />
            <InfoRow label="Last System Sync" value="14:35:21" />
          </div>
        </section>

        {/* Save */}
        <button
          onClick={() => alert("Settings saved successfully")}
          className="rounded-lg bg-green-700 px-6 py-3 font-medium transition hover:bg-green-600"
        >
          Save Settings
        </button>
      </div>
    </main>
  );
}

/* Toggle Setting */

function SettingRow({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-gray-800 pb-5 last:border-0 last:pb-0">
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>

      <button
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-green-600" : "bg-gray-700"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

/* Information Row */

function InfoRow({
  label,
  value,
  green = false,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-gray-800 pb-3 last:border-0">
      <span className="text-gray-400">{label}</span>

      <span className={green ? "text-green-400" : "text-gray-200"}>
        {value}
      </span>
    </div>
  );
}