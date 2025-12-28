
import Footer from "@/components/customer/Footer";
import Header from "@/components/customer/Header";
import ClientContent from "./ClientContent";

export const metadata = {
  title: {
    default: "Atoum-ra | Produits naturels authentiques",
    template: "%s | Atoum-ra",
  },
  description: "Atoum-ra propose des produits naturels africains de qualité.",
  keywords: ["produits naturels", "bien-être", "plantes africaines", "Atoum-ra"],
  openGraph: {
    title: "Atoum-ra",
    description: "Produits naturels authentiques",
    siteName: "Atoum-ra",
    locale: "fr_FR",
    type: "website",
  },
};

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white">
      <Header />
      {/* On enveloppe les enfants avec le composant client */}
      <ClientContent>
        {children}
      </ClientContent>
      <Footer />
    </div>
  );
}

