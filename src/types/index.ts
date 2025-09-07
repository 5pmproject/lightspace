export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  description: string;
  specs: Record<string, string>;
  isNew?: boolean;
  isBestseller?: boolean;
  isPremium?: boolean;
  isSmart?: boolean;
  discount?: number;
  freeShipping?: boolean;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  gradient: string;
}

export type Screen = 'home' | 'product' | 'cart' | 'order-complete';