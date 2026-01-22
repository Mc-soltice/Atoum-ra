"use client";

import { useCart } from "@/contexte/panier/CartContext"; // Importez le contexte
import { Logs, Search, ShoppingCart, User, UserRoundPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexte/AuthContext";
import UserAuthActions from "../customer/users/UserAuthActions";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Utilisez le contexte du panier
  const { getTotalItems } = useCart();

  // Obtenez le nombre réel d'articles dans le panier
  const cartItemCount = getTotalItems();

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const { user, loading } = useAuthContext();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Recherche:", searchQuery);
      // Navigation vers la page de recherche
      window.location.href = `/recherche?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/produits", label: "Produits" },
    { href: "/promotions", label: "Promotions", highlight: true },
    { href: "/about", label: "A Propos" },
  ];

  return (
    <header
      className={`
        sticky top-0 z-50 w-full
        transition-all duration-300 ease-in-out
        ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"}
      `}
    >
      {/* Top Bar */}
      <div className="container mx-auto px-50">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <div className="relative h-7 w-24 sm:h-8 sm:w-28 md:h-10 md:w-32">
              <Image
                src="/images/Logo.png"
                alt="Atoum-ra Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 96px, 128px"
              />
            </div>
          </Link>

          {/* Search Button Mobile */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-black 
                     hover:bg-gray-100 active:bg-gray-200 transition-colors"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            aria-label="Rechercher"
          >
            <Search size={20} />
          </button>

          {/* Search Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:block flex-1 max-w-xl mx-6"
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des produits..."
                className="
                  w-full px-4 py-2.5 pl-11 rounded-lg
                  border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
                  bg-gray-50 hover:bg-white transition-colors
                  text-sm
                "
                aria-label="Rechercher des produits"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                  aria-label="Effacer la recherche"
                >
                  ×
                </button>
              )}
            </div>
          </form>

          {/* Actions droite */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
            {/* Panier Desktop */}
            <IconLink
              href="/panier"
              badgeCount={cartItemCount}
              className="hidden xs:flex"
              aria-label={`Panier (${cartItemCount} article${cartItemCount !== 1 ? "s" : ""})`}
            >
              <ShoppingCart size={20} className="sm:w-5 sm:h-5" />
            </IconLink>

            <IconLink href="/historique" className="hidden sm:flex">
              <Logs size={20} className="sm:w-5 sm:h-5" />
            </IconLink>

            {/* Auth actions */}
            {!loading && (
              <>
                {!user ? (
                  /* ===== UTILISATEUR NON CONNECTÉ ===== */
                  <Link
                    href="/login"
                    className="
          hidden md:flex 
          items-center gap-2 p-2 rounded-md
          text-gray-700 hover:text-black 
          hover:bg-gray-100 active:bg-gray-200 
          transition-colors
        "
                    aria-label="Se connecter"
                  >
                    <UserRoundPlus size={20} className="sm:w-5 sm:h-5" />
                  </Link>
                ) : (
                  /* ===== UTILISATEUR CONNECTÉ ===== */
                  <>
                    {/* Version avec dropdown - Desktop */}
                    <div className="hidden md:block">
                      <UserAuthActions
                        className="p-2"
                        iconSize={20}
                        showText={false} // Changez à true si vous voulez voir le texte
                      />
                    </div>

                    {/* Version mobile - Icone seule */}
                    <div className="md:hidden">
                      <User className="p-2" />
                    </div>
                  </>
                )}
              </>
            )}

            {/* Panier Mobile (toujours visible) */}
            <IconLink
              href="/panier"
              badgeCount={cartItemCount}
              className="xs:hidden"
              aria-label={`Panier (${cartItemCount} article${cartItemCount !== 1 ? "s" : ""})`}
            >
              <ShoppingCart size={20} />
            </IconLink>
          </div>
        </div>

        {/* Search Mobile Expandable */}
        {(isSearchExpanded || searchQuery) && (
          <div className="md:hidden mb-3 animate-fade-in">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher produits..."
                className="
                  w-full px-4 py-3 pl-11 pr-10 rounded-lg
                  border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-black
                  bg-white
                  text-sm
                "
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                  aria-label="Effacer"
                >
                  ×
                </button>
              )}
            </form>
          </div>
        )}
      </div>

      {/* Navigation Desktop */}
      <nav className="hidden lg:block border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className=" flex items-center justify-center gap-6 py-2">
            {navItems.map((item) => (
              <MobileBadgeLink
                key={item.href}
                href={item.href}
                highlight={item.highlight}
              >
                {item.label}
              </MobileBadgeLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Navigation Mobile - Badges Horizontaux Scrollables */}
      <div className="lg:hidden border-t border-gray-100 relative">
        {/* Container des badges scrollable */}
        <div className="flex items-center gap-2 px-2 py-3 overflow-x-auto scrollbar-hide">
          <div className="min-w-2" />
          {navItems.map((item) => (
            <MobileBadgeLink
              key={item.href}
              href={item.href}
              highlight={item.highlight}
            >
              {item.label}
            </MobileBadgeLink>
          ))}

          <div className="min-w-2" />
        </div>
      </div>
    </header>
  );
}

/* ---------- Components utilitaires ---------- */

interface IconLinkProps {
  href: string;
  children: React.ReactNode;
  badgeCount?: number;
  className?: string;
  "aria-label"?: string;
}

function IconLink({
  href,
  children,
  badgeCount,
  className = "",
  "aria-label": ariaLabel,
}: IconLinkProps) {
  return (
    <Link
      href={href}
      className={`
        relative p-2 rounded-md 
        text-gray-700 hover:text-black 
        hover:bg-gray-100 active:bg-gray-200 
        transition-colors
        ${className}
      `}
      aria-label={ariaLabel || (href === "/panier" ? "Panier" : "Compte")}
    >
      {children}
      {badgeCount !== undefined && badgeCount > 0 && (
        <Badge count={badgeCount} />
      )}
    </Link>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <span
      className="
        absolute -top-1 -right-1 
        bg-linear-to-r from-orange-500 to-amber-500 text-white 
        text-xs font-bold 
        rounded-full h-5 w-5 
        flex items-center justify-center
        shadow-sm
        border border-white
      "
      aria-label={`${count} article${count !== 1 ? "s" : ""} dans le panier`}
    >
      {count > 9 ? "9+" : count}
    </span>
  );
}

interface MobileBadgeLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: string;
  highlight?: boolean;
}

function MobileBadgeLink({
  href,
  children,
  icon,
  highlight = false,
}: MobileBadgeLinkProps) {
  return (
    <Link
      href={href}
      className={`
        shrink-0
        inline-flex items-center gap-1.5
        px-3 py-1.5 rounded-full
        text-xs font-medium
        transition-all duration-200
        whitespace-nowrap
        ${
          highlight
            ? "bg-linear-to-r from-red-50 to-red-100 border border-red-200 text-red-700 hover:bg-red-100 hover:shadow-sm"
            : "bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
        }
        active:scale-95
      `}
    >
      {icon && <span className="text-sm">{icon}</span>}
      {children}
    </Link>
  );
}

// Style pour cacher la scrollbar
const styles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.2s ease-out;
  }
`;

// Ajout des styles au document
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
