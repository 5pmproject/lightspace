/* ==================== 개선된 ProductCard.tsx 시작 ==================== */
import React, { memo, useState } from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { OptimizedImage } from '../common/OptimizedImage';
import { DSButton } from '../ui/ds-button';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

const ProductCardComponent: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  onAddToCart,
  onToggleWishlist,
  isInWishlist
}) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

  // 제품 클릭 핸들러
  const handleProductClick = () => {
    onProductClick(product);
  };

  // 키보드 접근성을 위한 핸들러
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleProductClick();
    }
  };

  // 장바구니 추가 핸들러
  const handleAddToCart = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (isAddingToCart) return;
    
    setIsAddingToCart(true);
    try {
      await onAddToCart(product);
    } finally {
      setIsAddingToCart(false);
    }
  };

  // 위시리스트 토글 핸들러
  const handleToggleWishlist = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (isTogglingWishlist) return;
    
    setIsTogglingWishlist(true);
    try {
      await onToggleWishlist(product);
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  // 가격 계산
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <article 
      onClick={handleProductClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.name}, priced at $${discountedPrice.toFixed(2)}${product.discount ? ` (${product.discount}% off)` : ''}`}
      className="surface-elevated cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2 group"
    >
      <div className="relative overflow-hidden">
        <OptimizedImage 
          src={product.image}
          alt={`${product.name} - ${product.category} lighting product`}
          aspectRatio="5/4"
          className="w-full h-40 transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
        />
        
        {/* Gradient Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.isNew && (
            <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg backdrop-blur-sm">
              NEW
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg backdrop-blur-sm">
              HOT
            </span>
          )}
          {product.discount && (
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg backdrop-blur-sm">
              -{product.discount}%
            </span>
          )}
          {product.isPremium && (
            <span className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg backdrop-blur-sm">
              PREMIUM
            </span>
          )}
          {product.isSmart && (
            <span className="bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg backdrop-blur-sm">
              SMART
            </span>
          )}
        </div>

        {/* Stock Status Indicator */}
        <div className="absolute top-2 right-12">
          {product.stock <= 5 && product.stock > 0 && (
            <div className="bg-yellow-500/90 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg backdrop-blur-sm">
              Only {product.stock} left
            </div>
          )}
          {product.stock === 0 && (
            <div className="bg-red-500/90 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg backdrop-blur-sm">
              Out of Stock
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <DSButton
          variant="ghost"
          size="icon"
          onClick={handleToggleWishlist}
          disabled={isTogglingWishlist}
          aria-label={isInWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={`absolute top-2 right-2 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 ${
            isTogglingWishlist ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Heart 
            className={`w-4 h-4 transition-all duration-200 ${
              isInWishlist
                ? 'fill-red-500 text-red-500 scale-110'
                : 'text-gray-400 hover:text-red-500'
            }`}
            aria-hidden="true"
          />
        </DSButton>

        {/* Quick Add to Cart Button - moved to top-right */}
        <div className="absolute top-2 right-10 z-10">
          <DSButton
            variant="default"
            size="icon"
            onClick={handleAddToCart}
            disabled={isAddingToCart || product.stock === 0}
            aria-label={`Add ${product.name} to cart`}
            className={`bg-green-800 text-white hover:bg-green-700 shadow-lg transform hover:scale-110 transition-all duration-200 ${
              isAddingToCart || product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isAddingToCart ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
            ) : product.stock === 0 ? (
              <span className="text-xs">✕</span>
            ) : (
              <ShoppingCart className="w-4 h-4" aria-hidden="true" />
            )}
          </DSButton>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 space-y-2">
        {/* Product Name */}
        <h3 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center space-x-1">
          <div className="flex" aria-label={`Rating: ${product.rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline space-x-2">
          <span className="text-lg font-bold text-gray-900">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discount && (
            <span className="text-sm text-gray-500 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Category and Stock Status */}
        <div className="flex items-center justify-between">
          <span className="inline-block text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {product.category}
          </span>
          {product.stock > 0 ? (
            <span className="text-xs text-green-600 font-medium">
              {product.stock > 10 ? 'In Stock' : `${product.stock} left`}
            </span>
          ) : (
            <span className="text-xs text-red-500 font-medium">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export const ProductCard = memo(ProductCardComponent);
/* ==================== 개선된 ProductCard.tsx 끝 ==================== */