import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, X } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
// Palette de couleurs ambrées douces
const amberGradients = [
  'from-amber-600/90 to-amber-800/90',
  'from-amber-700/90 to-amber-900/90',
  'from-orange-600/90 to-amber-800/90',
  'from-amber-600/90 to-orange-700/90',
  'from-yellow-700/90 to-amber-800/90',
];

// Version serveur avec gradient statique pour meilleures performances
const Footer = () => {
  const currentGradient = amberGradients[0]; // Gradient fixe pour le rendu SSR

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
      className={`bg-gradient-to-r ${currentGradient} text-amber-50 pt-16 pb-8 px-50 transition-colors duration-1000`}
      role="contentinfo"
      aria-label="Pied de page"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Informations de l'entreprise */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Image
                src="/images/Logo.png"
                alt="Logo Atoum-ra - Solutions professionnelles en bois"
                width={60}
                height={60}
                className="rounded-full object-cover"
                priority={false}
                loading="lazy"
              />
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-amber-50">
                  Atoum-ra
                </span>
                <span className="text-sm text-amber-100/80">
                  Excellence en bois
                </span>
              </div>
            </div>

            <p className="text-amber-100/80 leading-relaxed">
              Solutions professionnelles de transformation et construction en bois
              pour des espaces impeccables et performants.
            </p>

            <div className="flex space-x-4">
              <a
                href={contactInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="Visitez notre page Facebook"
                className="text-amber-100/80 hover:text-amber-50 transition-colors p-2 hover:bg-amber-700/30 rounded-full"
              >
                <Facebook size={20} aria-hidden="true" />
              </a>
              <a
                href={contactInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="Suivez-nous sur X (Twitter)"
                className="text-amber-100/80 hover:text-amber-50 transition-colors p-2 hover:bg-amber-700/30 rounded-full"
              >
                <X size={20} aria-hidden="true" />
              </a>
              <a
                href={contactInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="Suivez-nous sur Instagram"
                className="text-amber-100/80 hover:text-amber-50 transition-colors p-2 hover:bg-amber-700/30 rounded-full"
              >
                <Instagram size={20} aria-hidden="true" />
              </a>
              <a
                href={contactInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="Connectez-vous avec nous sur LinkedIn"
                className="text-amber-100/80 hover:text-amber-50 transition-colors p-2 hover:bg-amber-700/30 rounded-full"
              >
                <Linkedin size={20} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 text-amber-50 border-b border-amber-400/30">
              Navigation
            </h3>
            <ul className="space-y-3" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-amber-100/80 hover:text-amber-50 transition-colors duration-300 block group"
                  >
                    <span className="group-hover:pl-2 transition-all duration-300 inline-block">

                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Engagements */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 text-amber-50 border-b border-amber-400/30">
              Nos Engagements
            </h3>

            <ul className="space-y-3" role="list">
              {engagements.map((engagement, index) => (
                <li key={index}>
                  <div className="group flex items-start text-amber-100/80 hover:text-amber-50 transition-colors duration-300">

                    {/* Icône */}
                    <span className="mr-3 text-emerald-500 text-xl flex-shrink-0">
                      ✓
                    </span>

                    {/* Contenu animé */}
                    <div className="transition-all duration-300 group-hover:pl-2">
                      <span className="font-medium text-white block">
                        {engagement.title}
                      </span>
                      <p className="text-sm text-amber-100/80">
                        {engagement.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>



          {/* Informations de contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 text-amber-50 border-b border-amber-400/30">
              Contactez-nous
            </h3>
            <ul className="space-y-6" role="list">
              <li className="flex items-start">
                <MapPin
                  size={20}
                  className="text-amber-300 mr-4 mt-1 flex-shrink-0"
                  aria-hidden="true"
                />
                <address className="not-italic text-amber-100/80 leading-relaxed">
                  {contactInfo.address}
                  <br />
                  <span className="text-white">Logpom</span>
                </address>
              </li>

              <li className="flex items-center">
                <Phone
                  size={20}
                  className="text-amber-300 mr-4 flex-shrink-0"
                  aria-hidden="true"
                />
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="text-amber-100/80 hover:text-amber-50 transition-colors"
                  aria-label="Appelez-nous"
                >
                  {contactInfo.phone}
                </a>
              </li>

              <li className="flex items-center">
                <Mail
                  size={20}
                  className="text-amber-300 mr-4 flex-shrink-0"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-amber-100/80 hover:text-amber-50 transition-colors break-all"
                  aria-label="Envoyez-nous un email"
                >
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright et mentions légales */}
        <div className="border-t border-amber-400/20 mt-16 pt-8 text-center">
          <p className="text-amber-100/70 text-sm">
            © {new Date().getFullYear()}{' '}
            <span className="font-semibold text-amber-50">Atoum-ra</span>
            . Tous droits réservés.
          </p>
          <div className="mt-4 text-xs text-amber-100/60 space-x-6">
            <Link
              href="/mentions-legales"
              className="hover:text-amber-50 transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="hover:text-amber-50 transition-colors"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/cgu"
              className="hover:text-amber-50 transition-colors"
            >
              Conditions générales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;