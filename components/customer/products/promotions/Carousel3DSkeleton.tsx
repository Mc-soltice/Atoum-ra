"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface CarouselSkeletonProps {
  count?: number;
  autoPlay?: boolean;
  interval?: number;
}

export default function Carousel3DSkeleton({
  count = 5,
  autoPlay = false,
  interval = 3000,
}: CarouselSkeletonProps) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1024);

  const handlePrevious = useCallback(() => {
    setActive((prev) => (prev === 0 ? count - 1 : prev - 1));
  }, [count]);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev === count - 1 ? 0 : prev + 1));
  }, [count]);

  // AutoPlay
  useEffect(() => {
    if (!autoPlay || isPaused) return;
    const timer = setInterval(handleNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, handleNext, interval, isPaused]);

  // Listener resize
  useEffect(() => {
    const resizeListener = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  // Sizes responsive
  const getCardSize = () => {
    if (windowWidth < 768) return { width: 220, height: 320, scale: 0.85 };
    if (windowWidth < 1024) return { width: 260, height: 380, scale: 0.95 };
    return { width: 300, height: 420, scale: 1 };
  };

  const { width: cardWidth, height: cardHeight, scale: cardScale } = getCardSize();

  return (
    <div className="w-[90vw] md:w-[72vw] h-[65vh] md:h-[70vh] bg-white rounded-2xl shadow-2xl overflow-hidden px-2 py-1 md:px-8 flex flex-col">
      {/* Titre */}
      <div className="text-center shrink-0 mb-2 md:mb-4">
        <div className={`h-8 md:h-10 w-1/3 md:w-1/4 bg-gray-300 rounded mx-auto animate-pulse`} />
        <div className="mt-2 h-4 md:h-5 w-1/2 md:w-1/3 bg-gray-300 rounded mx-auto animate-pulse" />
      </div>

      {/* Carousel */}
      <div className="relative flex-1 min-h-0">
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden"
          style={{ perspective: "800px" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation */}
          <button
            onClick={handlePrevious}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-gray-300 opacity-70"
          >
            <ChevronLeft className="w-6 h-6 md:w-6 md:h-6 text-white" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-gray-300 opacity-70"
          >
            <ChevronRight className="w-6 h-6 md:w-6 md:h-6 text-white" />
          </button>

          {/* Cartes skeleton */}
          <div className="w-full h-full flex items-center justify-center">
            {Array.from({ length: count }).map((_, index) => {
              const offset = active - index;
              const absOffset = Math.abs(offset);
              const direction = Math.sign(offset);
              const isActive = index === active;

              return (
                <div
                  key={index}
                  className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `
                      rotateY(${offset * 20}deg)
                      scale(${cardScale - absOffset * 0.15})
                      translateZ(${absOffset * -90}px)
                      translateX(${direction * -60}px)
                    `,
                    opacity: absOffset > 3 ? 0 : 1 - absOffset * 0.35,
                    filter: `blur(${absOffset * 5}px)`,
                    zIndex: count - absOffset,
                    pointerEvents: isActive ? "auto" : "none",
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                  }}
                >
                  {/* Skeleton card */}
                  <div className="w-full h-full rounded-xl bg-gray-200/50 animate-pulse flex flex-col overflow-hidden">
                    {/* Image */}
                    <div className="h-[60%] w-full bg-gray-300 rounded-xl"></div>

                    {/* Contenu */}
                    <div className="flex flex-col flex-1 min-h-0 p-4 md:p-5">
                      <div className="h-5 w-3/4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 w-full bg-gray-300 rounded mb-1"></div>
                      <div className="h-4 w-5/6 bg-gray-300 rounded mb-3"></div>
                      <div className="h-5 w-1/2 bg-gray-300 rounded mb-3"></div>
                      <div className="mt-auto h-10 w-full bg-gray-300 rounded-xl flex items-center justify-center gap-2"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bandeau bas */}
      <div className="mt-1 pt-1 border-t border-gray-200 flex justify-between items-center px-3">
        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="h-5 w-24 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
  );
}
