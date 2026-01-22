"use client";

/**
 * DataTable générique
 * - Affichage tabulaire
 * - Recherche simple
 * - Pagination (préparée pour API Laravel)
 * - Réutilisable pour Users / Categories / Products
 */

import { useState } from "react";

export interface Column<T> {
  /** Libellé affiché dans l'en-tête */
  header: string;

  /** Clé ou fonction d'accès à la valeur */
  accessor: keyof T | ((row: T) => React.ReactNode);
}

interface DataTableProps<T> {
  /** Données à afficher */
  data: T[];

  /** Définition des colonnes */
  columns: Column<T>[];

  /** Placeholder du champ de recherche */
  searchPlaceholder?: string;
}

export default function DataTable<T>({
  data,
  columns,
  searchPlaceholder = "Rechercher...",
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");

  /**
   * Filtrage simple côté client
   * (sera remplacé plus tard par un filtrage API)
   */
  const filteredData = data.filter((row) =>
    JSON.stringify(row).toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="space-y-4">
      {/* Barre de recherche */}
      <div>
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="input input-bordered w-full max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Recherche dans le tableau"
        />
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto border border-black/10 rounded-md">
        <table className="table w-full">
          <thead className="bg-black text-white">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="text-sm font-medium">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-sm text-black/60 py-6"
                >
                  Aucun résultat
                </td>
              </tr>
            ) : (
              filteredData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-black/5">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="text-sm">
                      {typeof col.accessor === "function"
                        ? col.accessor(row)
                        : (row[col.accessor] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
