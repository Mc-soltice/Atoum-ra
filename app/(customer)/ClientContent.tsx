'use client'
// Ce composant peut utiliser useState, useEffect, onClick, etc.
export default function ClientContent({
  children,
}: {
  children: React.ReactNode;
}) {
  // Toute votre logique client (state, effets) va ici
  return <>{children}</>;
}