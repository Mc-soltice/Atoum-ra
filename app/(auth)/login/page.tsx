// app/(auth)/login/page.tsx
// Page de connexion/inscription avec design moderne, animations et fond

"use client"; // Nécessaire pour les composants interactifs et animations

import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true); // État pour basculer entre login/register
  const [showPassword, setShowPassword] = useState(false); // État pour afficher/cacher le mot de passe
  const [isLoading, setIsLoading] = useState(false); // État pour gérer le chargement
  const [mounted, setMounted] = useState(false); // État pour éviter les problèmes d'hydratation

  // Données du formulaire
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "", // Seulement pour l'inscription
  });

  // Effet pour gérer le montage du composant (évite les conflits SSR)
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Gestionnaire de changement des champs du formulaire
   * Met à jour l'état formData en fonction du champ modifié
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Soumission du formulaire de connexion/inscription
   * Simule l'authentification avec une API
   * Redirige vers la page d'accueil après succès
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation d'un appel API avec délai
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Données soumises:", formData);

    // Ici, vous intégreriez votre logique d'authentification réelle
    // Exemple: await authAPI.login(formData.email, formData.password);

    setIsLoading(false);
    router.push("/"); // Redirection vers la page d'accueil après connexion
  };

  /**
   * Fonction pour basculer entre les modes login et register
   * Réinitialise les champs du formulaire lors du changement
   */
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", name: "" });
  };

  // Si le composant n'est pas encore monté, retourner un squelette minimal
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
        <div className="animate-pulse bg-white/80 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-300 rounded"></div>
            <div className="h-12 bg-gray-300 rounded"></div>
            <div className="h-12 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* 
        Section de fond avec image et overlay
        Utilise une image de produits naturels pour rester dans le thème
      */}
      <div className="absolute inset-0 z-0">
        {/* Image de fond thématique - produits naturels */}
        <Image
          src="/images/login.png"
          alt="Produits naturels"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Overlay pour améliorer la lisibilité du formulaire */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-teal-800/60 to-green-900/70"></div>

      </div>

      {/* 
        Conteneur principal du formulaire
        Utilise backdrop-blur pour un effet de verre (glassmorphism)
      */}
      <div className="relative z-10 w-full max-w-md">
        {/* 
          Carte du formulaire avec animation d'entrée
          Les classes bg-white/20 et backdrop-blur-lg créent l'effet transparent
        */}
        <div
          className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 overflow-hidden animate-fade-in-up"
        >
          {/* En-tête avec logo et titre */}
          <div className="p-8">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block">
                <h1 className="text-4xl font-bold text-white mb-2">
                  Natural<span className="text-emerald-300">Shop</span>
                </h1>
              </Link>
              <p className="text-white/80">
                {isLogin
                  ? "Connectez-vous à votre compte"
                  : "Rejoignez notre communauté naturelle"}
              </p>
            </div>

            {/* Formulaire d'authentification */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Champ nom (uniquement pour l'inscription) avec animation */}
              {!isLogin && (
                <div className="animate-slide-down">
                  <label className="label">
                    <span className="label-text text-white">Nom complet</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-emerald-300" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Votre nom"
                      className="input input-bordered w-full pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all duration-300"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {/* Champ email */}
              <div>
                <label className="label">
                  <span className="label-text text-white">Email</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-emerald-300" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@exemple.com"
                    className="input input-bordered w-full pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Champ mot de passe avec toggle de visibilité */}
              <div>
                <label className="label">
                  <span className="label-text text-white">Mot de passe</span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="label-text-alt text-emerald-300 hover:text-emerald-200 transition-colors"
                  >
                    {showPassword ? (
                      <span className="flex items-center gap-1">
                        <EyeOff className="h-4 w-4" /> Masquer
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" /> Afficher
                      </span>
                    )}
                  </button>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-emerald-300" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="input input-bordered w-full pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all duration-300"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* Options supplémentaires pour le login */}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="cursor-pointer flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm border-white/30 bg-white/10 checked:bg-emerald-500"
                    />
                    <span className="text-white/80 text-sm">Se souvenir de moi</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
                  >
                    Mot de passe oublié?
                  </Link>
                </div>
              )}

              {/* Bouton de soumission */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn w-full bg-gradient-to-r from-emerald-500 to-teal-600 border-none text-white hover:from-emerald-600 hover:to-teal-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="loading loading-spinner loading-sm"></span>
                    <span className="ml-2">
                      {isLogin ? "Connexion..." : "Inscription..."}
                    </span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    {isLogin ? "Se connecter" : "Créer un compte"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                )}
              </button>
            </form>

            {/* Séparateur */}
            <div className="divider divider-neutral my-8">ou</div>

            {/* Boutons de connexion sociale */}
            <div className="grid grid-cols-2 gap-4">
              <button className="btn btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-colors">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
                </svg>
                Facebook
              </button>
              <button className="btn btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-colors">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8a8 8 0 0 0-8-8m-1 5h2v6h-2v-6m0 8h2v2h-2v-2z" />
                </svg>
                Google
              </button>
            </div>

            {/* Lien pour basculer entre login/register */}
            <div className="text-center mt-8">
              <p className="text-white/80">
                {isLogin ? "Pas encore de compte?" : "Déjà un compte?"}
                <button
                  onClick={toggleAuthMode}
                  className="ml-2 text-emerald-300 font-semibold hover:text-emerald-200 transition-colors"
                >
                  {isLogin ? "S'inscrire" : "Se connecter"}
                </button>
              </p>
            </div>
          </div>

          {/* Footer avec lien vers la page d'accueil */}
          <div className="px-8 py-6 bg-black/20 border-t border-white/10">
            <p className="text-center text-white/60 text-sm">
              En continuant, vous acceptez nos{" "}
              <Link href="/terms" className="text-emerald-300 hover:text-emerald-200">
                Conditions d&apos;utilisation
              </Link>{" "}
              et notre{" "}
              <Link href="/privacy" className="text-emerald-300 hover:text-emerald-200">
                Politique de confidentialité
              </Link>
            </p>
            <div className="text-center mt-4">
              <Link
                href="/"
                className="inline-flex items-center text-white/70 hover:text-white transition-colors text-sm"
              >
                ← Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 
        Styles CSS personnalisés pour les animations
        Ajoutés dans le composant pour éviter les dépendances externes
      */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-slide-down {
          animation: slide-down 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}