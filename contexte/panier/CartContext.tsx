"use client";

import { Product, ProductPromo } from "@/types/product";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

/**
 * Type pour un article dans le panier
 * Inclut le produit et la quantité
 */
export interface CartItem {
  product: Product | ProductPromo;
  quantity: number;
}

/**
 * Type pour les options de livraison
 */
export interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: number;
  icon: string;
}

/**
 * Type pour les produits avec stock (extension de Product)
 */
interface ProductWithStock extends Product {
  stock: number;
}

/**
 * Type pour les produits promo avec stock
 */
interface ProductPromoWithStock extends ProductPromo {
  stock: number;
}

/**
 * Type guard pour vérifier si un produit a une propriété stock
 */
function hasStock(product: Product | ProductPromo): product is ProductWithStock | ProductPromoWithStock {
  return 'stock' in product && typeof product.stock === 'number';
}

/**
 * Interface du contexte du panier
 */
interface CartContextType {
  items: CartItem[];
  deliveryOption: DeliveryOption | null;
  addToCart: (product: Product | ProductPromo, quantity?: number) => void;
  removeFromCart: (productId: string, showToast?: boolean) => void;
  updateQuantity: (productId: string, quantity: number, showToast?: boolean) => void;
  clearCart: () => void;
  setDeliveryOption: (option: DeliveryOption) => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
  canAddToCart: (productId: string, quantityToAdd?: number) => boolean;
}

/**
 * Création du contexte avec des valeurs par défaut
 */
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Options de livraison disponibles
 */
export const deliveryOptions: DeliveryOption[] = [
  {
    id: "standard",
    name: "Livraison Standard",
    description: "Livraison en 5-7 jours ouvrables",
    price: 2000,
    estimatedDays: 7,
    icon: "🚚",
  },
  {
    id: "express",
    name: "Livraison Express",
    description: "Livraison en 2-3 jours ouvrables",
    price: 5000,
    estimatedDays: 3,
    icon: "⚡",
  },
  {
    id: "pickup",
    name: "Retrait en Magasin",
    description: "Retirez gratuitement en point relais",
    price: 0,
    estimatedDays: 1,
    icon: "🏪",
  },
];

/**
 * Props du fournisseur de contexte
 */
interface CartProviderProps {
  children: ReactNode;
}

/**
 * Clé pour le stockage localStorage
 */
const CART_STORAGE_KEY = 'atoumra_cart';
const DELIVERY_OPTION_KEY = 'atoumra_delivery_option';

/**
 * Composant Toaster pour afficher les notifications
 * Doit être placé à la racine de votre application
 */
export function CartToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 1500,
        style: {
          background: 'transparent',
          color: '#fff',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
        },
        success: {
          style: {
            // dégradé vert semi-transparent pour ajout
            background: 'linear-gradient(to right, rgba(187,203,100,0.5), rgba(164,187,100,0.5))',
            border: '1px solid rgba(164,187,100,0.7)',
            color: '#fff',
          },
        },
        error: {
          style: {
            // dégradé orange semi-transparent pour retrait
            background: 'linear-gradient(to right, rgba(249,115,22,0.5), rgba(251,191,36,0.5))',
            border: '1px solid rgba(251,191,36,0.7)',
            color: '#fff',
          },
        },
      }}
    />


  );
}

/**
 * Fournisseur de contexte du panier
 * Gère l'état global du panier et les opérations associées
 */
