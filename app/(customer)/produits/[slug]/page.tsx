import { mockProducts } from "@/lib/moks/mokProduct";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const product = mockProducts.find(p => p.id === params.slug); // si tu veux utiliser id comme identifiant réel
  if (!product) return { title: "Produit non trouvé" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductPage({ params }: Props) {
  const product = mockProducts.find(p => p.id === params.slug); // idem
  if (!product) return notFound();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img src={product.image} alt={product.name} className="mb-4" />
      <p className="mb-4">{product.description}</p>
    </div>
  );
}
