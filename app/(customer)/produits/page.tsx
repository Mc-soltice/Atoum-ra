import ProductCard from "@/components/customer/ProductCard";
import { mockProducts } from "@/lib/moks/mokProduct";

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
