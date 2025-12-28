'use client';
import { mockProducts } from "@/lib/moks/mokProduct";
import ProductCategoryRow from "./ProductCategoryRow";

export default function ProductGrid() {
  const categories = Array.from(new Set(mockProducts.map(p => p.category)));

  return (
    <div className="space-y-2">
      {categories.map(category => (
        <ProductCategoryRow
          key={category}
          category={category}
          products={mockProducts.filter(p => p.category === category)}
        />
      ))}
    </div>
  );
}