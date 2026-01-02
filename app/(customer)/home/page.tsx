
import Hero from "@/components/customer/Hero";
import ProductGrid from "@/components/customer/products/ProductGrid";
import Carousel3D from "@/components/customer/PromoCarousel";
import { PromoProducts } from "@/lib/moks/mockPromo";



export default function Home() {
  return (
    <div className=" flex flex-col items-center justify-center gap-3.5 lg:px-50" >

      {/* HERO */}
      <section className="m-[3vh] ">
        <Hero />
      </section>

      {/* CAROUSEL DE PROMO  */}
      <section className="my-[8vh] ">
        <Carousel3D
          products={PromoProducts}
          autoPlay
          interval={4000}
        />
      </section>

      {/* TABLEAU DE PRODUITS */}
      <section className="">
        <ProductGrid />
      </section>

    </div>
  );
}
