"use client";

import type { Product, ProductFilters } from "@/types/product";
import Filter from "@/components/admin/Filter";
import { useState, useEffect } from "react";
import ProductImage from "@/components/admin/produit/ProductImage";

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

/**
 * Composant pour afficher la table des produits
 * Gère le filtrage et l'affichage des données
 */
export default function ProductsTable({
  products,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // ✅ Options de filtre pour le statut
  const filterOptions = {
    stock_status: ["En stock", "Stock faible", "Rupture"],
    is_promotional: ["Promo", "Standard"],
  };

  // ✅ Synchronise les produits filtrés quand la liste change
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // ✅ Fonction pour déterminer le statut du stock
  const getStockStatus = (product: Product) => {
    if (product.is_out_of_stock) return "Rupture";
    if (product.is_stock_low) return "Stock faible";
    return "En stock";
  };

  return (
    <>
      {/* Filtre générique */}
      <Filter<ProductFilters>
        options={filterOptions}
        onFilterChange={(filters) => {
          let result = products;

          if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            result = result.filter(
              (p) =>
                p.name.toLowerCase().includes(searchTerm) ||
                p.description?.toLowerCase().includes(searchTerm) ||
                p.category?.name.toLowerCase().includes(searchTerm),
            );
          }

          if (filters.stock_status) {
            result = result.filter(
              (p) => getStockStatus(p) === filters.stock_status,
            );
          }

          if (filters.is_promotional === "Promo") {
            result = result.filter((p) => p.is_promotional === true);
          }

          if (filters.is_promotional === "Standard") {
            result = result.filter((p) => p.is_promotional === false);
          }

          setFilteredProducts(result);
        }}
      />

      {/* Table des produits */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Nom</th>
              <th scope="col">Catégorie</th>
              <th scope="col">Prix</th>
              <th scope="col">Stock</th>
              <th scope="col">Statut</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  Aucun produit trouvé
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  onClick={() => onEdit(product)}
                  className="cursor-pointer hover:bg-gray-50"
                  aria-label={`Éditer le produit ${product.name}`}
                >
                  <td>
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <ProductImage
                          src={product.main_image}
                          alt={product.name}
                          width={48}
                          height={48}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {product.description}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-outline">
                      {product.category?.name || "Sans catégorie"}
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span
                        className={`font-bold ${product.is_promotional ? "text-red-600" : ""}`}
                      >
                        {product.price.toFixed(2)}€
                      </span>
                      {product.is_promotional && product.original_price && (
                        <span className="text-sm text-gray-500 line-through">
                          {product.original_price.toFixed(2)}€
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div
                      className={`font-medium ${getStockStatus(product) === "Rupture" ? "text-red-600" : getStockStatus(product) === "Stock faible" ? "text-orange-500" : "font-bold"}`}
                    >
                      {product.stock} (
                      {getStockStatus(product) === "Rupture"
                        ? "Rupture"
                        : getStockStatus(product) === "Stock faible"
                          ? "Stock faible"
                          : "En stock"}
                      )
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col gap-1">
                      {product.is_promotional ? "Promo" : "Standard"}
                    </div>
                  </td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm bg-slate-800 text-white rounded-lg"
                      aria-label={`Supprimer le produit ${product.name}`}
                      onClick={(e) => {
                        e.stopPropagation(); // Empêche le déclenchement de onEdit
                        onDelete(product);
                      }}
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
