"use client";

import { useState } from "react";

const events = [
  {
    id: 1,
    time: "14:32:08",
    date: "19 Sep 2026",
    event: "Possible Gunshot",
    location: "Zone B3",
    confidence: 94,
    source: "Acoustic Sensor 07",
    status: "Verified",
  },
  {
    id: 2,
    time: "13:17:42",
    date: "19 Sep 2026",
    event: "Chainsaw Detected",
    location: "Zone A2",
    confidence: 91,
    source: "Acoustic Sensor 03",
    status: "Verified",
  },
  {
    id: 3,
    time: "11:45:19",
    date: "19 Sep 2026",
    event: "Human Activity",
    location: "Zone C1",
    confidence: 87,
    source: "Acoustic Sensor 11",
    status: "Pending",
  },
  {
    id: 4,
    time: "10:21:33",
    date: "19 Sep 2026",
    event: "Animal Movement",
    location: "Zone D2",
    confidence: 82,
    source: "Acoustic Sensor 05",
    status: "Verified",
  },
  {
    id: 5,
    time: "09:14:27",
    date: "19 Sep 2026",
    event: "Vehicle Detected",
    location: "Zone A1",
    confidence: 76,
    source: "Acoustic Sensor 01",
    status: "False Alarm",
  },
  {
    id: 6,
    time: "22:48:51",
    date: "18 Sep 2026",
    event: "Chainsaw Detected",
    location: "Zone C2",
    confidence: 89,
    source: "Acoustic Sensor 09",
    status: "Verified",
  },
];

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(
    null
  );

  return (
    <main className="min-h-screen bg-[#08120d] p-8 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Event History</h1>
        <p className="mt-1 text-gray-400">
          Historical acoustic events detected across the forest
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="rounded-xl bg-[#122219] p-5">
          <p className="text-sm text-gray-400">Total Events</p>
          <h2 className="mt-2 text-3xl font-bold">{events.length}</h2>
        </div>

        <div className="rounded-xl bg-[#122219] p-5">
          <p className="text-sm text-gray-400">Verified</p>
          <h2 className="mt-2 text-3xl font-bold text-green-400">
            {events.filter((e) => e.status === "Verified").length}
          </h2>
        </div>

        <div className="rounded-xl bg-[#122219] p-5">
          <p className="text-sm text-gray-400">Pending</p>
          <h2 className="mt-2 text-3xl font-bold text-orange-400">
            {events.filter((e) => e.status === "Pending").length}
          </h2>
        </div>

        <div className="rounded-xl bg-[#122219] p-5">
          <p className="text-sm text-gray-400">False Alarms</p>
          <h2 className="mt-2 text-3xl font-bold text-red-400">
            {events.filter((e) => e.status === "False Alarm").length}
          </h2>
        </div>
      </div>

      {/* Events Table */}
      <section className="rounded-xl bg-[#122219] p-6">
        <div className="mb-5">
          <h2 className="text-xl font-semibold">Detected Events</h2>
          <p className="mt-1 text-sm text-gray-500">
            Recent acoustic detections from monitoring nodes
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-gray-700 text-sm text-gray-400">
                <th className="px-4 py-4">Time</th>
                <th className="px-4 py-4">Event</th>
                <th className="px-4 py-4">Location</th>
                <th className="px-4 py-4">Confidence</th>
                <th className="px-4 py-4">Source</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4"></th>
              </tr>
            </thead>

            <tbody>
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-gray-800 transition hover:bg-[#172b1f]"
                >
                  <td className="px-4 py-4">
                    <p className="font-medium">{event.time}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </td>

                  <td className="px-4 py-4">
                    <span className="font-medium">{event.event}</span>
                  </td>

                  <td className="px-4 py-4 text-gray-300">
                    {event.location}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={
                        event.confidence >= 90
                          ? "font-semibold text-green-400"
                          : event.confidence >= 80
                          ? "font-semibold text-yellow-400"
                          : "font-semibold text-orange-400"
                      }
                    >
                      {event.confidence}%
                    </span>
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-400">
                    {event.source}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        event.status === "Verified"
                          ? "bg-green-900/40 text-green-400"
                          : event.status === "Pending"
                          ? "bg-orange-900/40 text-orange-400"
                          : "bg-red-900/40 text-red-400"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="rounded-lg bg-[#1b3326] px-3 py-2 text-sm text-gray-200 transition hover:bg-green-800"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#122219] p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Event Details</h2>
                <p className="text-sm text-gray-500">
                  Detection information
                </p>
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="text-2xl text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg bg-[#0b1811] p-4">
                <p className="text-sm text-gray-500">Detected Event</p>
                <p className="mt-1 text-lg font-semibold">
                  {selectedEvent.event}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-[#0b1811] p-4">
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="mt-1 font-medium">
                    {selectedEvent.location}
                  </p>
                </div>

                <div className="rounded-lg bg-[#0b1811] p-4">
                  <p className="text-sm text-gray-500">Confidence</p>
                  <p className="mt-1 font-medium text-green-400">
                    {selectedEvent.confidence}%
                  </p>
                </div>

                <div className="rounded-lg bg-[#0b1811] p-4">
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="mt-1 font-medium">{selectedEvent.time}</p>
                </div>

                <div className="rounded-lg bg-[#0b1811] p-4">
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="mt-1 font-medium">{selectedEvent.status}</p>
                </div>
              </div>

              <div className="rounded-lg bg-[#0b1811] p-4">
                <p className="text-sm text-gray-500">Detection Source</p>
                <p className="mt-1 font-medium">{selectedEvent.source}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-6 w-full rounded-lg bg-[#1b3326] py-3 font-medium transition hover:bg-green-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}