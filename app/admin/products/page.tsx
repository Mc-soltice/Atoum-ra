"use client";
import { useState } from "react";
import type { Product } from "@/types/product";
import ProductsTable from "@/components/admin/produit/ProductTable";
import AddProductModal from "@/components/admin/produit/AddProductModal";
import EditProductModal from "@/components/admin/produit/EditProductModal";
import DeleteProductModal from "@/components/admin/produit/DeleteProductModal";
import { PlusCircle } from "lucide-react";

// Catégories fictives - À remplacer par un appel API dans une vraie app
const MOCK_CATEGORIES = [
  {
    id: 1,
    name: "Soins Visage",
    description: "",
    created_at: "",
    updated_at: "",
  },
  {
    id: 2,
    name: "Soins Corps",
    description: "",
    created_at: "",
    updated_at: "",
  },
  {
    id: 3,
    name: "Maquillage",
    description: "",
    created_at: "",
    updated_at: "",
  },
  { id: 4, name: "Parfums", description: "", created_at: "", updated_at: "" },
];

/**
 * Page Admin Products
 * Affiche la liste des produits et permet CRUD via modals
 * SEO : titre, heading h1, aria labels
 */
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Handler pour la mise à jour d'un produit
  const handleProductUpdated = async (
    id: number,
    payload: Partial<Product>,
  ) => {
    // Dans une vraie app, appel API ici
    setProducts(
      products.map((p) =>
        p.id === id ? ({ ...p, ...payload } as Product) : p,
      ),
    );
  };

  // Handler pour la suppression d'un produit
  const handleProductDeleted = async (id: number) => {
    // Dans une vraie app, appel API ici
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Gestion des Produits</h1>
        <p className="text-gray-600">
          Gérez votre catalogue de produits. Ajoutez, modifiez ou supprimez des
          produits.
        </p>
      </header>

      <button
        className="flex items-center justify-center gap-2 mb-6 px-6 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 transition-all"
        onClick={() => setIsAddOpen(true)}
        aria-label="Ajouter un nouveau produit"
      >
        <PlusCircle className="w-5 h-5" />
        Ajouter un produit
      </button>

      <ProductsTable
        products={products}
        onEdit={(prod) => {
          setSelectedProduct(prod);
          setIsEditOpen(true);
        }}
        onDelete={(prod) => {
          setSelectedProduct(prod);
          setIsDeleteOpen(true);
        }}
      />

      {/* Modal d'ajout */}
      {isAddOpen && (
        <AddProductModal
          categories={MOCK_CATEGORIES}
          onClose={() => setIsAddOpen(false)}
          onProductAdded={(newProduct) => {
            setProducts([...products, newProduct]);
            setIsAddOpen(false);
          }}
        />
      )}

      {/* Modal d'édition */}
      <EditProductModal
        isOpen={isEditOpen}
        product={selectedProduct}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleProductUpdated}
      />

      {/* Modal de suppression */}
      <DeleteProductModal
        isOpen={isDeleteOpen}
        product={selectedProduct}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedProduct(null);
        }}
        onProductDeleted={(id) => {
          handleProductDeleted(id);
          setIsDeleteOpen(false);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
}
