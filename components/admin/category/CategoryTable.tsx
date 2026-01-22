import Filter from "@/components/admin/Filter";
import { useState } from "react";
import type { Category } from "@/types/category";

interface CategoriesTableProps {
  categories: Category[];
  onEdit: (cat: Category) => void;
  onDelete: (cat: Category) => void;
}

/**
 * Composant Table Categories
 * - Affiche la liste des catégories
 * - Utilise le composant Filter générique
 * - Accessibilité : <thead>, <tbody>, scope, aria-labels
 */
export default function CategoriesTable({
  categories,
  onEdit,
  onDelete,
}: CategoriesTableProps) {
  const [filteredCategories, setFilteredCategories] = useState(categories);

  return (
    <>
      {/* Filtrage par nom */}
      <Filter<Category>
        onFilterChange={(filters) => {
          let result = categories;
          if (filters.search) {
            result = result.filter((c) =>
              c.name.toLowerCase().includes(filters.search!.toLowerCase()),
            );
          }
          setFilteredCategories(result);
        }}
      />

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Nom</th>
              <th scope="col">Description</th>
              <th scope="col">Créé le</th>
              <th scope="col">Mis à jour</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center">
                  Aucune catégorie
                </td>
              </tr>
            ) : (
              filteredCategories.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td>{cat.name}</td>
                  <td>{cat.description}</td>
                  <td>{cat.created_at}</td>
                  <td>{cat.updated_at}</td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm btn-info"
                      aria-label={`Éditer ${cat.name}`}
                      onClick={() => onEdit(cat)}
                    >
                      Éditer
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      aria-label={`Supprimer ${cat.name}`}
                      onClick={() => onDelete(cat)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
