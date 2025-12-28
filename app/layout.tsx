// app/layout.tsx
"use client"; // On doit passer en client component

import { useEffect } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Supprime l'attribut ajouté par les extensions navigateur
    document.body.removeAttribute("cz-shortcut-listen");
  }, []);

  return (
    <html lang="fr">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}