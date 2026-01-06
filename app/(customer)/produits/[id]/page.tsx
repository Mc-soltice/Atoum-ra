import Breadcrumbs, { BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { getProductById } from "@/lib/moks/mokProduct";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";

/**
 * Métadonnées dynamiques SEO
 */
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Produit non trouvé | Atoum-ra",
      description: "Produit non trouvé",
    };
  }

  return {
    title: `${product.name} | Atoum-ra`,
    description: product.description.substring(0, 160),
    openGraph: {
      title: `${product.name} | Atoum-ra`,
      description: product.description.substring(0, 160),
      type: "website",
      images: [product.image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Atoum-ra`,
      description: product.description.substring(0, 160),
      images: [product.image],
    },
  };
}

interface ProductDetailProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Page de détail d'un produit - Server Component
 */
export default async function ProductDetail({ params }: ProductDetailProps) {
  const { id } = await params;
  const product = await getProductById(id);

  // Gestion des erreurs 404
  if (!product) {
    notFound();
  }

  // Fil d'Ariane SEO
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Accueil", href: "/" },
    { label: "Produits", href: "/produits" },
    { label: product.name },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-6 md:px-6 max-w-6xl">
        {/* Fil d'Ariane */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Section principale */}
        <section className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
          {/* Grid responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Client Component pour les fonctionnalités interactives */}
            <ProductClient product={product} />
          </div>
        </section>

        {/* Footer SEO */}
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