"use client";

export default function ProductCardSkeleton() {
  return (
    <div
      className="
      skeleton
        relative overflow-hidden rounded-lg
        bg-white shadow-sm border border-gray-100
        flex flex-col p-3
        animate-pulse
      "
    >
      {/* ================= IMAGE ================= */}
      <div className="relative aspect-square w-full rounded-md bg-gray-200 mb-2" />

      {/* ================= CONTENU TEXTE ================= */}
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex-1 space-y-2">
          {/* Titre */}
          <div className="h-3 bg-gray-200 rounded w-5/6" />
          <div className="h-3 bg-gray-200 rounded w-4/6" />

          {/* Prix */}
          <div className="h-3 bg-gray-200 rounded w-2/6 mt-2" />
        </div>

        {/* ================= BOUTON ================= */}
        <div className="mt-3">
          <div className="w-full h-8 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
