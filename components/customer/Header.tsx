"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold">
          Atoum-ra
        </Link>

        <nav className="flex gap-6">
          <Link href="/produits">Produits</Link>
          <Link href="/promotions">Promotions</Link>
          <Link href="/panier">Panier</Link>
          <Link href="/login">Connexion</Link>
        </nav>
      </div>
    </header>
  );
}
