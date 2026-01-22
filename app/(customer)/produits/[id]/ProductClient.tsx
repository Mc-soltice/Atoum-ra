"use client";

import { useCart } from "@/contexte/panier/CartContext";
import { Product } from "@/types/product";
import { Heart, Share2, Shield, ShoppingCart, Truck } from "lucide-react";
import { useState } from "react";

interface ProductClientProps {
  product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  // Images de galerie (remplacer par tes vraies images)
  const productImages = [
    product.image,
    product.image, // image secondaire
    product.image, // autre image
  ];

  // Fonction de partage
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Découvrez ${product.name} sur Atoum-ra, nos produits naturels authentiques`,
          url: window.location.href,
        });
      } catch (error) {
        // L'utilisateur a annulé le partage
      }
    } else {
      // Fallback: copier dans le presse-papier
      navigator.clipboard.writeText(window.location.href);
      setShowShareSuccess(true);
      setTimeout(() => setShowShareSuccess(false), 3000);
    }
  };

  // Fonction ajout panier
  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <>
      {/* Galerie d'images */}
      <div className="w-full space-y-4">
        {/* Image principale */}
        <div className="aspect-square w-full bg-gradient-to-br from-emerald-50 to-amber-50 rounded-lg flex items-center justify-center border border-emerald-100 overflow-hidden">
          <div className="text-center p-4">
            <span className="text-5xl mb-3 block">🌿</span>
            <p className="text-gray-700 font-medium">Image du produit</p>
            <p className="text-sm text-gray-500 mt-1">{product.name}</p>
          </div>
        </div>

        {/* Miniatures */}
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square bg-gradient-to-br from-amber-50 to-emerald-50 rounded-lg flex items-center justify-center border transition-colors cursor-pointer ${
                selectedImage === index
                  ? "border-amber-400 ring-2 ring-amber-200"
                  : "border-amber-100 hover:border-amber-300"
              }`}
            >
              <span className="text-xl">
                {index === 0 ? "🖼️" : index === 1 ? "📸" : "🌱"}
              </span>
            </button>
          ))}
        </div>

        {/* Bouton de partage */}
        <button
          onClick={handleShare}
          className="btn btn-outline w-full relative mt-4"
          aria-label="Partager ce produit"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Partager ce produit
          {showShareSuccess && (
            <span className="absolute -top-2 -right-2 badge badge-success text-xs">
              Lien copié !
            </span>
          )}
        </button>
      </div>

      {/* Informations produit */}
      <div className="w-full space-y-6">
        {/* En-tête */}
        <header>
          <div className="mb-2">
            <span className="inline-block px-2.5 py-0.5 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
              {product.category}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>
        </header>

        {/* Prix et stock */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-2xl font-bold text-amber-700">
                {product.price.toLocaleString()} FCFA
              </span>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <span className="ml-2 text-lg text-gray-400 line-through">
                    {product.originalPrice.toLocaleString()} FCFA
                  </span>
                )}
            </div>

            <div className="text-sm">
              {product.stock > 10 ? (
                <span className="flex items-center text-emerald-600">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  En stock
                </span>
              ) : product.stock > 0 ? (
                <span className="flex items-center text-amber-600">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                  Plus que {product.stock}
                </span>
              ) : (
                <span className="flex items-center text-red-600">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Rupture
                </span>
              )}
            </div>
          </div>

          {product.originalPrice && product.originalPrice > product.price && (
            <div className="inline-block px-3 py-1 bg-linear-to-r from-orange-500 to-amber-500 text-white text-sm font-bold rounded-full mt-2">
              Économisez{" "}
              {Math.round((1 - product.price / product.originalPrice) * 100)}%
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Caractéristiques */}
        {(product.ingredients || product.benefits || product.usage) && (
          <div className="rounded-lg p-4 border border-emerald-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Détails
            </h3>

            {product.ingredients?.slice(0, 3).map((ingredient, index) => (
              <div
                key={index}
                className="flex items-center text-gray-700 mb-2 last:mb-0"
              >
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></span>
                <span className="text-sm">{ingredient}</span>
              </div>
            ))}

            {product.benefits?.[0] && (
              <div className="flex items-center text-gray-700 mt-3 pt-3 border-t border-emerald-100">
                <Heart className="w-4 h-4 mr-3 text-rose-500" />
                <span className="text-sm">Aport : {product.benefits[0]}</span>
              </div>
            )}

            {product.usage && (
              <div className="flex items-center text-gray-700 mt-3 pt-3 border-t border-emerald-100">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
                <span className="text-sm">Prise: {product.usage}</span>
              </div>
            )}
          </div>
        )}

        {/* Bouton d'action */}
        <div>
          <button
            onClick={handleAddToCart}
            className="btn rounded-lg bg-linear-to-r from-orange-500 to-amber-500 text-white w-full py-3 text-base hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-sm hover:shadow"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="inline-block mr-2 w-5 h-5" />
            {product.stock === 0 ? "Rupture" : "Ajouter au panier"}
          </button>
        </div>

        {/* Garanties */}
        <div className="border-t border-gray-300 pt-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center text-gray-600">
              <Shield className="w-4 h-4 mr-2 text-emerald-500" />
              <span>Garantie 30 jours</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Truck className="w-4 h-4 mr-2 text-blue-500" />
              <span>Livraison 48h</span>
            </div>
          </div>
        </div>

        {/* Sections détaillées */}
        <div className="pt-6 border-t border-gray-100">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Ingrédients */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Ingrédients
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index}>• {ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bienfaits */}
              {product.benefits && product.benefits.length > 0 && (
                <>
                  <div className="divider lg:divider-horizontal" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Bienfaits
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {product.benefits.map((benefit, index) => (
                        <li key={index}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {/* Mode d'utilisation */}
              {product.usage && (
                <>
                  <div className="divider lg:divider-horizontal" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Mode d'utilisation
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {product.usage}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
