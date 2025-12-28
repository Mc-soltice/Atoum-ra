"use client";
import { Product } from "@/types/product";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Heart, Minus, Plus,
  Share2,
  Shield,
  ShoppingCart,
  Truck,
  X
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  product: Product;
  modalId: string;
  onAddToCart?: (product: Product) => void;
}

export default function ProductDetailModal({
  product,
  modalId,
  onAddToCart,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showDelivery, setShowDelivery] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryOption, setDeliveryOption] = useState<"pickup" | "delivery">("pickup");

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({ ...product, quantity });
      const btn = document.querySelector(`#${modalId} [data-add-to-cart]`) as HTMLElement;
      if (btn) {
        btn.classList.add('btn-success');
        setTimeout(() => btn.classList.remove('btn-success'), 500);
      }
    }
  };

  const closeModal = () => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal?.close();
    setQuantity(1);
    setShowDelivery(false);
    setDeliveryAddress("");
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleDeliveryOption = () => {
    setShowDelivery(true);
  };



  const totalPrice = product.price * quantity;
  const discountPercentage = product.originalPrice
    ? ((product.originalPrice - product.price) / product.originalPrice * 100).toFixed(0)
    : 0;

  return (
    <dialog
      id={modalId}
      className="modal modal-bottom sm:modal-middle modal-backdor:blur"
    >
      <div className="modal-box max-w-6xl p-0 rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white max-h-[60vh]">
        {/* Header mobile seulement */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              {product.category}
            </div>
          </div>
          <button
            onClick={closeModal}
            className="btn btn-circle btn-sm btn-ghost"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 h-full max-h-[calc(60vh-4rem)] md:max-h-[60vh] overflow-hidden">

          {/* Colonne 1: Photo recouvre toute la surface */}
          <div className="relative h-48 md:h-full min-h-[12rem]">
            {/* Image de fond */}
            <div className="absolute inset-0">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
              {/* Overlay pour meilleure lisibilité */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent md:bg-gradient-to-r md:from-black/10 md:via-transparent md:to-transparent" />
            </div>

            {/* Badges sur l'image */}
            <div className="absolute top-3 left-3 md:top-4 md:left-4 flex flex-col gap-2 z-10">
              {product.isNew && (
                <span className="badge badge-primary border-0 text-white font-semibold px-2 py-1 md:px-3 md:py-1.5 text-xs shadow-lg bg-gradient-to-r from-blue-500 to-blue-600">
                  ✨ Nouveau
                </span>
              )}
              {product.discount && (
                <span className="badge badge-error border-0 text-white font-semibold px-2 py-1 md:px-3 md:py-1.5 text-xs shadow-lg bg-gradient-to-r from-red-500 to-red-600">
                  🔥 -{product.discount}%
                </span>
              )}
              {product.stock <= 10 && product.stock > 0 && (
                <span className="badge badge-warning border-0 text-white font-semibold px-2 py-1 md:px-3 md:py-1.5 text-xs shadow-lg bg-gradient-to-r from-amber-500 to-amber-600">
                  ⚡ {product.stock} restants
                </span>
              )}
            </div>

            {/* Boutons sur l'image */}
            <div className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center gap-2 z-10">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="btn btn-circle btn-sm bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white hover:scale-110 transition-all"
                aria-label={isWishlisted ? "Retirer des favoris" : "Ajouter aux favoris"}
              >
                <Heart
                  className={`w-4 h-4 md:w-5 md:h-5 ${isWishlisted ? "fill-pink-500 text-pink-500" : "text-gray-700"}`}
                />
              </button>

              {/* Bouton fermer Desktop sur l'image */}
              <button
                onClick={closeModal}
                className="hidden md:btn md:btn-circle md:btn-sm bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white hover:scale-110 transition-all"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Informations stock sur l'image */}
            <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 z-10">
              <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 shadow-lg text-white">
                <div className="flex items-center justify-between text-xs md:text-sm mb-1.5">
                  <span className="font-medium">Disponibilité</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-emerald-400' : 'bg-gray-400'}`}></div>
                    <span className={`font-medium ${product.stock > 0 ? 'text-emerald-300' : 'text-gray-300'}`}>
                      {product.stock > 0 ? 'En stock' : 'Rupture'}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Colonne 2: Informations produit */}
          <div className="p-4 md:p-5 relative overflow-y-auto">
            <div className="hidden md:block absolute top-6 right-0 h-[90%] w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />

            {/* Mobile Header */}
            <div className="md:hidden mb-3">
              <h1 className="text-lg font-bold text-gray-900">{product.name}</h1>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium mb-3">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                {product.category}
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h1>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-r from-gray-50 to-white p-3 md:p-4 rounded-xl mb-4 border border-gray-100 shadow-sm">
              <div className="flex items-baseline gap-2 md:gap-3 flex-wrap">
                <span className="text-xl md:text-2xl font-bold text-gray-900">
                  {product.price.toLocaleString()} FCFA
                </span>
                {product.originalPrice && (
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400 line-through">
                      {product.originalPrice.toLocaleString()} FCFA
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded mt-0.5">
                      Économisez {discountPercentage}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quick Features */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-1.5 bg-blue-50 rounded-md">
                  <Truck className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-[10px] md:text-xs text-gray-500">Livraison rapide</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-900">24-48h</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-1.5 bg-emerald-50 rounded-md">
                  <Shield className="w-3 h-3 md:w-4 md:h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-[10px] md:text-xs text-gray-500">Garantie</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-900">30 jours</div>
                </div>
              </div>
            </div>

            {/* Section Ingrédients seulement (supprimé le dépliant Bienfaits) */}
            <div className="space-y-2 mb-4">
              {product.ingredients?.length > 0 && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('ingredients')}
                    className="w-full px-3 py-2 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">Ingrédients</span>
                      <span className="text-xs text-gray-500">({product.ingredients.length})</span>
                    </div>
                    {expandedSection === 'ingredients' ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  {expandedSection === 'ingredients' && (
                    <div className="px-3 py-2 border-t border-gray-200 bg-white">
                      <ul className="space-y-1">
                        {product.ingredients.map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-xs text-gray-600">
                            <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Section Bénéfits seulement */}
            <div className="space-y-2 mb-4">
              {product.benefits?.length > 0 && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('benefits')}
                    className="w-full px-3 py-2 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">Ingrédients</span>
                      <span className="text-xs text-gray-500">({product.benefits?.length})</span>
                    </div>
                    {expandedSection === 'benefits' ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  {expandedSection === 'benefits' && (
                    <div className="px-3 py-2 border-t border-gray-200 bg-white">
                      <ul className="space-y-1">
                        {product.benefits.map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-xs text-gray-600">
                            <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Colonne 3: Commande et actions */}
          <div className="p-4 md:p-5 relative bg-gray-50/50 overflow-y-auto">
            <div className="hidden md:block absolute top-6 left-0 h-[90%] w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />


            {/* Quantity & Total */}
            <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">Quantité</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Sélectionnez la quantité</p>
                </div>
                <div className="flex items-center gap-1 bg-gray-50 rounded-lg border border-gray-200 p-0.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="btn btn-sm btn-ghost btn-square min-h-0 h-8 w-8 hover:bg-gray-200"
                    aria-label="Réduire"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-gray-900 text-base">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="btn btn-sm btn-ghost btn-square min-h-0 h-8 w-8 hover:bg-gray-200"
                    aria-label="Augmenter"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div>
                  <div className="text-sm font-medium text-gray-700">Total</div>
                  <div className="text-xs text-gray-500">{quantity} × {product.price.toLocaleString()} FCFA</div>
                </div>
                <div className="text-right">
                  <div className="text-xl md:text-2xl font-bold text-gray-900">
                    {totalPrice.toLocaleString()} FCFA
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                data-add-to-cart
                disabled={product.stock <= 0}
                className="btn btn-primary w-full rounded-lg gap-2 font-semibold shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-indigo-500 to-purple-500 border-0 text-white disabled:opacity-50 disabled:cursor-not-allowed h-12 text-sm md:text-base"
              >
                <ShoppingCart className="w-4.5 h-4.5 md:w-5 md:h-5" />
                {product.stock > 0 ? 'Ajouter au panier' : 'Rupture de stock'}
              </button>


              <button className="btn btn-outline w-full flex items-center justify-center gap-2 rounded-lg h-10 text-sm">
                <Share2 className="w-4 h-4" />
                Partager
              </button>
            </div>

            {/* Assurance Features */}
            <div className="mt-5 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Garanties incluses</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center p-2 bg-white border border-gray-100 rounded-lg shadow-sm">
                  <div className="p-2 bg-blue-50 rounded-lg mb-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-xs font-medium text-gray-900 text-center">Paiement sécurisé</div>
                  <div className="text-[10px] text-gray-500 text-center mt-0.5">100% safe</div>
                </div>
                <div className="flex flex-col items-center p-2 bg-white border border-gray-100 rounded-lg shadow-sm">
                  <div className="p-2 bg-emerald-50 rounded-lg mb-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-xs font-medium text-gray-900 text-center">30 jours retour</div>
                  <div className="text-[10px] text-gray-500 text-center mt-0.5">Satisfait ou remboursé</div>
                </div>
                <div className="flex flex-col items-center p-2 bg-white border border-gray-100 rounded-lg shadow-sm">
                  <div className="p-2 bg-amber-50 rounded-lg mb-2">
                    <Check className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-xs font-medium text-gray-900 text-center">Original garanti</div>
                  <div className="text-[10px] text-gray-500 text-center mt-0.5">Produits certifiés</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Bottom Actions */}
        {!showDelivery && (
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-base font-bold text-gray-900">{totalPrice.toLocaleString()} FCFA</div>
                <div className="text-xs text-gray-500">{quantity} × {product.price.toLocaleString()} FCFA</div>
              </div>
              <button
                onClick={handleAddToCart}
                data-add-to-cart
                disabled={product.stock <= 0}
                className="btn btn-primary rounded-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 border-0 text-white disabled:opacity-50 flex-1 h-11 text-sm"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.stock > 0 ? 'Ajouter au panier' : 'Rupture'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeModal}></button>
      </form>
    </dialog>
  );
}