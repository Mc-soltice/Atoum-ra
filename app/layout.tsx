import { Inter } from 'next/font/google';
import "./globals.css";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Mon site e-commerce",
  description: "Une plateforme moderne construite avec Next.js et Tailwind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-theme="cupcake">

      <body className={`${inter.className} bg-amber-50 min-h-screen flex flex-col`}>
        {children}
      </body>

    </html>
  );
}
