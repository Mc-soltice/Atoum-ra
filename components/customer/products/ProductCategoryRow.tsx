"use client";

import { Product } from "@/types/product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";

interface Props {
  title: string;
  categoryDescription?: string;
  products: Product[];
  onCartClick?: () => void;
  showViewAll?: boolean;
  viewAllUrl?: string;
}

export default function CategorieRow({
  title,
  categoryDescription,
  products,
  onCartClick,
  showViewAll = true,
  viewAllUrl = "/produits",
}: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(5);
  const [isMounted, setIsMounted] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const router = useRouter();

  // S'assurer que le composant est monté côté client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Ajuster le nombre de cartes visibles selon la taille de l'écran
  const updateLayout = () => {
    if (typeof window === "undefined") return;

    let cards = 5;
    let width = 290;

    if (window.innerWidth < 640) {
      cards = 2;
      width = window.innerWidth * 0.45;
    } else if (window.innerWidth < 768) {
      cards = 2;
      width = window.innerWidth * 0.45;
    } else if (window.innerWidth < 1024) {
      cards = 4;
      width = window.innerWidth * 0.23;
    } else {
      cards = 5;
      width = window.innerWidth * 0.18;
    }

    setVisibleCards(cards);
    setCardWidth(width);
  };

  useEffect(() => {
    if (!isMounted) return;

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [isMounted]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current || cardWidth === 0) return;

    const container = scrollContainerRef.current;
    const maxIndex = Math.max(0, products.length - visibleCards);
    const scrollAmount = cardWidth;

    if (direction === "left") {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
      container.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    } else {
      setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < products.length - visibleCards;
  const totalPages = Math.max(1, products.length - visibleCards + 1);

  if (!isMounted) {
    return (
      <div className="w-full py-6 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6" />
            <div className="flex gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex-1 h-64 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full py-6 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Bannière de catégorie */}
        <div className="w-full bg-gradient-to-r from-[#F29820] to-[#F2B820] text-white flex items-center justify-between px-4 py-3 mb-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-1 bg-white rounded-full" />
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {title}
              </h2>
              {products.length > 0 && (
                <span className="text-sm text-white bg-orange-600 px-3 py-1 rounded-full mt-1 md:mt-0">
                  {products.length} produits
                </span>
              )}
            </div>
          </div>

          {showViewAll && (
            <button
              onClick={() => router.push(viewAllUrl)}
              className="flex items-center space-x-2 text-white hover:text-gray-100 font-medium transition-colors group"
            >
              <span className="text-sm md:text-base">Voir tout</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {categoryDescription && (
          <p className="text-sm text-gray-600 max-w-3xl mb-6 px-2">
            {categoryDescription}
          </p>
        )}

        {/* Conteneur avec navigation */}
        <div className="relative">
          {/* Bouton gauche */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 -ml-4 md:-ml-6"
              aria-label="Défiler vers la gauche"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          )}

          {/* Conteneur défilant */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-3 md:gap-4 py-2 px-1 scroll-smooth snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {products.map((product) => {
              // Calcul de la largeur responsive
              let widthClass = "";
              if (visibleCards === 2) {
                widthClass = "w-[calc(50%-8px)] min-w-[calc(50%-8px)]";
              } else if (visibleCards === 4) {
                widthClass = "w-[calc(25%-12px)] min-w-[calc(25%-12px)]";
              } else {
                widthClass = "w-[calc(20%-12px)] min-w-[calc(20%-12px)]";
              }

              return (
                <div
                  key={product.id}
                  className={`snap-start ${widthClass}`}
                >
                  <ProductCard product={product} onCartClick={onCartClick} />
                </div>
              );
            })}
          </div>

          {/* Bouton droit */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 -mr-4 md:-mr-6"
              aria-label="Défiler vers la droite"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          )}

          {/* Overlay de flou */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          )}
        </div>

        {/* Indicateurs de position */}
        {products.length > visibleCards && (
          <div className="flex justify-center space-x-2 mt-6">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({
                      left: index * cardWidth,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                    ? "w-6 bg-gradient-to-r from-[#F29820] to-[#F2B820]"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                aria-label={`Position ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}