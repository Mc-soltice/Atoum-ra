'use client';
import { mockProducts } from "@/lib/moks/mokProduct";
import ProductCategoryRow from "./ProductCategoryRow";

export default function ProductGrid() {
  const categories = Array.from(new Set(mockProducts.map(p => p.category)));

  // Optionnel : Ouvrir le slider pour tous les produits
  const handleCartSliderOpen = () => {
    // Vous pourriez ici dispatcher une action Redux, 
    // mettre à jour un contexte, etc.
    console.log("Ouvrir le panier");
  };

  return (
    <div className="space-y-5 md:space-y-12 lg:space-y-16">
      {categories.map(category => {
        const categoryProducts = mockProducts.filter(p => p.category === category);
        if (categoryProducts.length === 0) return null;

        return (
          <ProductCategoryRow
            key={category}
            category={category}
            products={categoryProducts}
            onCartSliderOpen={handleCartSliderOpen}
          />
        );
      })}
    </div>
  );
}