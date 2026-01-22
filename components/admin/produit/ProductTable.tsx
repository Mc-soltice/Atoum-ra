import Filter from "@/components/admin/Filter";
import { useState } from "react";
import type { Product } from "@/types/product";

interface ProductsTableProps {
  products: Product[];
  onEdit: (prod: Product) => void;
  onDelete: (prod: Product) => void;
}

/**
 * Composant Table Products
 * - Affiche les produits avec stock, promo, prix
 * - Possibilité de filtrer par nom, catégorie ou promo
 * - Accessibilité : thead, tbody, scope, aria-labels
 */
export default function ProductsTable({
  products,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <>
      {/* Filtrage */}
      <Filter<Product>
        options={{
          is_promotional: ["true", "false"],
        }}
        onFilterChange={(filters) => {
          let result = products;

          if (filters.search) {
            result = result.filter((p) =>
              p.name.toLowerCase().includes(filters.search!.toLowerCase()),
            );
          }
          if (filters.is_promotional) {
            result = result.filter(
              (p) => String(p.is_promotional) === filters.is_promotional,
            );
          }
          setFilteredProducts(result);
        }}
      />

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#ID</th>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Promo</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  Aucun produit
                </td>
              </tr>
            ) : (
              filteredProducts.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.id}</td>
                  <td>{prod.name}</td>
                  <td>{prod.category?.name || "-"}</td>
                  <td>{prod.price.toFixed(2)} €</td>
                  <td>{prod.is_promotional ? "Oui" : "Non"}</td>
                  <td>{prod.stock}</td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm btn-info"
                      aria-label={`Éditer ${prod.name}`}
                      onClick={() => onEdit(prod)}
                    >
                      Éditer
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      aria-label={`Supprimer ${prod.name}`}
                      onClick={() => onDelete(prod)}
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
