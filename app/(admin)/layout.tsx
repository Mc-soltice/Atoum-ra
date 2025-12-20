

import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Atoum-ra",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-100">
        <div className="flex">
          <Sidebar />

          <div className="flex-1">
            <Topbar />

            <main className="p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
