"use client";

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, X } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Palette de couleurs ambrées douces
const amberGradients = [
  'from-amber-600/90 to-amber-800/90',
  'from-amber-700/90 to-amber-900/90',
  'from-orange-600/90 to-amber-800/90',
  'from-amber-600/90 to-orange-700/90',
  'from-yellow-700/90 to-amber-800/90',
  'from-[#6ABF05] to-[#FF7F00]'
];

const Footer = () => {
  const [currentGradient, setCurrentGradient] = useState(amberGradients[5]);

  // Animation de gradient en rotation (optionnel)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const interval = setInterval(() => {
        setCurrentGradient(prev => {
          const currentIndex = amberGradients.indexOf(prev);
          const nextIndex = (currentIndex + 1) % amberGradients.length;
          return amberGradients[nextIndex];
        });
      }, 8000);

      return () => clearInterval(interval);
    }
  }, []);

  const contactInfo = {
    address: "Akwa Nord à côté de Santa Lucia, Douala, Cameroon",
    phone: "+237 691 814 168",
    email: "sales@royalluxmeuble.com",
    social: {
      facebook: "https://www.facebook.com/profile.php?id=61576672472086",
      twitter: "https://x.com/UmbrellaINDUS_S",
      instagram: "https://instagram.com",
      linkedin: "https://www.linkedin.com/in/umbrella-industrial-services-979046366",
    }
  };

  const quickLinks = [
    { label: "Accueil", href: "/" },
    { label: "Nos Services", href: "/#services" },
    { label: "À Propos", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  const engagements = [
    {
      title: "100% naturel et biologique",
      description: "Certifié sans produits chimiques",
    },
    {
      title: "Sans conservateurs chimiques",
      description: "Conservation naturelle uniquement",
    },
    {
      title: "Production éthique et durable",
      description: "Respect des producteurs et de l'environnement",
    },
    {
      title: "Livraison rapide et gratuite",
      description: "À partir de 50€ d'achat",
    },
  ];

  return (
    <footer
      className={`bg-gradient-to-r ${currentGradient} text-amber-50 transition-all duration-1000`}
      role="contentinfo"
      aria-label="Pied de page"
    >
      <div className="px-4 pt-12 pb-8 md:pt-16 md:pb-10">
        <div className="max-w-7xl mx-auto">
          {/* Grille principale */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">

            {/* Informations de l'entreprise - Pleine largeur sur mobile */}
            <div className="space-y-6 lg:col-span-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="/images/Logo.png"
                    alt="Logo Atoum-ra - Solutions professionnelles en bois"
                    fill
                    className="object-cover"
                    priority={false}
                    loading="lazy"
                    sizes="(max-width: 640px) 64px, 80px"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-2xl sm:text-3xl text-amber-50">
                    Atoum-ra
                  </span>
                  <span className="text-sm sm:text-base text-amber-100/80 mt-1">
                    Excellence en bois
                  </span>
                </div>
              </div>

              <p className="text-amber-100/80 leading-relaxed text-sm sm:text-base">
                Solutions professionnelles de transformation et construction en bois
                pour des espaces impeccables et performants.
              </p>

              <div className="flex space-x-3 pt-2">
                <SocialLink
                  href={contactInfo.social.facebook}
                  label="Visitez notre page Facebook"
                  aria-label="Facebook"
                >
                  <Facebook size={18} className="sm:w-5 sm:h-5" />
                </SocialLink>
                <SocialLink
                  href={contactInfo.social.twitter}
                  label="Suivez-nous sur X (Twitter)"
                  aria-label="X (Twitter)"
                >
                  <X size={18} className="sm:w-5 sm:h-5" />
                </SocialLink>
                <SocialLink
                  href={contactInfo.social.instagram}
                  label="Suivez-nous sur Instagram"
                  aria-label="Instagram"
                >
                  <Instagram size={18} className="sm:w-5 sm:h-5" />
                </SocialLink>
                <SocialLink
                  href={contactInfo.social.linkedin}
                  label="Connectez-vous avec nous sur LinkedIn"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} className="sm:w-5 sm:h-5" />
                </SocialLink>
              </div>
            </div>

            {/* Liens rapides - Colonne 2 sur desktop */}
            <div className="lg:col-span-1">
              <FooterSectionTitle>
                Navigation
              </FooterSectionTitle>
              <ul className="space-y-3 sm:space-y-4" role="list">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <QuickLink href={link.href}>
                      {link.label}
                    </QuickLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Engagements - Colonne 3 sur desktop */}
            <div className="lg:col-span-1">
              <FooterSectionTitle>
                Nos Engagements
              </FooterSectionTitle>
              <ul className="space-y-4 sm:space-y-5" role="list">
                {engagements.map((engagement, index) => (
                  <li key={index}>
                    <EngagementItem
                      title={engagement.title}
                      description={engagement.description}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Informations de contact - Colonne 4 sur desktop */}
            <div className="lg:col-span-1">
              <FooterSectionTitle>
                Contactez-nous
              </FooterSectionTitle>
              <ul className="space-y-5 sm:space-y-6" role="list">
                <ContactItem
                  icon={<MapPin size={18} className="sm:w-5 sm:h-5" />}
                  aria-label="Adresse"
                >
                  <address className="not-italic text-amber-100/80 leading-relaxed text-sm sm:text-base">
                    {contactInfo.address}
                    <br />
                    <span className="text-white font-medium">Logpom</span>
                  </address>
                </ContactItem>

                <ContactItem
                  icon={<Phone size={18} className="sm:w-5 sm:h-5" />}
                  aria-label="Téléphone"
                >
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                    className="text-amber-100/80 hover:text-amber-50 transition-colors text-sm sm:text-base"
                  >
                    {contactInfo.phone}
                  </a>
                </ContactItem>

                <ContactItem
                  icon={<Mail size={18} className="sm:w-5 sm:h-5" />}
                  aria-label="Email"
                >
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-amber-100/80 hover:text-amber-50 transition-colors break-all text-sm sm:text-base"
                  >
                    {contactInfo.email}
                  </a>
                </ContactItem>
              </ul>
            </div>
          </div>

          {/* Séparateur et copyright */}
          <div className="border-t border-amber-400/20 mt-10 pt-8 md:mt-16 md:pt-10">
            {/* Copyright */}
            <p className="text-amber-100/70 text-sm text-center mb-6 md:mb-8">
              © {new Date().getFullYear()}{' '}
              <span className="font-semibold text-amber-50">Atoum-ra</span>
              . Tous droits réservés.
            </p>

            {/* Liens légaux - Empilés sur mobile, en ligne sur desktop */}
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-8 text-xs text-amber-100/60">
              <LegalLink href="/mentions-legales">
                Mentions légales
              </LegalLink>
              <LegalLink href="/politique-confidentialite">
                Politique de confidentialité
              </LegalLink>
              <LegalLink href="/cgu">
                Conditions générales
              </LegalLink>
            </div>

            {/* Retour en haut (mobile seulement) */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="md:hidden mt-8 mx-auto flex items-center justify-center w-10 h-10 rounded-full bg-amber-600/30 hover:bg-amber-600/50 transition-colors"
              aria-label="Retour en haut de la page"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Composants réutilisables
function FooterSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-semibold mb-5 pb-2 text-amber-50 border-b border-amber-400/30 sm:mb-6 sm:text-xl">
      {children}
    </h3>
  );
}

function SocialLink({
  href,
  label,
  ariaLabel,
  children
}: {
  href: string;
  label: string;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      aria-label={ariaLabel}
      title={label}
      className="text-amber-100/80 hover:text-amber-50 transition-all duration-300 p-2 hover:bg-amber-700/30 rounded-full active:scale-95"
    >
      {children}
    </a>
  );
}

function QuickLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group text-amber-100/80 hover:text-amber-50 transition-all duration-300 block"
    >
      <span className="inline-block group-hover:translate-x-2 transition-transform duration-300">
        → {children}
      </span>
    </Link>
  );
}

function EngagementItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="group flex items-start text-amber-100/80 hover:text-amber-50 transition-colors duration-300">
      <span className="mr-3 text-emerald-500 text-xl flex-shrink-0 mt-0.5">
        ✓
      </span>
      <div className="transition-all duration-300 group-hover:translate-x-1">
        <span className="font-medium text-white block text-sm sm:text-base">
          {title}
        </span>
        <p className="text-xs sm:text-sm text-amber-100/80 mt-0.5">
          {description}
        </p>
      </div>
    </div>
  );
}

function ContactItem({ icon, children, ariaLabel }: {
  icon: React.ReactNode;
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <li className="flex items-start" aria-label={ariaLabel}>
      <span className="text-amber-300 mr-3 mt-0.5 flex-shrink-0">
        {icon}
      </span>
      <div className="flex-1">
        {children}
      </div>
    </li>
  );
}

function LegalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="hover:text-amber-50 transition-colors duration-300 text-center sm:text-left"
    >
      {children}
    </Link>
  );
}

export default Footer;