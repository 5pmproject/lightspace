import React from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../../types';
import { OptimizedImage } from '../common/OptimizedImage';

interface FeaturedCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export const FeaturedCard: React.FC<FeaturedCardProps> = ({
  product,
  onProductClick,
  onToggleWishlist,
  isInWishlist
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onProductClick(product);
    }
  };

  const handleWishlistKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggleWishlist(product);
    }
  };

  return (
    <article 
      onClick={() => onProductClick(product)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Featured product: ${product.name}, priced at $${product.price}`}
      className="flex-shrink-0 w-72 relative rounded-2xl overflow-hidden cursor-pointer shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2"
    >
      <OptimizedImage
        src={product.image}
        alt={`Featured ${product.category} lighting: ${product.name}`}
        aspectRatio="3/2"
        className="w-full h-48"
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true"></div>
      
      {/* Badges */}
      <div className="absolute top-3 left-3 flex space-x-2">
        {product.isNew && (
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            NEW
          </span>
        )}
        {product.isBestseller && (
          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            BESTSELLER
          </span>
        )}
        {product.isPremium && (
          <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            PREMIUM
          </span>
        )}
        {product.discount && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            -{product.discount}%
          </span>
        )}
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-white font-bold text-xl" aria-label={`Current price: $${product.price}`}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-white/70 line-through text-sm" aria-label={`Original price: $${product.originalPrice}`}>
                ${product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            onKeyDown={handleWishlistKeyDown}
            aria-label={isInWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/20"
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${
                isInWishlist 
                  ? 'fill-red-500 text-red-500' 
                  : 'text-white hover:text-red-300'
              }`} 
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </article>
  );
};