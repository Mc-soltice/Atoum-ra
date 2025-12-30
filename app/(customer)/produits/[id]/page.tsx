import Breadcrumbs, { BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { getProductById } from "@/lib/moks/mokProduct";
import { Heart, Shield, ShoppingCart, Truck } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

/**
 * Métadonnées dynamiques SEO
 * Génère les balises meta pour une optimisation optimale des moteurs de recherche
 */
export const metadata: Metadata = {
  title: "Détail du produit | Atoum-ra",
  description: "Découvrez les bienfaits de nos produits naturels authentiques",
  openGraph: {
    title: "Détail du produit | Atoum-ra",
    description: "Découvrez les bienfaits de nos produits naturels authentiques",
    type: "website",
  },
};

interface ProductDetailProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Page de détail d'un produit
 * Affiche les informations complètes d'un produit naturel avec galerie d'images
 * @param params - Paramètres de la route contenant l'ID du produit
 * @returns JSX.Element - Page de détail optimisée SEO
 */
export default async function ProductDetail({ params }: ProductDetailProps) {
  const { id } = await params;
  const product = await getProductById(id);

  // ================= GESTION DES ERREURS 404 =================
  if (!product) {
    notFound();
  }

  // ================= FIL D'ARIANE SEO =================
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Accueil", href: "/" },
    { label: "Produits", href: "/produits" },
    { label: product.name }, // Dernier élément non cliquable (page actuelle)
  ];

  return (
    <main className="max-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* ================= CONTENEUR PRINCIPAL (60% DE LARGEUR) ================= */}
      <div className="container mx-auto px-4 py-6 md:px-6 max-w-4xl">
        {/* ================= FIL D'ARIANE DE NAVIGATION ================= */}
        <Breadcrumbs items={breadcrumbs} className="mb-4 md:mb-6" />

        {/* ================= SECTION PRINCIPALE DU PRODUIT ================= */}
        <section className="bg-white rounded-xl shadow-md p-4 md:p-6">
          {/* ================= GRID PRINCIPALE RESPONSIVE ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

            {/* ================= GALERIE D'IMAGES ================= */}
            <div className="w-full space-y-4">
              {/* IMAGE PRINCIPALE */}
              <div className="aspect-square w-full bg-gradient-to-br from-emerald-50 to-amber-50 rounded-lg flex items-center justify-center border border-emerald-100 overflow-hidden">
                <div className="text-center p-4">
                  <span className="text-5xl mb-3 block">🌿</span>
                  <p className="text-gray-700 font-medium">Image du produit</p>
                  <p className="text-sm text-gray-500 mt-1">{product.name}</p>
                </div>
              </div>

              {/* MINIATURES DES IMAGES */}
              <div className="grid grid-cols-3 gap-3">
                <div className="aspect-square bg-gradient-to-br from-amber-50 to-emerald-50 rounded-lg flex items-center justify-center border border-amber-100 hover:border-amber-300 transition-colors cursor-pointer">
                  <span className="text-xl">🖼️</span>
                </div>
                <div className="aspect-square bg-gradient-to-br from-emerald-50 to-amber-50 rounded-lg flex items-center justify-center border border-emerald-100 hover:border-emerald-300 transition-colors cursor-pointer">
                  <span className="text-xl">📸</span>
                </div>
                <div className="aspect-square bg-gradient-to-br from-amber-50 to-emerald-50 rounded-lg flex items-center justify-center border border-amber-100 hover:border-amber-300 transition-colors cursor-pointer">
                  <span className="text-xl">🌱</span>
                </div>
              </div>
            </div>

            {/* ================= INFORMATIONS DU PRODUIT ================= */}
            <div className="w-full">
              {/* ================= EN-TÊTE DU PRODUIT ================= */}
              <div className="mb-4">
                {/* Catégorie */}
                <div className="mb-2">
                  <span className="inline-block px-2.5 py-0.5 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
                    {product.category}
                  </span>
                </div>

                {/* Titre principal */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* ================= PRIX ET STOCK ================= */}
              <div className="mb-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  {/* Prix */}
                  <div>
                    <span className="text-xl font-bold text-amber-700">
                      €{product.price.toFixed(2)}
                    </span>

                    {/* cas de la promo */}
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="ml-2 text-lg text-gray-400 line-through">
                        €{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Indicateur de stock */}
                  <div className="text-sm">
                    {product.stock > 10 ? (
                      <span className="flex items-center text-emerald-600">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                        En stock
                      </span>
                    ) : product.stock > 0 ? (
                      <span className="flex items-center text-amber-600">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                        Plus que {product.stock}
                      </span>
                    ) : (
                      <span className="flex items-center text-red-600">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        Rupture
                      </span>
                    )}
                  </div>
                </div>

                {/* BADGE PROMOTION (si applicable) */}
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold rounded-full">
                    Économisez {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </div>
                )}
              </div>

              {/* ================= DESCRIPTION COURTE ================= */}
              <div className="mb-2">
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>
              </div>

              {/* ================= CARACTÉRISTIQUES RAPIDES ================= */}
              {(product.ingredients || product.benefits) && (
                <div className="mb-6 rounded-lg p-4 border border-emerald-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    Détails
                  </h3>

                  {/* Ingrédients (premiers 3) */}
                  {product.ingredients && product.ingredients.slice(0, 3).map((ingredient, index) => (
                    <div key={index} className="flex items-center text-gray-700 mb-2 last:mb-0">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></span>
                      <span className="text-sm">{ingredient}</span>
                    </div>
                  ))}

                  {/* Bienfaits (premier) */}
                  {product.benefits && product.benefits[0] && (
                    <div className="flex items-center text-gray-700 mt-3 pt-3 border-t border-emerald-100">
                      <Heart className="w-4 h-4 mr-3 text-rose-500" />
                      <span className="text-sm">Aport : {product.benefits[0]}</span>
                    </div>
                  )}
                  {/* Bienfaits (premier) */}
                  {product.usage && product.usage[0] && (
                    <div className="flex items-center text-gray-700 mt-3 pt-3 border-t border-emerald-100">
                      <Heart className="w-4 h-4 mr-3 text-rose-500" />
                      <span className="text-sm">Prise: {product.usage}</span>
                    </div>
                  )}
                </div>
              )}

              {/* ================= BOUTONS D'ACTION ================= */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Bouton Ajouter au panier */}
                  <button
                    // className="btn rounded-lg bg-gradient-to-r from-[#BBCB64] to-[#A4BB64] text-white flex-1 py-3 text-base hover:from-[#A4BB64] hover:to-[#8DAB64] transition-all duration-300 shadow-sm hover:shadow"
                    className="btn rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white flex-1 py-3 text-base hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-sm hover:shadow"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="inline-block mr-2 w-5 h-5" />
                    {product.stock === 0 ? 'Rupture' : 'Ajouter au panier'}
                  </button>
                </div>
              </div>

              {/* ================= GARANTIES ================= */}
              <div className="border-t border-gray-300 pt-4">
                <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
                  <div className="flex items-center text-gray-600">
                    <Shield className="w-4 h-4 mr-2 text-emerald-500" />
                    <span>Garantie 30 jours</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Truck className="w-4 h-4 mr-2 text-blue-500" />
                    <span>Livraison 48h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= SECTIONS DÉTAILLÉES (ACCORDÉON STYLE) ================= */}
          <div className="pt-6 border-t border-gray-100">
            {/* ================= BLOC INFORMATIONS PRODUIT ================= */}
            <div className="card bg-white border border-gray-200 rounded-xl p-3">

              <div className="flex w-full flex-col lg:flex-row">

                {/* ================= INGRÉDIENTS ================= */}
                {product.ingredients && product.ingredients.length > 0 && (
                  <div className="grow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Ingrédients
                    </h3>

                    <ul className="space-y-2 text-sm text-gray-700">
                      {product.ingredients.map((ingredient, index) => (
                        <li key={index}>• {ingredient}</li>
                      ))}
                    </ul>

                    <p className="text-xs text-gray-500 mt-4">
                      Ingrédients d’origine naturelle, sélectionnés avec soin.
                    </p>
                  </div>
                )}

                {/* ================= DIVIDER ================= */}
                <div className="divider lg:divider-horizontal" />

                {/* ================= BIENFAITS ================= */}
                {product.benefits && product.benefits.length > 0 && (
                  <div className="grow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Bienfaits
                    </h3>

                    <ul className="space-y-2 text-sm text-gray-700">
                      {product.benefits.map((benefit, index) => (
                        <li key={index}>• {benefit}</li>
                      ))}
                    </ul>

                    <p className="text-xs text-gray-500 mt-4">
                      Résultats basés sur l’usage traditionnel.
                    </p>
                  </div>
                )}

                {/* ================= DIVIDER ================= */}
                <div className="divider lg:divider-horizontal" />

                {/* ================= MODE D’UTILISATION ================= */}
                {product.usage && (
                  <div className="grow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Mode d’utilisation
                    </h3>

                    <p className="text-sm text-gray-700 leading-relaxed">
                      {product.usage}
                    </p>

                    <p className="text-xs text-gray-500 mt-4 italic">
                      En cas de doute, demandez conseil à un professionnel.
                    </p>
                  </div>
                )}

              </div>
            </div>
          </div>

        </section>

        {/* ================= FOOTER SEO ================= */}
        <div className="mt-6 text-center text-gray-500 text-xs md:text-sm">
          <p className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <span>🌿 Produits 100% naturels</span>
            <span>✨ Certification bio</span>
            <span>🚚 Livraison rapide</span>
            <span>💚 Satisfaction garantie</span>
          </p>
        </div>
      </div>
    </main>
  );
}