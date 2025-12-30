"use client";

import { useCart } from "@/contexte/panier/CartContext";
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

  // ✅ Connexion au panier
  const { addToCart } = useCart();

  // ✅ Action unique du bouton
  const handleAddToCart = () => {
    if (!isAvailable) return;

    addToCart(product, 1); // 👉 ajout réel au panier
    openModal();           // 👉 ouverture du modal (inchangé)
  };

  return (
    <div
      className="
        group relative overflow-hidden rounded-lg
        bg-white shadow-sm border border-gray-100
        transition-shadow duration-300
        hover:shadow-md
        flex flex-col p-3
      "
    >
      {/* ================= IMAGE + NAVIGATION ================= */}
      <Link
        href={`/produits/${product.id}`}
        aria-label={`Voir les détails du produit ${product.name}`}
        className="relative aspect-square w-full overflow-hidden rounded-md mb-2"
      >
        <Image
          src={product.image}
          alt={`Image du produit naturel ${product.name}`}
          fill
          className="
            object-cover transition-opacity duration-300
            group-hover:opacity-90
          "
        />

        {/* Badge disponibilité */}
        {isAvailable && (
          <span
            className="
              absolute top-2 left-2
              px-2 py-1 rounded
              text-xs font-semibold text-white
              bg-emerald-500
            "
          >
            Disponible
          </span>
        )}
      </Link>

      {/* ================= CONTENU TEXTE ================= */}
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex-1">
          {/* Titre SEO */}
          <h2 className="text-xs font-medium text-gray-900 line-clamp-2 mb-1">
            {product.name}
          </h2>

          {/* Prix */}
          <div className="text-xs text-gray-500 mt-1">
            {product.price.toLocaleString()} FCFA
          </div>
        </div>

        {/* ================= ACTION ================= */}
        <div className="mt-3">
          <button
            onClick={handleAddToCart}
            disabled={!isAvailable}
            aria-disabled={!isAvailable}
            className={`
              w-full px-3 py-1.5 rounded-md text-3xs font-medium
              transition-colors flex items-center justify-center gap-1
              ${isAvailable
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            <ShoppingBag />
            <span>Ajouter</span>
          </button>
        </div>
      </div>
    </div>
  );
}