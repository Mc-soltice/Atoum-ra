/**
 * Layout Admin
 * - Sidebar persistante
 * - Header global
 * - Zone de contenu dynamique
 */

import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { UserProvider } from "@/contexte/UserContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <section className="min-h-screen flex bg-white">
        {/* Navigation latérale */}
        <Sidebar />

        {/* Zone centrale */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />

          {/* Contenu principal */}
          <main
            className="flex-1 p-6 overflow-y-auto"
            role="main"
            aria-label="Contenu principal de l'administration"
          >
            {children}
          </main>
        </div>
      </section>
    </UserProvider>
  );
}
