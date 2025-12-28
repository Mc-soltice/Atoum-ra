"use client";

import { Logs, Search, ShoppingCart, UserRoundPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Recherche:", searchQuery);
  };

  return (
    <header
      className={`
        sticky top-0 z-50 w-full
        transition-all duration-300
        ${scrolled
          ? "bg-white/70 backdrop-blur-md shadow-sm"
          : "bg-white"}
      `}
    >
      <div className="container mx-auto flex items-center justify-between px-54 py-4 gap-4">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="relative h-10 w-32">
            <Image
              src="/images/Logo.png"
              alt="Atoum-ra Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Search (desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:block flex-1 max-w-lg"
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher des produits..."
              className="
                w-full px-4 py-2 pl-10 rounded-lg
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-black
                bg-white/90
              "
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </form>

        {/* Navigation desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className="nav-link">Accueil</Link>
          <Link href="/produits" className="nav-link">Produits</Link>
          <Link href="/promotions" className="nav-link">Promotions</Link>
        </nav>

        {/* Icônes */}
        <div className="flex items-center gap-5">
          <IconLink href="/panier">
            <ShoppingCart className="h-6 w-6" />
            <Badge>0</Badge>
          </IconLink>

          <IconLink href="/historique">
            <Logs className="h-6 w-6" />
            <Badge>0</Badge>
          </IconLink>

          <Link href="/login" className="icon-link">
            <UserRoundPlus className="h-6 w-6" />
          </Link>
        </div>
      </div>

      {/* Search mobile */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </form>
      </div>

      {/* Navigation mobile */}
      <nav className="md:hidden border-t">
        <div className="flex justify-around py-3 text-sm">
          <MobileLink href="/">Accueil</MobileLink>
          <MobileLink href="/produits">Produits</MobileLink>
          <MobileLink href="/promotions">Promos</MobileLink>
        </div>
      </nav>
    </header>
  );
}

/* ---------- Components utilitaires ---------- */

function IconLink({ href, children }: any) {
  return (
    <Link href={href} className="icon-link relative">
      {children}
    </Link>
  );
}

function Badge({ children }: any) {
  return (
    <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
      {children}
    </span>
  );
}

function MobileLink({ href, children }: any) {
  return (
    <Link
      href={href}
      className="text-gray-700 hover:text-black transition-colors"
    >
      {children}
    </Link>
  );
}
