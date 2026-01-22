"use client";

import { useState } from "react";
import type { Category } from "@/types/category";
import CategoriesTable from "@/components/admin/category/CategoryTable";
import AddCategoryModal from "@/components/admin/category/AddCategoryModal";
import EditCategoryModal from "@/components/admin/category/EditCategoryModal";
import DeleteCategoryModal from "@/components/admin/category/DeleteCategoryModal";
import { PlusCircle } from "lucide-react";
/**
 * Page Admin Categories
 * Affiche toutes les catégories et permet CRUD via modals
 * SEO : titre, heading, aria labels
 */
export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des Catégories</h1>

      <button
        className="flex items-center justify-center gap-2 mb-6 px-6 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 transition-all"
        onClick={() => setIsAddOpen(true)}
        aria-label="Ajouter une nouvelle catégorie"
      >
        <PlusCircle className="w-5 h-5" />
        Ajouter une catégorie
      </button>

      <CategoriesTable
        categories={categories}
        onEdit={(cat) => {
          setSelectedCategory(cat);
          setIsEditOpen(true);
        }}
        onDelete={(cat) => {
          setSelectedCategory(cat);
          setIsDeleteOpen(true);
        }}
      />

      <AddCategoryModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onCategoryAdded={(cat) => setCategories([...categories, cat])}
      />

      <EditCategoryModal
        isOpen={isEditOpen}
        category={selectedCategory}
        onClose={() => setIsEditOpen(false)}
        onCategoryUpdated={(updatedCat) =>
          setCategories(
            categories.map((c) => (c.id === updatedCat.id ? updatedCat : c)),
          )
        }
      />

      <DeleteCategoryModal
        isOpen={isDeleteOpen}
        category={selectedCategory}
        onClose={() => setIsDeleteOpen(false)}
        onCategoryDeleted={(id) =>
          setCategories(categories.filter((c) => c.id !== id))
        }
      />
    </div>
  );
}
