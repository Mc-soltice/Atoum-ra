// components/Carousel3D.tsx
"use client";

import { ProductPromo } from "@/types/product";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import Carousel3DSkeleton from "./products/promotions/Carousel3DSkeleton";
import PromoCard from "./products/promotions/PromoCard";

interface CarouselProps {
  products: ProductPromo[];
  autoPlay?: boolean;
  interval?: number;
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Carousel3D({ products, autoPlay = false, interval = 3000 }: CarouselProps) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isBlinking, setIsBlinking] = useState(true);

  const handlePrevious = useCallback(() => {
    setActive(prev => (prev === 0 ? products.length - 1 : prev - 1));
  }, [products.length]);

  const handleNext = useCallback(() => {
    setActive(prev => (prev === products.length - 1 ? 0 : prev + 1));
  }, [products.length]);

  useEffect(() => {
    if (!autoPlay || isPaused) return;
    const timer = setInterval(handleNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, handleNext, interval, isPaused]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevious, handleNext]);

  // Animation de clignotement pour le titre
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 600); // Clignote toutes les 600ms

    return () => clearInterval(blinkInterval);
  }, []);

  return (

    <div className="w-[72vw] h-[70vh] bg-white rounded-2xl shadow-2xl overflow-hidden px-2 py-1 md:px-8  flex flex-col">

      {/* Titre PROMOTION ! qui clignote - Taille réduite */}
      <div className="text-center shrink-0">

        <h1 className="
          relative
          text-2xl md:text-4xl font-black tracking-wider
          bg-gradient-to-r from-red-600 via-red-500 to-red-600
          bg-clip-text text-transparent
          drop-shadow-lg
        ">
          PROMOTION !
          <span
            aria-hidden
            className="
              pointer-events-none
              absolute inset-0
              bg-gradient-to-r from-transparent via-white/40 to-transparent
              animate-shine
            "/>
        </h1>

        <p className="text-gray-600 text-sm md:text-base font-medium">
          Découvrez nos offres spéciales à prix réduits
        </p>
        <div className="flex items-center justify-center mt-1">
          <div className="w-8 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
          <div className="mx-2">
            <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-bold">
              {products.length} OFFRE{products.length > 1 ? 'S' : ''}
            </span>
          </div>
          <div className="w-8 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
        </div>
      </div>

      {/* Contenu du carousel */}
      <div className="relative flex-1 min-h-0">
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden"
          style={{ perspective: '800px' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation - Position optimisée */}
          <button
            onClick={handlePrevious}
            className={cn(
              "absolute  opacity-70 md:left-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 border-2 border-white text-white hover:from-red-600 hover:to-orange-600 transition-all duration-300 shadow-lg",
              active === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
            )}
            aria-label="Produit précédent"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            <ChevronLeft className="w-10 h-10 md:w-6 md:h-6 animate-bounce-left" />
          </button>

          <button
            onClick={handleNext}
            className={cn(
              "absolute opacity-70 right-250 md:right-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 border-2 border-white text-white hover:from-red-600 hover:to-orange-600 transition-all duration-300 shadow-lg",
              active === products.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
            )}
            aria-label="Produit suivant"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            <ChevronRight className="w-10 h-10 md:w-6 md:h-6 animate-bounce-right" />
          </button>

          {/* Dots améliorés - Position optimisée */}
          <div className="absolute bottom-2 md:bottom-1 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={cn(
                  "rounded-full transition-all duration-300 shadow-sm",
                  index === active
                    ? "w-6 h-1.5 bg-gradient-to-r from-red-500 to-orange-500"
                    : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Aller au produit ${index + 1}`}
              />
            ))}
          </div>

          {/* Indicateur de position - Taille réduite */}
          <div className="absolute top-1 md:top-2 right-1 md:right-2 z-30">
            <div className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-md">
              <span className="text-xs font-bold text-gray-800">
                <span className="text-red-600">{active + 1}</span> / {products.length}
              </span>
            </div>
          </div>

          {/* Cartes des produits - Échelle réduite */}
          <div className="w-full h-full flex items-center justify-center">
            {products && products.length > 0
              ? products.map((product, index) => {
                const offset = active - index;
                const absOffset = Math.abs(offset);
                const direction = Math.sign(offset);
                const isActive = index === active;

                return (
                  <div
                    key={product.id}
                    className="absolute inset-0 w-full h-full transition-all duration-500 ease-out flex items-center justify-center"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `
                      rotateY(${offset * 20}deg)
                      scale(${1 - absOffset * 0.25})
                      translateZ(${absOffset * -150}px)
                      translateX(${direction * -80}px)
                    `,
                      opacity: absOffset > 3 ? 0 : 1 - absOffset * 0.35,
                      filter: `blur(${absOffset * 5}px)`,
                      zIndex: products.length - absOffset,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    {/* Utilisation du PromoCard - Échelle réduite */}
                    <div className="scale-100 md:scale-110 transform-gpu">
                      <PromoCard
                        product={product}
                        modalId={`product-modal-${product.id}`}
                      />
                    </div>
                  </div>
                );
              }) : // Si pas de produits, afficher skeletons
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-500 ease-out"
                  style={{ transform: "scale(1)" }}
                >
                  <Carousel3DSkeleton />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Bandeau promotionnel en bas - Taille réduite */}
      <div className="mt-1 pt-1 border-t border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 text-xs md:text-sm">
              Offres valables jusqu&apos;à épuisement des stocks
            </span>
          </div>
          <div className="flex items-center">
            <span className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs font-bold border border-red-200">
              🔥 PROMOS 🔥
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}