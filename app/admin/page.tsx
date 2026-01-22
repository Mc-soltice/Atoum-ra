/**
 * Page Dashboard Admin
 * Route: /admin
 * Rôle: point d'entrée de l'administration
 */

export const metadata = {
  title: "Dashboard | Admin",
  description: "Tableau de bord de l'administration",
};

export default function AdminDashboardPage() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      <p className="text-black/70">
        Bienvenue dans l’interface d’administration.
      </p>
    </section>
  );
}
