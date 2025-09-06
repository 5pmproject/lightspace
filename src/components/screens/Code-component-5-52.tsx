import React from 'react';
import { Search, ShoppingCart, Camera, Filter } from 'lucide-react';
import { Product, Category } from '../../types';
import { FeaturedCard } from '../product/FeaturedCard';
import { ProductCard } from '../product/ProductCard';

interface HomeScreenProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  featuredProducts: Product[];
  filteredProducts: Product[];
  categories: Category[];
  cartItemCount: number;
  onProductClick: (product: Product) => void;
  onCartClick: () => void;
  onCameraClick: () => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  featuredProducts,
  filteredProducts,
  categories,
  cartItemCount,
  onProductClick,
  onCartClick,
  onCameraClick,
  onAddToCart,
  onToggleWishlist,
  isInWishlist
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-800 to-green-700 px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">LightSpace</h1>
            <p className="text-green-100 text-sm">Illuminate your space</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={onCameraClick}
              className="p-2 bg-white/20 rounded-full"
            >
              <Camera className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={onCartClick}
              className="relative p-2 bg-white/20 rounded-full"
            >
              <ShoppingCart className="w-6 h-6 text-white" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for the perfect light..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-300 shadow-lg"
          />
        </div>
      </div>

      {/* Featured Products Carousel */}
      <div className="px-4 py-6 -mt-8 relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Featured</h2>
          <button className="text-green-800 text-sm font-medium">View All</button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {featuredProducts.map((product) => (
            <FeaturedCard
              key={product.id}
              product={product}
              onProductClick={onProductClick}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={isInWishlist(product.id)}
            />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`relative p-4 rounded-2xl text-center transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-br ' + category.gradient + ' text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <span className="text-xs font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 pb-20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Products</h2>
          <div className="flex space-x-2">
            <button className="p-2 bg-white rounded-lg shadow-sm">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={onProductClick}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={isInWishlist(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};