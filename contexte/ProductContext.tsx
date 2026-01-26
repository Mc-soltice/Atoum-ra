"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { toast } from "react-hot-toast";
import type {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
} from "@/types/product";
import { productService } from "@/services/product.service";

/**
 * Interface du contexte Product
 */
interface ProductContextType {
  products: Product[];
  loading: boolean;
  currentProduct: Product | null;
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<Product>;
  createProduct: (payload: CreateProductPayload) => Promise<void>;
  updateProduct: (id: string, payload: UpdateProductPayload) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

/**
 * Provider Product
 * Calqué sur UserProvider
 */
export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * 🔹 Charger tous les produits
   */
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors du chargement des produits");
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 🔹 Récupérer un produit par ID
   */
  const fetchProductById = useCallback(async (id: string): Promise<Product> => {
    setLoading(true);
    try {
      const product = await productService.getById(id);
      setCurrentProduct(product);
      return product;
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la récupération du produit");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 🔹 Créer un produit
   */
  const createProduct = async (payload: CreateProductPayload) => {
    setLoading(true);
    try {
      const newProduct = await productService.create(payload);
      setProducts((prev) => [...prev, newProduct]);
      toast.success("Produit créé avec succès !");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la création du produit");
    } finally {
      setLoading(false);
    }
  };

  /**
   * 🔹 Mettre à jour un produit
   */
  const updateProduct = async (id: string, payload: UpdateProductPayload) => {
    setLoading(true);
    try {
      const updated = await productService.update(id, payload);
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p)),
      );
      setCurrentProduct(updated);
      toast.success("Produit mis à jour !");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour du produit");
    } finally {
      setLoading(false);
    }
  };

  /**
   * 🔹 Supprimer un produit
   */
  const deleteProduct = async (id: string) => {
    setLoading(true);
    try {
      await productService.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      if (currentProduct?.id === id) {
        setCurrentProduct(null);
      }
      toast.success("Produit supprimé !");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression du produit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        currentProduct,
        fetchProducts,
        fetchProductById,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

/**
 * Hook utilitaire pour accéder au contexte Product
 */
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
