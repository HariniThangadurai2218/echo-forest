export default function Home() {
  return (
    <main className="min-h-screen bg-[#08120d] p-8 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Forest Monitoring</h1>

        <p className="mt-1 text-gray-400">
          Real-time acoustic surveillance dashboard
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-xl bg-[#122219] p-6">
          <p className="text-gray-400">Active Nodes</p>
          <h2 className="mt-2 text-3xl font-bold">24</h2>
        </div>

        <div className="rounded-xl bg-[#122219] p-6">
          <p className="text-gray-400">Today's Events</p>
          <h2 className="mt-2 text-3xl font-bold">18</h2>
        </div>

        <div className="rounded-xl bg-[#122219] p-6">
          <p className="text-gray-400">Active Alerts</p>
          <h2 className="mt-2 text-3xl font-bold text-red-400">
            3
          </h2>
        </div>
      </div>

      {/* Recent Alerts */}
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">
          Recent Alerts
        </h2>

        <div className="rounded-xl bg-[#122219] p-6">
          <div className="flex items-center justify-between border-b border-gray-700 py-4">
            <div>
              <p className="font-medium text-red-400">
                🚨 Possible Gunshot
              </p>
              <p className="text-sm text-gray-400">
                Zone B3 • 14:32
              </p>
            </div>

            <span className="text-sm text-gray-300">
              94% confidence
            </span>
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium text-orange-400">
                ⚠️ Chainsaw Detected
              </p>
              <p className="text-sm text-gray-400">
                Zone A2 • 13:17
              </p>
            </div>

            <span className="text-sm text-gray-300">
              91% confidence
            </span>
          </div>
        </div>
      </section>

      {/* Map + Camera */}
      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-[#122219] p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Forest Map
          </h2>

          <div className="flex h-64 items-center justify-center rounded-lg bg-[#0b1811]">
            <p className="text-gray-500">
              🗺️ Map will appear here
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-[#122219] p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Camera Verification
          </h2>

          <div className="flex h-64 items-center justify-center rounded-lg bg-[#0b1811]">
            <p className="text-gray-500">
              📹 Camera feed will appear here
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}