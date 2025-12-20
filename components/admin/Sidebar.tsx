import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r">
      <div className="p-4 font-bold text-lg">
        Atoum-ra Admin
      </div>

      <nav className="flex flex-col gap-2 p-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/products">Produits</Link>
        <Link href="/dashboard/promotions">Promotions</Link>
        <Link href="/dashboard/orders">Commandes</Link>
      </nav>
    </aside>
  );
}
