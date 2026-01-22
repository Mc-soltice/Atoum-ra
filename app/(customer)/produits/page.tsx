"use client";

import CartSlider from "@/components/customer/productCategorie/CartSlider";
import ProductCard from "@/components/customer/products/ProductCard";
import Breadcrumbs, { BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { mockProducts } from "@/lib/moks/mokProduct";
import { Product } from "@/types/product";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Produits", href: "/produits" },
];

export default function ProductsPage() {
  // ================= ÉTATS =================
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("default");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isCartSliderOpen, setIsCartSliderOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= CATÉGORIES UNIQUES =================
  const categories = Array.from(new Set(mockProducts.map((p) => p.category)));
  const categoryCounts = categories.map((category) => ({
    name: category,
    count: mockProducts.filter((p) => p.category === category).length,
  }));

  // ================= FILTRAGE =================
  const filterProducts = useCallback(() => {
    setLoading(true);

    let result = [...mockProducts];

    // Filtre par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      );
    }

    // Filtre par catégories
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category),
      );
    }

    // Tri
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Ordre par défaut
        break;
    }

    setFilteredProducts(result);
    setLoading(false);
  }, [searchQuery, selectedCategories, sortBy]);

  // ================= EFFETS =================
  useEffect(() => {
    // Délai pour éviter les cascading renders
    const timer = setTimeout(() => {
      filterProducts();
    }, 300);

    return () => clearTimeout(timer);
  }, [filterProducts]);

  // ================= HANDLERS =================
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSortBy("default");
  };

  const openCartSlider = () => {
    setIsCartSliderOpen(true);
  };

  const closeCartSlider = () => {
    setIsCartSliderOpen(false);
  };

  // ================= RENDU =================
  return (
    <div className="min-h-screen bg-white lg:px-50">
      {/* En-tête avec fil d'ariane */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs items={breadcrumbs} />

          {/* Boutons actions mobile */}
          <div className="mt-4 flex items-center justify-between md:hidden">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 text-white rounded-lg
                       hover:bg-amber-600 transition-colors shadow-sm"
            >
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filtres</span>
              {selectedCategories.length > 0 && (
                <span
                  className="ml-1 bg-white text-amber-600 text-xs font-bold 
                               rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {selectedCategories.length}
                </span>
              )}
            </button>

            {/* Bouton panier mobile */}
            <button
              onClick={openCartSlider}
              className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-amber-500 to-amber-600 text-white rounded-lg
                       hover:from-amber-600 hover:to-amber-700 transition-colors shadow-sm"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="font-medium">Voir panier</span>
            </button>

            {/* Résultats mobile */}
            <div className="text-sm text-gray-600">
              {filteredProducts.length} produit
              {filteredProducts.length > 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ================= FILTRES LATÉRAUX (DESKTOP) ================= */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-6 space-y-6">
              {/* En-tête filtres */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Filtres
                  </h2>
                  {selectedCategories.length > 0 && (
                    <button
                      onClick={handleClearFilters}
                      className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                    >
                      Tout effacer
                    </button>
                  )}
                </div>

                {/* Stats */}
                <div className="text-sm text-gray-600 mb-4">
                  <p>
                    {filteredProducts.length} produit
                    {filteredProducts.length > 1 ? "s" : ""} sur{" "}
                    {mockProducts.length}
                  </p>
                </div>

                {/* Bouton panier desktop */}
                <button
                  onClick={openCartSlider}
                  className="w-full py-2.5 bg-linear-to-r from-amber-500 to-amber-600 text-white 
                           font-medium rounded-lg hover:from-amber-600 hover:to-amber-700 
                           transition-colors shadow-sm mt-3"
                >
                  Voir mon panier
                </button>
              </div>

              {/* Catégories */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-amber-500" />
                  Catégories
                </h3>
                <div className="space-y-2">
                  {categoryCounts.map(({ name, count }) => (
                    <label
                      key={name}
                      className="flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(name)}
                          onChange={() => handleCategoryToggle(name)}
                          className="checkbox checkbox-sm checkbox-amber rounded"
                        />
                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                          {name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tri */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Trier par</h3>
                <div className="space-y-2">
                  {[
                    { value: "default", label: "Recommandé" },
                    { value: "price-asc", label: "Prix croissant" },
                    { value: "price-desc", label: "Prix décroissant" },
                    { value: "name-asc", label: "Nom A-Z" },
                    { value: "name-desc", label: "Nom Z-A" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        checked={sortBy === option.value}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="radio radio-sm radio-amber"
                      />
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Aperçu catégories sélectionnées */}
              {selectedCategories.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <h4 className="font-medium text-amber-900 mb-2">
                    Catégories sélectionnées :
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((category) => (
                      <span
                        key={category}
                        className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 
                                 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {category}
                        <button
                          onClick={() => handleCategoryToggle(category)}
                          className="text-amber-600 hover:text-amber-800"
                          aria-label={`Retirer ${category}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* ================= CONTENU PRINCIPAL ================= */}
          <main className="flex-1">
            {/* En-tête produits desktop */}
            <div className="hidden md:flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Tous les produits
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {filteredProducts.length} produit
                  {filteredProducts.length > 1 ? "s" : ""} disponible
                  {filteredProducts.length > 1 ? "s" : ""}
                </p>
              </div>

              {/* Actions desktop */}
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="select select-bordered select-sm bg-white text-gray-700"
                >
                  <option value="default">Recommandé</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="name-asc">Nom A-Z</option>
                  <option value="name-desc">Nom Z-A</option>
                </select>

                <button
                  onClick={openCartSlider}
                  className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-amber-500 to-amber-600 
                           text-white rounded-lg hover:from-amber-600 hover:to-amber-700 
                           transition-colors shadow-sm"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="font-medium">Panier</span>
                </button>
              </div>
            </div>

            {/* Grille de produits */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 rounded-lg aspect-square mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onCartClick={openCartSlider}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-600 mb-6">
                  Aucun produit ne correspond à vos critères de recherche.
                  Essayez de modifier vos filtres.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-3 bg-linear-to-r from-amber-500 to-amber-600 text-white 
                           font-medium rounded-lg hover:from-amber-600 hover:to-amber-700 
                           transition-all shadow-md hover:shadow-lg"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ================= MODAL FILTRES MOBILE ================= */}
      <div
        className={`lg:hidden fixed inset-0 z-50 ${isMobileFiltersOpen ? "block" : "hidden"}`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMobileFiltersOpen(false)}
        />

        {/* Panneau filtres */}
        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
          <div className="h-full flex flex-col">
            {/* En-tête */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Contenu filtres */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Catégories */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Catégories</h3>
                <div className="space-y-2">
                  {categoryCounts.map(({ name, count }) => (
                    <label
                      key={name}
                      className="flex items-center justify-between cursor-pointer group py-2"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(name)}
                          onChange={() => handleCategoryToggle(name)}
                          className="checkbox checkbox-sm checkbox-amber"
                        />
                        <span className="text-gray-700 group-hover:text-gray-900">
                          {name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tri */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Trier par</h3>
                <div className="space-y-2">
                  {[
                    { value: "default", label: "Recommandé" },
                    { value: "price-asc", label: "Prix croissant" },
                    { value: "price-desc", label: "Prix décroissant" },
                    { value: "name-asc", label: "Nom A-Z" },
                    { value: "name-desc", label: "Nom Z-A" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 cursor-pointer group py-2"
                    >
                      <input
                        type="radio"
                        name="sort-mobile"
                        value={option.value}
                        checked={sortBy === option.value}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="radio radio-sm radio-amber"
                      />
                      <span className="text-gray-700 group-hover:text-gray-900">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Pied de page */}
            <div className="p-4 border-t border-gray-200 space-y-3">
              <button
                onClick={handleClearFilters}
                className="w-full py-2.5 text-amber-600 font-medium border border-amber-600 
                         rounded-lg hover:bg-amber-50 transition-colors"
              >
                Réinitialiser
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-2.5 bg-linear-to-r from-amber-500 to-amber-600 
                         text-white font-medium rounded-lg hover:from-amber-600 
                         hover:to-amber-700 transition-colors"
              >
                Voir les résultats
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SLIDER DU PANIER ================= */}
      <CartSlider isOpen={isCartSliderOpen} onClose={closeCartSlider} />
    </div>
  );
}
