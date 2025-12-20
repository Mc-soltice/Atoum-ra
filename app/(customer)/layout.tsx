

import Footer from "@/components/customer/Footer";
import Header from "@/components/customer/Header";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <body className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 container mx-auto px-4">
          {children}
        </main>

        <Footer />
      </body>
    </div>
  );
}
