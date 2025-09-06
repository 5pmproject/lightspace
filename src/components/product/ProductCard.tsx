import React, { memo } from 'react';
import { Heart, Star, Plus } from 'lucide-react';
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
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onProductClick(product);
    }
  };

  return (
    <article 
      onClick={() => onProductClick(product)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.name}, priced at $${product.price}`}
      className="surface-elevated cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2"
    >
      <div className="relative">
        <OptimizedImage 
          src={product.image}
          alt={`${product.name} - ${product.category} lighting product`}
          aspectRatio="5/4"
          className="w-full h-40"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.isNew && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              NEW
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              HOT
            </span>
          )}
          {product.discount && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              -{product.discount}%
            </span>
          )}
        </div>

        <DSButton
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isInWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute top-2 right-2 bg-white shadow-sm hover:shadow-md"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isInWishlist
                ? 'fill-red-500 text-red-500'
                : 'text-gray-400 hover:text-red-400'
            }`} 
          />
        </DSButton>
      </div>
      
      <div style={{ padding: 'var(--card-padding)' }}>
        <h3 className="font-semibold text-responsive-sm mb-2 line-clamp-2 text-gray-900">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-2" aria-label={`Rating: ${product.rating} out of 5 stars, ${product.reviews} reviews`}>
          <div className="flex items-center" role="img" aria-label={`${product.rating} stars`}>
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
            <span className="ml-1 text-xs text-gray-600">({product.reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-green-800 font-bold" aria-label={`Current price: $${product.price}`}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-xs" aria-label={`Original price: $${product.originalPrice}`}>
                ${product.originalPrice}
              </span>
            )}
          </div>
          {product.freeShipping && (
            <span className="text-xs text-green-600 font-medium">Free Ship</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Stock: {product.stock} left
          </span>
          <DSButton
            variant="primary"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
          </DSButton>
        </div>
      </div>
    </article>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const ProductCard = memo(ProductCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.isInWishlist === nextProps.isInWishlist &&
    prevProps.onProductClick === nextProps.onProductClick &&
    prevProps.onAddToCart === nextProps.onAddToCart &&
    prevProps.onToggleWishlist === nextProps.onToggleWishlist
  );
});