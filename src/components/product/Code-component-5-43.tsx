import React from 'react';
import { Heart, Star, Plus } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  onAddToCart,
  onToggleWishlist,
  isInWishlist
}) => {
  return (
    <div 
      onClick={() => onProductClick(product)}
      className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-40 object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.isNew && <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">NEW</span>}
          {product.isBestseller && <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">HOT</span>}
          {product.discount && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">-{product.discount}%</span>}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm"
        >
          <Heart 
            className={`w-4 h-4 ${
              isInWishlist
                ? 'fill-red-500 text-red-500'
                : 'text-gray-400'
            }`} 
          />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-1 text-xs text-gray-600">({product.reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-green-800 font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-xs">${product.originalPrice}</span>
            )}
          </div>
          {product.freeShipping && (
            <span className="text-xs text-green-600 font-medium">Free Ship</span>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-gray-500">Stock: {product.stock}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-green-800 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};