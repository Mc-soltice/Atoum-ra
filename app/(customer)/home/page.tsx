import Hero from "@/components/customer/Hero";
import ProductGrid from "@/components/customer/products/ProductGrid";
import Carousel3D from "@/components/customer/PromoCarousel";
import { PromoProducts } from "@/lib/moks/mockPromo";

export default function Home() {
  return (
    <main className="w-full flex justify-center px-4">
      {/* COLONNE MAÎTRESSE */}
      <div className="w-full max-w-7xl flex flex-col gap-15">

        {/* HERO */}
        <section className="w-full mt-2">
          <Hero />
        </section>

        {/* CAROUSEL PROMO */}
        <section className="w-full">
          <Carousel3D
            products={PromoProducts}
            autoPlay
            interval={4000}
          />
        </section>

        {/* PRODUITS */}
        <section className="w-full">
          <ProductGrid />
        </section>
      </div>
    </main>
  );
}