export function CartProvider({ children }: CartProviderProps) {
  // ================= ÉTAT DU PANIER =================
  const [items, setItems] = useState<CartItem[]>([]);
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption | null>(
    deliveryOptions[0]
  );
  const [isInitialized, setIsInitialized] = useState(false);

  // ================= PERSISTANCE =================
  /**
   * Initialise le panier depuis localStorage
   * Exécuté une seule fois au montage du composant
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      // Charger les items du panier
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart);
        }
      }

      // Charger l'option de livraison
      const savedDeliveryOption = localStorage.getItem(DELIVERY_OPTION_KEY);
      if (savedDeliveryOption) {
        const parsedOption = JSON.parse(savedDeliveryOption);
        const option = deliveryOptions.find(o => o.id === parsedOption?.id);
        if (option) {
          setDeliveryOption(option);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement du panier:', error);
      // En cas d'erreur, réinitialiser les données
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(DELIVERY_OPTION_KEY);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  /**
   * Sauvegarde automatique du panier dans localStorage
   * S'exécute uniquement quand items change
   */
  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du panier:', error);
    }
  }, [items, isInitialized]);

  /**
   * Sauvegarde automatique de l'option de livraison
   * S'exécute uniquement quand deliveryOption change
   */
  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined' || !deliveryOption) return;

    try {
      localStorage.setItem(
        DELIVERY_OPTION_KEY,
        JSON.stringify({ id: deliveryOption.id })
      );
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'option de livraison:', error);
    }
  }, [deliveryOption, isInitialized]);

  // ================= FONCTIONS DU PANIER =================

  /**
   * Vérifie si on peut ajouter une quantité spécifique d'un produit au panier
   * @param productId - ID du produit
   * @param quantityToAdd - Quantité à ajouter (défaut: 1)
   * @returns true si la quantité peut être ajoutée
   */
  const canAddToCart = (productId: string, quantityToAdd: number = 1): boolean => {
    const existingItem = items.find(item => item.product.id === productId);

    // Si le produit n'existe pas encore dans le panier
    if (!existingItem) {
      // On vérifie si on peut ajouter le produit
      // Pour cela, il faudrait récupérer le produit depuis une source de données
      // Pour l'instant, on retourne true par défaut
      return true;
    }

    // Si le produit a une propriété stock, on vérifie
    if (hasStock(existingItem.product)) {
      const availableStock = existingItem.product.stock;
      const newTotalQuantity = existingItem.quantity + quantityToAdd;
      return newTotalQuantity <= availableStock;
    }

    // Si le produit n'a pas de stock défini, on suppose qu'il est toujours disponible
    return true;
  };

  /**
   * Récupère le stock disponible d'un produit
   * @param product - Produit à vérifier
   * @returns Le stock disponible ou Infinity si non défini
   */
  const getProductStock = (product: Product | ProductPromo): number => {
    if (hasStock(product)) {
      return product.stock;
    }
    // Si le produit n'a pas de stock, on retourne une valeur élevée
    return Infinity;
  };

  /**
   * Affiche un toast de succès pour l'ajout au panier
   */
  const showAddToCartToast = (productName: string, quantity: number = 1) => {
    toast.success(
      <div className="flex items-center gap-3">
        <div>
          <div className="font-semibold">{productName}</div>
          <div className="text-sm opacity-90">Ajouté avec succès au panier</div>
          {quantity > 1 && (
            <div className="text-xs opacity-80">Quantité : {quantity}</div>
          )}
        </div>
      </div>,
      {
        duration: 3000,
        style: {
          background: '#10B981',
          color: '#fff',
        },
      }
    );
  };

  /**
   * Affiche un toast de suppression
   */
  const showRemoveFromCartToast = (productName: string) => {
    toast.error(
      <div className="flex items-center gap-3">
        <div>
          <div className="font-semibold">{productName}</div>
          <div className="text-sm opacity-90">Retiré du panier</div>
        </div>
      </div>,
      {
        duration: 2000,
      }
    );
  };

  /**
   * Affiche un toast de mise à jour de quantité
   */
  const showQuantityUpdateToast = (productName: string, newQuantity: number) => {
    toast.success(
      <div className="flex items-center gap-3">
        <div>
          <div className="font-semibold">{productName}</div>
          <div className="text-sm opacity-90">Quantité mise à jour : {newQuantity}</div>
        </div>
      </div>,
      {
        duration: 2000,
      }
    );
  };

  /**
   * Affiche un toast de stock insuffisant
   */
  const showStockErrorToast = (productName: string, availableStock: number) => {
    toast.error(
      <div className="flex items-center gap-3">
        <span className="text-lg">⚠️</span>
        <div>
          <div className="font-semibold">{productName}</div>
          <div className="text-sm opacity-90">
            Stock insuffisant ! Disponible : {availableStock}
          </div>
        </div>
      </div>,
      {
        duration: 3000,
      }
    );
  };

  /**
   * Ajoute un produit au panier avec toast de confirmation
   * @param product - Produit à ajouter
   * @param quantity - Quantité à ajouter (défaut: 1)
   */
  const addToCart = (product: Product | ProductPromo, quantity: number = 1) => {
    // Vérifier le stock
    const availableStock = getProductStock(product);
    const existingItem = items.find(item => item.product.id === product.id);
    const currentQuantity = existingItem?.quantity || 0;
    const newTotalQuantity = currentQuantity + quantity;

    if (availableStock !== Infinity && newTotalQuantity > availableStock) {
      showStockErrorToast(product.name, availableStock);
      return;
    }

    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        // Produit existe déjà, mise à jour de la quantité
        const updatedItems = [...prevItems];
        const existingQuantity = updatedItems[existingItemIndex].quantity;
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: existingQuantity + quantity
        };
        return updatedItems;
      } else {
        // Nouveau produit
        return [...prevItems, { product, quantity }];
      }
    });

    // Afficher le toast de succès
    showAddToCartToast(product.name, quantity);
  };

  /**
   * Supprime complètement un produit du panier
   * @param productId - ID du produit à supprimer
   * @param showToast - Afficher un toast de confirmation (défaut: true)
   */
  const removeFromCart = (productId: string, showToast: boolean = true) => {
    const itemToRemove = items.find(item => item.product.id === productId);

    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );

    // Afficher le toast de suppression si demandé
    if (showToast && itemToRemove) {
      showRemoveFromCartToast(itemToRemove.product.name);
    }
  };

  /**
   * Met à jour la quantité d'un produit spécifique
   * @param productId - ID du produit
   * @param quantity - Nouvelle quantité
   * @param showToast - Afficher un toast de confirmation (défaut: true)
   */
  const updateQuantity = (productId: string, quantity: number, showToast: boolean = true) => {
    if (quantity <= 0) {
      removeFromCart(productId, showToast);
      return;
    }

    // Vérifier le stock si on augmente la quantité
    const existingItem = items.find(item => item.product.id === productId);
    if (existingItem) {
      const availableStock = getProductStock(existingItem.product);
      if (availableStock !== Infinity && quantity > availableStock) {
        showStockErrorToast(existingItem.product.name, availableStock);
        return;
      }

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );

      // Afficher le toast de mise à jour si demandé
      if (showToast) {
        showQuantityUpdateToast(existingItem.product.name, quantity);
      }
    }
  };

  /**
   * Vide complètement le panier avec confirmation
   */
  const clearCart = () => {
    if (items.length === 0) return;

    toast.success(
      <div className="flex items-center gap-3">
        <span className="text-lg">🧹</span>
        <div>
          <div className="font-semibold">Panier vidé</div>
          <div className="text-sm opacity-90">
            {items.length} produit{items.length > 1 ? 's' : ''} supprimé{items.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>,
      {
        duration: 2000,
      }
    );

    setItems([]);
  };

  /**
   * Sélectionne une option de livraison
   * @param option - Option de livraison choisie
   */
  const handleSetDeliveryOption = (option: DeliveryOption) => {
    setDeliveryOption(option);

    // Toast d'information pour la livraison
    toast.success(
      <div className="flex items-center gap-3">
        <span className="text-lg">{option.icon}</span>
        <div>
          <div className="font-semibold">{option.name}</div>
          <div className="text-sm opacity-90">
            {option.price === 0 ? 'Gratuit' : `${option.price.toLocaleString()} FCFA`}
          </div>
        </div>
      </div>,
      {
        duration: 2000,
      }
    );
  };

  // ================= CALCULS =================
  /**
   * Calcule le nombre total d'articles dans le panier
   * @returns Nombre total d'articles
   */
  const getTotalItems = (): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  /**
   * Calcule le sous-total (prix des articles sans livraison)
   * @returns Sous-total en FCFA
   */
  const getSubtotal = (): number => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  /**
   * Calcule le total final (sous-total + livraison)
   * @returns Total final en FCFA
   */
  const getTotal = (): number => {
    const subtotal = getSubtotal();
    const deliveryCost = deliveryOption?.price || 0;
    return subtotal + deliveryCost;
  };

  // ================= VALEUR DU CONTEXTE =================
  const contextValue: CartContextType = {
    items,
    deliveryOption,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setDeliveryOption: handleSetDeliveryOption,
    getTotalItems,
    getSubtotal,
    getTotal,
    canAddToCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Hook personnalisé pour utiliser le contexte du panier
 * @returns Contexte du panier
 * @throws Error si utilisé hors de CartProvider
 */
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart doit être utilisé à l'intérieur d'un CartProvider");
  }
  return context;
}