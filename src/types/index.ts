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

export type Screen = 'home' | 'product' | 'cart' | 'checkout' | 'order-complete';

// Payment related types
export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple-pay' | 'google-pay' | 'bank-transfer';
  name: string;
  icon: string;
  isDefault?: boolean;
}

export interface SavedCard {
  id: string;
  last4: string;
  brand: 'visa' | 'mastercard' | 'amex' | 'discover';
  expiryMonth: number;
  expiryYear: number;
  holderName: string;
  isDefault?: boolean;
}

export interface PaymentState {
  step: 'summary' | 'payment' | 'processing' | 'complete';
  selectedMethod?: PaymentMethod;
  selectedCard?: SavedCard;
  newCard?: {
    number: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    holderName: string;
  };
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  isProcessing: boolean;
  error?: string;
}

export interface CheckoutData {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: {
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}