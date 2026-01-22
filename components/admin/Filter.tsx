import { useState } from "react";

interface FilterProps<T extends Record<string, any>> {
  /** Fonction callback appelée à chaque changement de filtre */
  onFilterChange: (filters: Partial<T>) => void;

  /** Options facultatives pour des filtres spécifiques */
  options?: {
    [key: string]: string[]; // ex. rôle : ["admin","user"]
  };
}

/**
 * Composant générique Filter
 * - Permet de filtrer une table en émettant un objet de filtres
 * - Props génériques pour s'adapter à différents types de données
 * - Bonnes pratiques :
 *   - Input avec aria-label
 *   - Bouton "Réinitialiser" pour réinitialiser tous les filtres
 */
export default function Filter<T>({ onFilterChange, options }: FilterProps<T>) {
  // ⚡ Stocke les valeurs des filtres
  const [search, setSearch] = useState<string>("");
  const [selectFilters, setSelectFilters] = useState<Record<string, string>>(
    {},
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilterChange({ ...selectFilters, search } as Partial<T>);
  };

  const handleSelectChange = (key: string, value: string) => {
    const newFilters = { ...selectFilters, [key]: value };
    setSelectFilters(newFilters);
    onFilterChange({ ...newFilters, search } as Partial<T>);
  };

  const handleReset = () => {
    setSearch("");
    setSelectFilters({});
    onFilterChange({} as Partial<T>);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4 items-center">
      {/* Champ recherche */}
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Rechercher..."
        aria-label="Rechercher"
        className="input input-bordered outline-none rounded-lg flex-1"
      />

      {/* Filtres select dynamiques */}
      {options &&
        Object.entries(options).map(([key, values]) => (
          <select
            key={key}
            value={selectFilters[key] || ""}
            onChange={(e) => handleSelectChange(key, e.target.value)}
            className="select select-bordered outline-none rounded-lg"
            aria-label={`Filtrer par ${key}`}
          >
            <option value="">Tous</option>
            {values.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        ))}

      {/* Bouton réinitialiser */}
      <button className="btn btn-sm rounded-lg" onClick={handleReset}>
        Réinitialiser
      </button>
    </div>
  );
}
