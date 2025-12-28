export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  ingredients?: string[];
  benefits?: string[];
  usage?: string;
  stock: number;
}

export interface ProductPromo {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number; // Prix avant réduction (optionnel)
  image: string;
  description: string;
  ingredients?: string[];
  benefits?: string[];
  usage?: string;
  stock: number;
}
