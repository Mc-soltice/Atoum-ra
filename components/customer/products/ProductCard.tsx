"use client";

import { Product } from "@/types/product";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * Props du composant ProductCard
 * @property product - Données du produit
 * @property modalId - ID du modal DaisyUI pour l'ajout au panier
 */
interface Props {
  product: Product;
  modalId: string;
}

export default function ProductCard({ product, modalId }: Props) {
  /**
   * Vérifie si le produit est disponible en stock
   * Utilisé pour :
   * - Afficher le badge "Disponible"
   * - Activer / désactiver le bouton d'ajout
   */
  const isAvailable = product.stock > 0;

  /**
   * Ouvre le modal DaisyUI via son ID
   * Utilisé uniquement pour le bouton "Ajouter"
   */
  const openModal = () => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal?.showModal();
  };

  return (
    <div
      className="
        group relative h-[390px] w-[280px]
        overflow-hidden rounded-xl
        bg-white/80 backdrop-blur-xl
        shadow-lg transition-all duration-500
        hover:shadow-2xl hover:-translate-y-1
        flex flex-col
      "
    >
      {/* ================= IMAGE + NAVIGATION ================= */}
      {/* 
        Link Next.js :
        - SEO friendly
        - Préchargement automatique
        - Accessibilité améliorée
      */}
      <Link
        href={`/produits/${product.id}`}
        aria-label={`Voir les détails du produit ${product.name}`}
        className="relative h-[60%] w-full overflow-hidden rounded-t-xl"
      >
        <Image
          src={product.image}
          alt={`Image du produit naturel ${product.name}`}
          fill
          className="
            object-cover transition-transform duration-700
            group-hover:scale-110
          "
          priority
        />

        {/* Badge disponibilité */}
        {isAvailable && (
          <span
            className="
              absolute top-4 left-4
              px-4 py-1 rounded-full
              text-xs font-semibold text-white
              bg-emerald-500/90 backdrop-blur
              shadow-md
            "
          >
            Disponible
          </span>
        )}
      </Link>

      {/* ================= CONTENU TEXTE ================= */}
      <div className="flex flex-col flex-1 min-h-0 p-5">
        <div className="flex-1">
          {/* Titre SEO (h2 car liste de produits) */}
          <h2 className="text-base font-semibold tracking-wide text-gray-900">
            {product.name}
          </h2>

          {/* Description courte */}
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          {/* Prix */}
          <div className="mt-2 text-lg font-bold text-red-600">
            {product.price.toLocaleString()} FCFA
          </div>
        </div>

        {/* ================= ACTION ================= */}
        <div className="flex justify-end mt-2 ">
          <button
            onClick={openModal}
            disabled={!isAvailable}
            aria-disabled={!isAvailable}
            className={`
              w-full px-4 py-2 rounded-xl text-sm font-medium
              transition-all flex items-center justify-center gap-2
              shadow-md hover:shadow-lg
              ${isAvailable
                ? "bg-gradient-to-r from-[#BBCB64] to-[#A4BB64] text-white hover:from-[#A0B84F] hover:to-[#8FAE3F]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Ajouter</span>
          </button>
        </div>
      </div>
    </div>
  );
}
