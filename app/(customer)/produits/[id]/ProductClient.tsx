// app/products/[id]/ProductClient.tsx
'use client';

import { Product } from '@/types/product';
import { Headset, Share2, ShieldCheck, TruckElectric } from 'lucide-react';
import { useState } from 'react';

interface ProductClientProps {
  product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
  const [showShareSuccess, setShowShareSuccess] = useState(false);

  // ================= FONCTION DE PARTAGE =================
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Découvrez ${product.name} sur Atoum-ra, nos produits naturels authentiques`,
          url: window.location.href,
        });
      } catch (error) {
        // L'utilisateur a annulé le partage
      }
    } else {
      // Fallback: copier dans le presse-papier
      navigator.clipboard.writeText(window.location.href);
      setShowShareSuccess(true);
      setTimeout(() => setShowShareSuccess(false), 3000);
    }
  };

  // ================= FONCTION AJOUT PANIER =================
  const handleAddToCart = () => {
    // Logique d'ajout au panier
    console.log('Ajout au panier:', product);
    // Ici vous intégrerez votre state management (Redux, Context, etc.)
  };

  return (
    <>
      {/* ================= SECTION GALERIE IMAGE ================= */}
      <div>
        <div className="grid grid-cols-3 grid-rows-3 gap-4 mb-6">
          {/* Image principale */}
          <div className="col-span-1 row-span-3 relative bg-base-200 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-base-content/50">Image principale</span>
            </div>
          </div>

          {/* Image secondaire */}
          <div className="col-span-2 row-span-2 relative bg-base-100 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-base-content/50">Image secondaire</span>
            </div>
          </div>

          {/* Autre image */}
          <div className="col-span-2 relative bg-base-50 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-base-content/50">Autre image</span>
            </div>
          </div>
        </div>

        {/* Bouton de partage avec feedback */}
        <button
          onClick={handleShare}
          className="btn btn-outline btn-primary w-full relative"
          aria-label="Partager ce produit"
        >
          <Share2 className="mr-2" />
          Partager ce produit
          {showShareSuccess && (
            <span className="absolute -top-2 -right-2 badge badge-success text-xs">
              Lien copié !
            </span>
          )}
        </button>
      </div>

      {/* ================= SECTION INFORMATIONS PRODUIT ================= */}
      <div className="space-y-6">
        {/* En-tête produit */}
        <header itemScope itemType="https://schema.org/Product">
          <div className="badge badge-primary mb-2">
            {product.category}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-3" itemProp="name">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-bold text-primary" itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <span itemProp="priceCurrency" content="EUR">€</span>
              <span itemProp="price" content={product.price.toString()}>
                {product.price.toFixed(2)}
              </span>
            </span>

            {product.stock > 0 ? (
              <span className="badge badge-success">
                {product.stock > 10 ? 'En stock' : `Plus que ${product.stock} unités`}
              </span>
            ) : (
              <span className="badge badge-error">Rupture de stock</span>
            )}
          </div>
        </header>

        {/* Description produit */}
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-3">Description</h2>
          <p className="text-base-content/80 leading-relaxed" itemProp="description">
            {product.description}
          </p>
        </div>

        {/* Ingrédients */}
        {product.ingredients && product.ingredients.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Ingrédients</h2>
            <ul className="space-y-2">
              {product.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bienfaits */}
        {product.benefits && product.benefits.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Bienfaits</h2>
            <ul className="space-y-2">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="bg-base-200 p-3 rounded-lg">
                  <strong className="text-primary">✓</strong> {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Mode d'emploi */}
        {product.usage && (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Mode d&apos;emploi</h2>
            <p className="text-base-content/80">{product.usage}</p>
          </div>
        )}

        {/* Bouton d'ajout au panier */}
        <div className="pt-6">
          <button
            onClick={handleAddToCart}
            className="btn btn-primary btn-lg w-full"
            disabled={product.stock === 0}
            aria-label={`Ajouter ${product.name} au panier`}
          >
            {product.stock > 0 ? 'Ajouter au panier' : 'Produit indisponible'}
          </button>
        </div>
      </div>

      {/* ================= SECTION GARANTIES ================= */}
      <div className="mt-12 pt-8 border-t">
        <div className="flex w-full flex-col lg:flex-row">
          {/* Paiement sécurisé */}
          <div className="card bg-base-200 rounded-box grid h-32 grow place-items-center">
            <div className="text-center p-4">
              <ShieldCheck className="text-3xl text-primary mx-auto mb-3" />
              <h3 className="font-bold mb-1">PAIEMENT SÉCURISÉ</h3>
              <p className="text-sm text-base-content/70">
                Transactions cryptées SSL pour une protection maximale
              </p>
            </div>
          </div>

          <div className="divider lg:divider-horizontal">+</div>

          {/* Livraison rapide */}
          <div className="card bg-base-200 rounded-box grid h-32 grow place-items-center">
            <div className="text-center p-4">
              <TruckElectric className="text-3xl text-primary mx-auto mb-3" />
              <h3 className="font-bold mb-1">LIVRAISON RAPIDE</h3>
              <p className="text-sm text-base-content/70">
                Expédition sous 24h et suivi en temps réel
              </p>
            </div>
          </div>

          <div className="divider lg:divider-horizontal">+</div>

          {/* Service après-vente */}
          <div className="card bg-base-200 rounded-box grid h-32 grow place-items-center">
            <div className="text-center p-4">
              <Headset className="text-3xl text-primary mx-auto mb-3" />
              <h3 className="font-bold mb-1">SERVICE APRÈS-VENTE</h3>
              <p className="text-sm text-base-content/70">
                Assistance 7j/7 et satisfaction garantie
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Micro-données pour SEO */}
      <div className="sr-only" aria-hidden="true">
        <span itemProp="brand" itemScope itemType="https://schema.org/Brand">
          <span itemProp="name">Atoum-ra</span>
        </span>
        <span itemProp="sku">{product.id}</span>
        <span itemProp="availability" content={product.stock > 0 ? "InStock" : "OutOfStock"}>
          {product.stock > 0 ? 'Disponible' : 'Indisponible'}
        </span>
      </div>
    </>
  );
}