"use client";

import { CartProvider, CartToaster } from "@/contexte/panier/CartContext";
import Footer from "../customer/Footer";
import Header from "../customer/Header";



export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <CartToaster />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </CartProvider>
  );
}
