"use client";

import ProductsTable from "@/components/admin/produit/ProductTable";
import AddProductModal from "@/components/admin/produit/AddProductModal";
import EditProductModal from "@/components/admin/produit/EditProductModal";
import DeleteProductModal from "@/components/admin/produit/DeleteProductModal";
import type { Product } from "@/types/product";
import { Waveform } from "ldrs/react";
import "ldrs/react/Waveform.css";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductProvider, useProducts } from "@/contexte/ProductContext";
import { CategoryProvider, useCategories } from "@/contexte/CategoryContext";

/**
 * Page Admin Produits
 * Affiche la liste des produits et permet de gérer CRUD via des modals
 */
function ProductsContent() {
  // ✅ Utilisation des contextes
  const { products, loading: productsLoading, fetchProducts } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();

  // ✅ State pour gérer l'ouverture des modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // ✅ Stocke le produit actuellement sélectionné pour édition/suppression
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // ✅ useEffect : Récupère les produits au montage du composant
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ✅ Affiche un loader pendant le chargement
  const isLoading = productsLoading || categoriesLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Waveform size="35" stroke="3.5" speed="1" color="black" />
        <span className="ml-3 text-gray-700">Chargement des produits...</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Titre de la page */}
      <h1 className="text-2xl font-bold mb-4">Gestion des Produits</h1>

      {/* Bouton d'ajout d'un produit */}
      <button
        className="flex items-center justify-center gap-2 mb-6 px-6 py-2 rounded-lg font-medium text-white bg-linear-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 transition-all"
        onClick={() => setIsAddOpen(true)}
        aria-label="Ajouter un produit"
      >
        <PlusCircle className="w-5 h-5" />
        Ajouter un produit
      </button>

      {/* Table des produits */}
      <ProductsTable
        products={products}
        onEdit={(product) => {
          setSelectedProduct(product);
          setIsEditOpen(true);
        }}
        onDelete={(product) => {
          setSelectedProduct(product);
          setIsDeleteOpen(true);
        }}
      />

      {/* Modals pour CRUD */}
      <AddProductModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onProductAdded={() => fetchProducts()} // Rafraîchir la liste après ajout
        categories={categories}
      />

      <EditProductModal
        isOpen={isEditOpen}
        product={selectedProduct}
        onClose={() => setIsEditOpen(false)}
        onProductUpdated={() => fetchProducts()} // Rafraîchir la liste après modification
      />

      <DeleteProductModal
        isOpen={isDeleteOpen}
        product={selectedProduct}
        onClose={() => setIsDeleteOpen(false)}
        onProductDeleted={() => fetchProducts()} // Rafraîchir la liste après suppression
      />
    </div>
  );
}

/**
 * Page principale enveloppée dans les providers
 */
export default function ProductsPage() {
  return (
    <ProductProvider>
      <CategoryProvider>
        <ProductsContent />
      </CategoryProvider>
    </ProductProvider>
  );
}
