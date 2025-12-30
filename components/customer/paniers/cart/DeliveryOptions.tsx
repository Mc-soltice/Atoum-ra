"use client";

import { DeliveryOption, deliveryOptions, useCart } from "@/contexte/panier/CartContext";
import { Check } from "lucide-react";

/**
 * Composant pour sélectionner les options de livraison
 * Affiche les différentes options avec leurs prix et délais
 */
export default function DeliveryOptions() {
  // ================= CONTEXTE PANIER =================
  const { deliveryOption, setDeliveryOption } = useCart();

  /**
   * Gère la sélection d'une option de livraison
   * @param option - Option de livraison choisie
   */
  const handleSelectOption = (option: DeliveryOption) => {
    setDeliveryOption(option);
  };

  return (
    <div className="space-y-4">
      {/* ================= TITRE DE SECTION ================= */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Options de livraison
        </h3>
        <p className="text-sm text-gray-600">
          Choisissez le mode de livraison qui vous convient
        </p>
      </div>

      {/* ================= LISTE DES OPTIONS ================= */}
      <div className="space-y-3">
        {deliveryOptions.map((option) => {
          const isSelected = deliveryOption?.id === option.id;

          return (
            <div
              key={option.id}
              onClick={() => handleSelectOption(option)}
              className={`
                relative cursor-pointer
                p-4 rounded-xl border-2
                transition-all duration-300
                ${isSelected
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
                }
                hover:shadow-md
              `}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSelectOption(option);
                }
              }}
            >
              {/* Indicateur de sélection */}
              {isSelected && (
                <div
                  className="
                    absolute -top-2 -right-2
                    w-6 h-6
                    bg-gradient-to-r from-orange-500 to-amber-500
                    text-white
                    rounded-full flex items-center justify-center
                    shadow-md
                  "
                >
                  <Check className="w-4 h-4" />
                </div>
              )}

              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {/* Icône */}
                  <div className="text-2xl">{option.icon}</div>

                  {/* Informations */}
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {option.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {option.description}
                    </p>
                    <div className="flex items-center mt-2 text-sm text-gray-700">
                      <span className="font-medium">
                        Délai estimé : {option.estimatedDays} jour
                        {option.estimatedDays > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Prix */}
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    {option.price > 0
                      ? `${option.price.toLocaleString()} FCFA`
                      : "Gratuit"}
                  </div>
                  {option.price === 0 && (
                    <div className="text-xs text-emerald-600 font-medium mt-1">
                      Économisez sur la livraison
                    </div>
                  )}
                </div>
              </div>

              {/* Badge recommandé pour le retrait en magasin */}
              {option.id === "pickup" && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    ♻️ Écologique
                  </span>
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    💰 Économique
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ================= INFORMATIONS COMPLÉMENTAIRES ================= */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-600">
          <strong>💡 Conseils :</strong> Le retrait en magasin est gratuit et
          écologique. Pour les produits frais, privilégiez la livraison express.
        </p>
      </div>
    </div>
  );
}