import { useState } from 'react';
import { Product } from '../types';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const toggleWishlist = (product: Product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      return false; // removed
    } else {
      setWishlist([...wishlist, product]);
      return true; // added
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some(item => item.id === productId);
  };

  return {
    wishlist,
    toggleWishlist,
    isInWishlist
  };
};