"use client";

import { useCart } from "@/contexte/panier/CartContext";
import { Product } from "@/types/product";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
  onCartClick?: () => void;
}

export default function ProductCard({ product, onCartClick }: Props) {
  const isAvailable = product.stock > 0;
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
      className="group relative overflow-hidden rounded-lg bg-white shadow-sm border border-gray-100
                   transition-shadow duration-300 hover:shadow-md flex flex-col p-3"
    >
      {/* Image */}
      <Link
        href={`/produits/${product.id}`}
        aria-label={`Voir les détails de ${product.name}`}
        className="relative aspect-square w-full overflow-hidden rounded-md mb-2"
      >
        <Image
          src={product.image}
          alt={`Image du produit ${product.name}`}
          fill
          className="object-cover transition-opacity duration-300 group-hover:opacity-90"
        />

        {/* Badge disponibilité */}
        {isAvailable && (
          <span
            className="absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold 
                         text-white bg-emerald-500"
          >
            Disponible
          </span>
        )}
      </Link>

      {/* Contenu */}
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex-1">
          <h2 className="text-xs font-medium text-gray-900 line-clamp-2 mb-1">
            {product.name}
          </h2>

          <div className="text-xs font-bold text-amber-600">
            {product.price.toLocaleString()} FCFA
          </div>
        </div>

        {/* Bouton ajouter */}
        <div className="mt-3">
          <button
            onClick={handleAddToCart}
            disabled={!isAvailable}
            aria-disabled={!isAvailable}
            className={`
              w-full px-3 py-1.5 rounded-md text-xs font-medium
              transition-colors flex items-center justify-center gap-1
              ${
                isAvailable
                  ? "bg-linear-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            <ShoppingBag className="h-3 w-3" />
            <span>Ajouter</span>
          </button>
        </div>
      </div>
    </div>
  );
}
