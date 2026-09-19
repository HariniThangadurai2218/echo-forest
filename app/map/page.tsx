"use client";

import { useState } from "react";

const nodes = [
  {
    id: "N-01",
    name: "North Forest Node",
    zone: "Zone A1",
    status: "Active",
    battery: 92,
    events: 2,
    type: "node",
    x: 25,
    y: 25,
  },
  {
    id: "N-02",
    name: "East Forest Node",
    zone: "Zone A2",
    status: "Alert",
    battery: 78,
    events: 5,
    type: "alert",
    event: "Chainsaw Detected",
    x: 70,
    y: 30,
  },
  {
    id: "N-03",
    name: "Central Forest Node",
    zone: "Zone B3",
    status: "Alert",
    battery: 86,
    events: 7,
    type: "alert",
    event: "Possible Gunshot",
    x: 52,
    y: 55,
  },
  {
    id: "N-04",
    name: "West Forest Node",
    zone: "Zone C1",
    status: "Active",
    battery: 95,
    events: 1,
    type: "node",
    x: 25,
    y: 70,
  },
  {
    id: "N-05",
    name: "South Forest Node",
    zone: "Zone D2",
    status: "Warning",
    battery: 64,
    events: 3,
    type: "warning",
    event: "Human Activity",
    x: 75,
    y: 75,
  },
  {
    id: "N-06",
    name: "Central East Node",
    zone: "Zone B4",
    status: "Active",
    battery: 88,
    events: 0,
    type: "node",
    x: 72,
    y: 55,
  },
];

