"use client";

import { useEffect } from "react";
import { useAuthContext } from "@/contexte/AuthContext";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Package,
  Heart,
  Edit,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import EditProfileModal from "@/components/customer/users/EditProfileModal";

export default function ProfilPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const [openEdit, setOpenEdit] = useState(false);


  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-2 border-neutral-900 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  const roleLabel = user.roles?.includes("admin")
    ? "Administrateur"
    : "Client";

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* HEADER */}
      <header className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-500">
              <User size={36} />
            </div>

            <div>
              <h1 className="text-2xl font-semibold">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-neutral-500 flex items-center gap-2 mt-1">
                <Mail size={14} />
                {user.email}
              </p>

              <span className="inline-block mt-2 text-xs uppercase tracking-wide border border-neutral-300 px-3 py-1 rounded-full text-neutral-600">
                {roleLabel}
              </span>
            </div>
          </div>

          <button onClick={() => setOpenEdit(true)} className="flex items-center gap-2 border border-neutral-300 px-5 py-2 rounded-lg bg-linear-to-r from-black to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white transition">
            
            <Edit size={16} />
            Modifier
          </button>
        </div>
      </header>

      {/* CONTENT */}
      {/* MODAL */}
      <EditProfileModal
  isOpen={openEdit}
  onClose={() => setOpenEdit(false)}
  user={user}
  onSubmit={async (data) => {
    await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
  }}
/>

      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* INFOS */}
        <section className="lg:col-span-2 bg-neutral-50 border border-neutral-200 rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-neutral-800">
            <User size={18} />
            Informations personnelles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-neutral-500">Nom</p>
              <p className="mt-1 text-neutral-800">
                {user.first_name} {user.last_name}
              </p>
            </div>

            <div>
              <p className="text-neutral-500">Email</p>
              <p className="mt-1 flex items-center gap-2 text-neutral-800">
                <Mail size={14} className="text-neutral-400" />
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-neutral-500">Téléphone</p>
              <p className="mt-1 flex items-center gap-2 text-neutral-800">
                <Phone size={14} className="text-neutral-400" />
                {user.phone ?? "Non renseigné"}
              </p>
            </div>

            <div>
              <p className="text-neutral-500">Statut</p>
              <p className="mt-1 flex items-center gap-2 text-neutral-800">
                <Shield size={14} className="text-neutral-400" />
                Compte actif
              </p>
            </div>
          </div>

          <div>
            <p className="text-neutral-500 text-sm">Adresse</p>
            <p className="mt-1 flex items-start gap-2 text-sm text-neutral-800">
              <MapPin size={14} className="text-neutral-400 mt-1" />
              Aucune adresse enregistrée
            </p>
          </div>
        </section>

        {/* STATS */}
        <aside className="space-y-6">
          <StatCard
            icon={<Package size={22} />}
            label="Commandes"
            value="5"
            href="/profil/commandes"
          />
          <StatCard
            icon={<Heart size={22} />}
            label="Favoris"
            value="12"
            href="/profil/favoris"
          />
          <StatCard
            icon={<Shield size={22} />}
            label="Rôle"
            value={roleLabel}
          />
        </aside>
      </main>
    </div>
  );
}

/* ---------------------------------- */
/* Components                         */
/* ---------------------------------- */

function StatCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 hover:bg-neutral-100 transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-neutral-500 text-sm">{label}</p>
          <p className="text-2xl font-semibold text-neutral-900 mt-1">
            {value}
          </p>
        </div>
        <div className="text-neutral-400">{icon}</div>
      </div>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
