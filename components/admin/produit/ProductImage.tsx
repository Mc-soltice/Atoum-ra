// components/admin/product/ProductImage.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  src: string | null | undefined;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function ProductImage({
  src,
  alt,
  width = 48,
  height = 48,
  className = "object-cover rounded",
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src || "/placeholder.jpg");
  const [hasError, setHasError] = useState(false);

  // Gérer les erreurs
  const handleError = () => {
    if (!hasError) {
      console.warn(`Image failed to load, using fallback: ${src}`);
      setImgSrc("/placeholder.jpg");
      setHasError(true);
    }
  };

  // Si aucune source
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={{ width, height }}
      >
        <span className="text-xs text-gray-500">No image</span>
      </div>
    );
  }

  // Déterminer si on doit utiliser unoptimized
  // Pour les images localhost en dev, c'est recommandé
  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  const isLocalhostImage =
    imgSrc.startsWith("http://localhost") ||
    imgSrc.startsWith("http://127.0.0.1");

  const shouldUseUnoptimized = isLocalhost && isLocalhostImage;

  return (
    <div className="relative" style={{ width, height }}>
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes={`${width}px`}
        className={className}
        unoptimized={shouldUseUnoptimized}
        onError={handleError}
        // Bonnes pratiques pour les images
        loading="lazy"
        quality={80}
      />
    </div>
  );
}
