import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col bg-[#0d1b14] px-5 py-6 text-white">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">🌲 Echo Forest</h1>
        <p className="mt-1 text-sm text-gray-400">
          Forest Monitoring
        </p>
      </div>

      <nav className="flex flex-col gap-2">
        <Link
          href="/"
          className="rounded-lg bg-[#1b3326] px-4 py-3 text-sm font-medium"
        >
          🏠 Dashboard
        </Link>

        <Link
          href="/alerts"
          className="rounded-lg px-4 py-3 text-sm text-gray-300 hover:bg-[#1b3326]"
        >
          🚨 Alerts
        </Link>

        <Link
          href="/map"
          className="rounded-lg px-4 py-3 text-sm text-gray-300 hover:bg-[#1b3326]"
        >
          🗺️ Map
        </Link>

        <Link
          href="/cameras"
          className="rounded-lg px-4 py-3 text-sm text-gray-300 hover:bg-[#1b3326]"
        >
          📹 Cameras
        </Link>

        <Link
          href="/events"
          className="rounded-lg px-4 py-3 text-sm text-gray-300 hover:bg-[#1b3326]"
        >
          📋 Events
        </Link>

        <Link
          href="/settings"
          className="rounded-lg px-4 py-3 text-sm text-gray-300 hover:bg-[#1b3326]"
        >
          ⚙️ Settings
        </Link>
      </nav>

      <div className="mt-auto rounded-lg bg-[#14271d] p-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          <span className="text-sm text-gray-300">System Online</span>
        </div>
      </div>
    </aside>
  );
}