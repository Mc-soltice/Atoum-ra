import { Product } from "@/types/product";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Miel Sauvage Bio",
    category: "Miel",
    price: 8000,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Miel 100% naturel, récolté dans les forêts africaines.",
    ingredients: ["Miel pur"],
    benefits: ["Énergisant", "Renforce l'immunité"],
    usage_instructions: "1 cuillère par jour",
    stock: 50,
  },
  {
    id: "2",
    name: "Savon Noir Africain",
    category: "Savons",
    price: 2500,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Savon naturel pour peau douce et hydratée.",
    ingredients: ["Beurre de karité", "Huile de coco"],
    benefits: ["Nettoie", "Hydrate"],
    usage_instructions: "usage_instructions quotidien",
    stock: 100,
  },
  {
    id: "3",
    name: "Huile de Baobab",
    category: "Huiles",
    price: 12000,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Huile naturelle pour peau et cheveux.",
    ingredients: ["Huile de Baobab"],
    benefits: ["Nourrit", "Régénère la peau"],
    usage_instructions: "Appliquer sur la peau ou cheveux",
    stock: 30,
  },
  // 3 autres Miel
  {
    id: "4",
    name: "Miel de Forêt",
    category: "Miel",
    price: 7500,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Miel pur récolté dans la forêt.",
    ingredients: ["Miel pur"],
    benefits: ["Énergie", "Antioxydant"],
    usage_instructions: "1 cuillère par jour",
    stock: 40,
  },
  {
    id: "5",
    name: "Miel de Fleurs Sauvages",
    category: "Miel",
    price: 9000,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Miel parfumé aux fleurs sauvages.",
    ingredients: ["Miel pur"],
    benefits: ["Tonique", "Renforce la vitalité"],
    usage_instructions: "1 cuillère par jour",
    stock: 60,
  },
  {
    id: "6",
    name: "Miel d’Acacia",
    category: "Miel",
    price: 8500,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Miel doux et délicat d’acacia.",
    ingredients: ["Miel pur"],
    benefits: ["Calmant", "Améliore sommeil"],
    usage_instructions: "1 cuillère par jour",
    stock: 25,
  },
  // 3 Savons
  {
    id: "7",
    name: "Savon au Karité",
    category: "Savons",
    price: 3000,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Savon hydratant au beurre de karité.",
    ingredients: ["Beurre de karité"],
    benefits: ["Hydrate", "Adoucit la peau"],
    usage_instructions: "usage_instructions quotidien",
    stock: 80,
  },
  {
    id: "8",
    name: "Savon à l’Argile Verte",
    category: "Savons",
    price: 2700,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Savon purifiant à l’argile verte.",
    ingredients: ["Argile verte", "Huiles végétales"],
    benefits: ["Purifie", "Détoxifie"],
    usage_instructions: "usage_instructions quotidien",
    stock: 70,
  },
  {
    id: "9",
    name: "Savon au Miel",
    category: "Savons",
    price: 2900,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Savon nourrissant au miel.",
    ingredients: ["Miel", "Beurre de karité"],
    benefits: ["Hydrate", "Adoucit"],
    usage_instructions: "usage_instructions quotidien",
    stock: 65,
  },
  // 3 Huiles
  {
    id: "10",
    name: "Huile de Coco Bio",
    category: "Huiles",
    price: 10000,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Huile vierge de coco bio.",
    ingredients: ["Huile de coco"],
    benefits: ["Hydrate", "Nourrit cheveux & peau"],
    usage_instructions: "Appliquer selon besoin",
    stock: 45,
  },
  {
    id: "11",
    name: "Huile de Ricin",
    category: "Huiles",
    price: 9500,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Huile pour la pousse des cheveux et cils.",
    ingredients: ["Huile de ricin"],
    benefits: ["Fortifie cheveux", "Stimule pousse"],
    usage_instructions: "Appliquer sur cheveux et cils",
    stock: 35,
  },
  {
    id: "12",
    name: "Huile d’Argan",
    category: "Huiles",
    price: 15000,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Huile rare pour peau et cheveux.",
    ingredients: ["Huile d’argan"],
    benefits: ["Régénère", "Nourrit"],
    usage_instructions: "Appliquer selon besoin",
    stock: 20,
  },
  {
    id: "13",
    name: "Huile d’Argan",
    category: "Huiles",
    price: 15000,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Huile rare pour peau et cheveux.",
    ingredients: ["Huile d’argan"],
    benefits: ["Régénère", "Nourrit"],
    usage_instructions: "Appliquer selon besoin",
    stock: 20,
  },
  {
    id: "14",
    name: "Huile d’Argan",
    category: "Huiles",
    price: 15000,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Huile rare pour peau et cheveux.",
    ingredients: ["Huile d’argan"],
    benefits: ["Régénère", "Nourrit"],
    usage_instructions: "Appliquer selon besoin",
    stock: 20,
  },
  {
    id: "15",
    name: "Huile d’Argan",
    category: "Huiles",
    price: 15000,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Huile rare pour peau et cheveux.",
    ingredients: ["Huile d’argan"],
    benefits: ["Régénère", "Nourrit"],
    usage_instructions: "Appliquer selon besoin",
    stock: 20,
  },
  {
    id: "16",
    name: "Huile d’Argan",
    category: "Huiles",
    price: 15000,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Huile rare pour peau et cheveux.",
    ingredients: ["Huile d’argan"],
    benefits: ["Régénère", "Nourrit"],
    usage_instructions: "Appliquer selon besoin",
    stock: 20,
  },
  {
    id: "17",
    name: "Huile d’Argan",
    category: "Huiles",
    price: 15000,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Huile rare pour peau et cheveux.",
    ingredients: ["Huile d’argan"],
    benefits: ["Régénère", "Nourrit"],
    usage_instructions: "Appliquer selon besoin",
    stock: 20,
  },
  {
    id: "18",
    name: "Huile d’Argan",
    category: "Huiles",
    price: 15000,
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    description: "Huile rare pour peau et cheveux.",
    ingredients: ["Huile d’argan"],
    benefits: ["Régénère", "Nourrit"],
    usage_instructions: "Appliquer selon besoin",
    stock: 20,
  },
];
/**
 * Récupère un produit par son ID
 * Fonction serveur (utilisable dans page.tsx)
 */
export async function getProductById(id: string): Promise<Product | null> {
  return mockProducts.find((p) => p.id === id) ?? null;
}
