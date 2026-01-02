"use client";

import CartSlider from "@/components/customer/productCategorie/CartSlider";
import { Product } from "@/types/product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CategoryBannerSkeleton from "./CategoryBannerSkeleton";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  category: string;
  products: Product[];
  modalId?: string;
}

export default function ProductCategoryRow({
  category,
  products,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [cardWidth, setCardWidth] = useState(298);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isCartSliderOpen, setIsCartSliderOpen] = useState(false);


  // S'assurer que le composant est monté côté client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Ajuster le nombre de cartes visibles selon la taille de l'écran
  useEffect(() => {
    if (!isMounted) return;

    const updateLayout = () => {
      let cards = 4;
      let width = 298;

      if (window.innerWidth < 640) {
        cards = 1;
        width = 298;
      } else if (window.innerWidth < 768) {
        cards = 2;
      } else if (window.innerWidth < 1024) {
        cards = 2;
      } else if (window.innerWidth < 1280) {
        cards = 3;
      } else {
        cards = 4;
      }

      setVisibleCards(cards);
      setCardWidth(width);
      setContainerWidth(cards * width);
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [isMounted]);

  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const scrollRight = () => {
    if (currentIndex < products.length - visibleCards) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  // Calculer translateX basé sur l'index courant
  const translateX = -currentIndex * cardWidth;

  // Calculer si nous pouvons défiler
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < products.length - visibleCards;

  // slide panier 
  const openCartSlider = () => {
    setIsCartSliderOpen(true);
  };

  const closeCartSlider = () => {
    setIsCartSliderOpen(false);
  };
  const router = useRouter();
  const url = "/produits";

  // Afficher le skeleton tant que le composant charge encore côté client
  if (!isMounted) {
    return (
      <div className="w-full py-8">
        {/* Skeleton bannière */}
        <CategoryBannerSkeleton />

        {/* Skeleton carousel */}
        <div className="relative px-12">
          <div
            className="relative overflow-hidden"
            style={{
              width: `${visibleCards * cardWidth}px`,
              margin: "0 auto",
              minHeight: "400px"
            }}
          >
            <div className="flex space-x-2">
              {Array.from({ length: visibleCards }).map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: "290px" }}
                >
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="w-full py-3">
      {/* Bannière de catégorie */}
      <div className="w-full bg-gradient-to-r from-[#F29820] to-[#F2B820] text-white flex items-center justify-between px-4 py-3 mb-6">
        <div className="flex items-center space-x-4">
          <div className="h-8 w-1 bg-white rounded-full"></div>
          <h2 className="text-2xl font-bold text-white">{category}</h2>
          <span className="text-sm text-white bg-orange-600 px-3 py-1 rounded-full">
            {products.length} produits
          </span>
        </div>

        <button onClick={() => router.push(url)}
          className="flex items-center space-x-2 text-white hover:text-gray-100 font-medium transition-colors"
        >
          <span>Voir tout</span>
          <ChevronRight className="h-4 w-4 animate-bounce-right" />
        </button>
      </div>


      {/* Conteneur principal avec navigation */}
      <div className="relative px-12">
        {/* Bouton gauche */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="
              absolute left-0 top-1/2 -translate-y-1/2
              z-10
              h-12 w-12
              rounded-full
              bg-white
              shadow-lg
              border border-gray-200
              flex items-center justify-center
              text-gray-700
              hover:bg-gray-50
              hover:shadow-xl
              hover:scale-110
              active:scale-95
              transition-all
              duration-300
              opacity-50
            "
            aria-label="Défiler vers la gauche"
          >
            <ChevronLeft className="h-10 w-10 animate-bounce-left" />
          </button>
        )}

        {/* Conteneur avec overflow masqué */}
        <div
          className="relative overflow-hidden"
          style={{
            width: `${containerWidth}px`,
            margin: '0 auto',
            minHeight: '400px'
          }}
        >
          {/* Conteneur des cartes avec animation translateX */}
          <div
            className="flex space-x-2 transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(${translateX}px)`,
              width: `${products.length * cardWidth}px`
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="
                  flex-shrink-0
                  transition-transform
                  duration-300
                  hover:scale-[1.02]
                "
                style={{ width: '290px' }}
              >
                <ProductCard
                  key={product.id}
                  product={product}
                  onCartClick={openCartSlider}
                />
              </div>
            ))}
          </div>

          {/* Overlay de flou pour indiquer qu'il y a plus de contenu */}
          {canScrollRight && (
            <div className="
              absolute right-0 top-0 bottom-0 
              w-10 bg-gradient-to-l from-white to-transparent
              pointer-events-none
              opacity-90
            "></div>
          )}
        </div>

        {/* Bouton droit */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="
              absolute right-0 top-1/2 -translate-y-1/2
              z-10
              h-12 w-12
              rounded-full
              bg-white
              shadow-lg
              border border-gray-200
              flex items-center justify-center
              text-gray-700
              hover:bg-gray-50
              hover:shadow-xl
              hover:scale-110
              active:scale-95
              transition-all
              duration-300
              opacity-50
            "
            aria-label="Défiler vers la droite"
          >
            <ChevronRight className="h-10 w-10 animate-bounce-right" />
          </button>
        )}
      </div>

      {/* Indicateurs de position */}
      {products.length > visibleCards && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: products.length - visibleCards + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                h-2 w-2
                rounded-full
                transition-all
                duration-300
                ${index === currentIndex
                  ? "w-6 bg-gradient-to-r from-[#BBCB64] to-[#A4BB64]"
                  : "bg-gray-300 hover:bg-gray-400"
                }
              `}
              aria-label={`Position ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* ================= SLIDER DU PANIER ================= */}
      <CartSlider
        isOpen={isCartSliderOpen}
        onClose={closeCartSlider}
      />
    </div>
  );
}