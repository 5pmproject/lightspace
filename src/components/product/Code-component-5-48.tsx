import React from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../../types';

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
  return (
    <div 
      onClick={() => onProductClick(product)}
      className="flex-shrink-0 w-72 h-48 relative rounded-2xl overflow-hidden cursor-pointer shadow-lg"
      style={{
        backgroundImage: `url(${product.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      
      {/* Badges */}
      <div className="absolute top-3 left-3 flex space-x-2">
        {product.isNew && <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">NEW</span>}
        {product.isBestseller && <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">BESTSELLER</span>}
        {product.isPremium && <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">PREMIUM</span>}
        {product.discount && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">-{product.discount}%</span>}
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-white font-bold text-lg mb-1">{product.name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-white font-bold text-xl">${product.price}</span>
            {product.originalPrice && (
              <span className="text-white/70 line-through text-sm">${product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
          >
            <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};