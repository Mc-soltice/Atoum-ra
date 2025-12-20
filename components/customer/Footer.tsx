"use client";
export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="container mx-auto py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Atoum-ra — Tous droits réservés
      </div>
    </footer>
  );
}
