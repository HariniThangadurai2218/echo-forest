import type { Metadata } from "next";
import Sidebar from "../components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Echo Forest",
  description: "Forest Acoustic Monitoring System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#08120d] text-white">
        <div className="flex min-h-screen">
          <Sidebar />

          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}