"use client";

/**
 * Sidebar Admin
 * - Navigation principale
 * - Chaque lien correspond à une page admin
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FolderTree,
  Package,
  LogOut,
  Settings,
} from "lucide-react";

const links = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    label: "Utilisateurs",
    href: "/admin/users",
    icon: <Users className="w-4 h-4" />,
  },
  {
    label: "Catégories",
    href: "/admin/categories",
    icon: <FolderTree className="w-4 h-4" />,
  },
  {
    label: "Produits",
    href: "/admin/products",
    icon: <Package className="w-4 h-4" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-64 border-r border-black/10 p-4 flex flex-col h-screen"
      aria-label="Navigation administration"
    >
      {/* Logo / Titre */}
      <header className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">Admin Panel</h1>
        <p className="text-sm text-black/60">Produits naturels</p>
      </header>

      {/* Navigation principale */}
      <nav className="flex flex-col gap-1 flex-1">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                transition-all duration-200
                ${
                  isActive
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                }
              `}
              aria-current={isActive ? "page" : undefined}
            >
              <span className={`${isActive ? "text-white" : "text-gray-500"}`}>
                {link.icon}
              </span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Section inférieure */}
      <div className="pt-6 border-t border-gray-200">
        <Link
          href="/admin/settings"
          className={`
            flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
            transition-all duration-200
            ${
              pathname === "/admin/settings"
                ? "bg-black text-white"
                : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
            }
          `}
        >
          <Settings className="w-4 h-4" />
          Paramètres
        </Link>

        <button
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 mt-2"
          onClick={() => {
            /* Logique de déconnexion */
          }}
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
