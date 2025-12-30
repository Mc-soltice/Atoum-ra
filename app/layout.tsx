import "./globals.css";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen">
        {children} {/* Ici on laisse l’espace pour tous les layouts imbriqués */}
      </body>
    </html>
  );
}