export default function MapPage() {
  const [selectedNode, setSelectedNode] = useState<
    (typeof nodes)[0] | null
  >(null);

  const activeNodes = nodes.filter(
    (node) => node.status === "Active"
  ).length;

  const alertNodes = nodes.filter(
    (node) => node.status === "Alert"
  ).length;

  const warningNodes = nodes.filter(
    (node) => node.status === "Warning"
  ).length;

  return (
    <main className="min-h-screen bg-[#08120d] p-8 text-white">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Forest Map
        </h1>

        <p className="mt-2 text-gray-400">
          Monitor sensor locations and detected events across
          the forest.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">

        <div className="rounded-xl bg-[#122219] p-5">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-green-500" />

            <p className="text-gray-400">
              Active Nodes
            </p>
          </div>

          <h2 className="mt-2 text-3xl font-bold">
            {activeNodes}
          </h2>
        </div>

        <div className="rounded-xl bg-[#122219] p-5">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-red-500" />

            <p className="text-gray-400">
              Active Alerts
            </p>
          </div>

          <h2 className="mt-2 text-3xl font-bold text-red-400">
            {alertNodes}
          </h2>
        </div>

        <div className="rounded-xl bg-[#122219] p-5">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-orange-400" />

            <p className="text-gray-400">
              Warnings
            </p>
          </div>

          <h2 className="mt-2 text-3xl font-bold text-orange-400">
            {warningNodes}
          </h2>
        </div>

      </div>

      {/* Map + Details */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">

        {/* Map */}
        <div className="xl:col-span-3 rounded-xl bg-[#122219] p-5">

          <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>
              <h2 className="text-xl font-semibold">
                Live Forest Monitoring
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Click a node to view details
              </p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-sm">

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-green-500" />
                Active
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                Alert
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-orange-400" />
                Warning
              </div>

            </div>

          </div>

          {/* Mock Map */}
          <div className="relative h-[600px] overflow-hidden rounded-xl bg-[#07130c]">

            {/* Forest grid */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(#31513c 1px, transparent 1px), linear-gradient(90deg, #31513c 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />

            {/* Forest label */}
            <div className="absolute left-6 top-5 rounded-lg bg-black/40 px-4 py-2 text-sm text-gray-400">
              🌲 Protected Forest Area
            </div>

            {/* Zone labels */}
            <span className="absolute left-[20%] top-[15%] text-xs text-gray-600">
              ZONE A
            </span>

            <span className="absolute left-[45%] top-[43%] text-xs text-gray-600">
              ZONE B
            </span>

            <span className="absolute left-[18%] top-[62%] text-xs text-gray-600">
              ZONE C
            </span>

            <span className="absolute left-[65%] top-[62%] text-xs text-gray-600">
              ZONE D
            </span>

            {/* Sensor Nodes */}
            {nodes.map((node) => (

              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                }}
                title={node.name}
              >

                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#07130c] shadow-lg transition hover:scale-125 ${
                    node.type === "alert"
                      ? "bg-red-500"
                      : node.type === "warning"
                      ? "bg-orange-400"
                      : "bg-green-500"
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>

                <span className="mt-1 block whitespace-nowrap text-xs text-gray-300">
                  {node.id}
                </span>

              </button>

            ))}

            {/* North indicator */}
            <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-sm">
              ↑ N
            </div>

            {/* Map status */}
            <div className="absolute bottom-5 left-5 rounded-lg bg-black/50 px-4 py-2 text-xs text-gray-400">
              Last updated: Just now
            </div>

          </div>

        </div>

        {/* Node Details */}
        <div className="rounded-xl bg-[#122219] p-5">

          <h2 className="text-xl font-semibold">
            Node Details
          </h2>

          {!selectedNode ? (

            <div className="flex h-[500px] items-center justify-center text-center">

              <div>
                <div className="mb-3 text-4xl">
                  📍
                </div>

                <p className="font-medium">
                  Select a node
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Click any sensor on the map to view
                  its details.
                </p>
              </div>

            </div>

          ) : (

            <div className="mt-6">

              {/* Node name */}
              <div className="mb-6">

                <div className="flex items-center gap-3">

                  <span
                    className={`h-3 w-3 rounded-full ${
                      selectedNode.type === "alert"
                        ? "bg-red-500"
                        : selectedNode.type === "warning"
                        ? "bg-orange-400"
                        : "bg-green-500"
                    }`}
                  />

                  <h3 className="text-lg font-semibold">
                    {selectedNode.name}
                  </h3>

                </div>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedNode.id}
                </p>

              </div>

              {/* Status */}
              <div className="mb-5 rounded-lg bg-[#0b1811] p-4">

                <p className="text-xs text-gray-500">
                  Status
                </p>

                <p
                  className={`mt-1 font-semibold ${
                    selectedNode.status === "Alert"
                      ? "text-red-400"
                      : selectedNode.status === "Warning"
                      ? "text-orange-400"
                      : "text-green-400"
                  }`}
                >
                  {selectedNode.status}
                </p>

              </div>

              {/* Information */}
              <div className="space-y-4">

                <div>
                  <p className="text-xs text-gray-500">
                    Zone
                  </p>

                  <p className="mt-1">
                    {selectedNode.zone}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Battery
                  </p>

                  <p className="mt-1">
                    {selectedNode.battery}%
                  </p>

                  <div className="mt-2 h-2 rounded-full bg-[#0b1811]">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{
                        width: `${selectedNode.battery}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Events Detected
                  </p>

                  <p className="mt-1 text-xl font-semibold">
                    {selectedNode.events}
                  </p>
                </div>

                {selectedNode.event && (
                  <div className="rounded-lg bg-red-900/20 p-4">

                    <p className="text-xs text-gray-500">
                      Latest Event
                    </p>

                    <p className="mt-1 font-medium text-red-400">
                      {selectedNode.event}
                    </p>

                  </div>
                )}

              </div>

              {/* Actions */}
              <div className="mt-6 space-y-2">

                <button className="w-full rounded-lg bg-[#1b3326] px-4 py-2 text-sm hover:bg-[#254936]">
                  View Events
                </button>

                <button className="w-full rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-[#1b3326]">
                  View Camera
                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </main>
  );
}