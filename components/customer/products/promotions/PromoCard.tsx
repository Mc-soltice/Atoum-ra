// components/prodcuts/ProductCard.tsx
"use client";
import { useCart } from "@/contexte/panier/CartContext";

import { ProductPromo } from "@/types/product";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: ProductPromo;
  onCartClick?: () => void;
}

export default function PromoCard({ product, onCartClick }: Props) {
  const isAvailable = product.stock > 0;
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const { addToCart } = useCart();


  const handleAddToCart = () => {

    if (!isAvailable) return;

    addToCart(product, 1);

    // Ouvre le slider si la fonction est fournie
    if (onCartClick) {
      onCartClick();
    }
  };


  return (
    <div
      className="
        group
        relative
        h-[420px]
        w-[300px]
        overflow-hidden
        rounded-xl
        bg-white/80
        backdrop-blur-xl
        shadow-lg
        transition-all
        duration-500
        hover:shadow-2xl
        hover:-translate-y-1
        flex
        flex-col
      "
    >
      {/* ✅ IMAGE CLIQUABLE */}
      <Link
        href={`/produits/${product.id}`}
        aria-label={`Voir les détails de ${product.name}`}
        className="
    relative
    h-[60%]
    w-full
    overflow-hidden
    cursor-pointer
    block
  "
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="
      object-cover
      transition-transform
      duration-700
      group-hover:scale-110
      rounded-xl
      p-2
    "
          priority
        />

        {/* Badge promotion */}
        {hasDiscount && (
          <span
            className="
        absolute
        top-4
        left-4
        px-4
        py-1
        rounded-xl
        text-xs
        font-bold
        text-white
        bg-red-500/90
        backdrop-blur
        shadow-md
        z-10
      "
          >
            PROMO
          </span>
        )}
      </Link>


      {/* CONTENU */}
      <div className="flex flex-col flex-1 min-h-0 pb-5 px-5">
        {/* Texte à gauche */}
        <div className="flex-1">
          <h2 className="text-base font-semibold tracking-wide text-gray-900">
            {product.name}
          </h2>

          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          {/* AFFICHAGE DES PRIX */}
          <div className="mt-3 space-y-1">
            {hasDiscount ? (
              <>
                {/* Prix original barré */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 line-through">
                    {product.originalPrice?.toLocaleString()} FCFA
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-red-100 text-red-600 rounded">
                    Économisez {((product.originalPrice! - product.price) / product.originalPrice! * 100).toFixed(0)}%
                  </span>
                </div>
                {/* Prix promo en gros et rouge */}
                <div className="text-xl font-bold text-red-600">
                  {product.price.toLocaleString()} FCFA
                </div>
              </>
            ) : (
              /* Prix normal */
              <div className="text-lg font-bold text-gray-900">
                {product.price.toLocaleString()} FCFA
              </div>
            )}
          </div>
        </div>

        {/* Bouton orange à droite */}
        <div className="flex justify-end mt-3">
          <button
            onClick={handleAddToCart}
            disabled={!isAvailable}
            aria-disabled={!isAvailable}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-all
              flex items-center justify-center gap-2
              shadow-md hover:shadow-lg
              w-full
              ${isAvailable
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600"
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