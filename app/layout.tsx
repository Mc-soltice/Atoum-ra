import "./globals.css";
import { AuthProvider } from "@/contexte/AuthContext";

export const metadata = {
  title: "Mon site e-commerce",
  description: "Une plateforme moderne construite avec Next.js et Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <div className="bg-amber-50 min-h-screen flex flex-col">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}
