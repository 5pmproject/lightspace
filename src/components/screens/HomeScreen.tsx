import React from 'react';
import { Search, ShoppingCart, Camera, Filter } from 'lucide-react';
import { Product, Category } from '../../types';
import { FeaturedCard } from '../product/FeaturedCard';
import { ProductCard } from '../product/ProductCard';
import { DSButton } from '../ui/ds-button';
import { DSInput } from '../ui/ds-input';

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
      <header className="brand-gradient px-4 py-6" role="banner">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-responsive-lg text-white">LightSpace</h1>
            <p className="text-green-100 text-responsive-sm">Illuminate your space</p>
          </div>
          <nav className="flex items-center space-x-3" role="navigation" aria-label="Secondary navigation">
            <DSButton
              variant="ghost"
              size="icon"
              onClick={onCameraClick}
              aria-label="Search by photo - Upload an image to find similar products"
              className="bg-white/20 text-white hover:bg-white/30 border-0"
            >
              <Camera className="w-5 h-5" aria-hidden="true" />
            </DSButton>
            <DSButton
              variant="ghost"
              size="icon"
              onClick={onCartClick}
              aria-label={`Shopping cart with ${cartItemCount} items`}
              className="relative bg-white/20 text-white hover:bg-white/30 border-0"
            >
              <ShoppingCart className="w-5 h-5" aria-hidden="true" />
              {cartItemCount > 0 && (
                <span 
                  className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                  aria-label={`${cartItemCount} items in cart`}
                >
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </DSButton>
          </nav>
        </div>

        {/* Search Bar */}
        <DSInput
          variant="search"
          placeholder="Search for the perfect light..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-5 h-5" />}
          aria-label="Search products"
        />
      </header>

      {/* Featured Products Carousel */}
      <section className="px-4 py-6 -mt-8 relative z-10" aria-labelledby="featured-heading">
        <div className="flex justify-between items-center mb-4">
          <h2 id="featured-heading" className="text-responsive-lg text-gray-800">Featured Products</h2>
          <DSButton 
            variant="tertiary"
            size="sm"
            aria-label="View all featured products"
          >
            View All
          </DSButton>
        </div>
        <div 
          className="flex space-x-4 overflow-x-auto pb-2 scroll-smooth"
          role="region"
          aria-label="Featured products carousel"
          style={{ scrollbarWidth: 'thin' }}
        >
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
      </section>

      {/* Categories */}
      <section className="px-4 mb-6" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="text-responsive-lg text-gray-800 mb-4">Categories</h2>
        <nav role="tablist" aria-label="Product categories">
          <div className="grid grid-cols-4 gap-3">
            {categories.map((category) => (
              <DSButton
                key={category.id}
                variant={selectedCategory === category.id ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                role="tab"
                aria-selected={selectedCategory === category.id}
                aria-controls="products-grid"
                aria-label={`Filter by ${category.name} category`}
                className={`h-auto p-4 flex-col gap-2 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-br ${category.gradient} text-white shadow-lg scale-105`
                    : 'bg-white text-gray-700 shadow-sm hover:shadow-md hover:scale-102'
                }`}
              >
                <div className="text-2xl" aria-hidden="true">{category.icon}</div>
                <span className="text-xs font-medium">{category.name}</span>
              </DSButton>
            ))}
          </div>
        </nav>
      </section>

      {/* Products Grid */}
      <section className="px-4 pb-20" aria-labelledby="products-heading">
        <div className="flex justify-between items-center mb-4">
          <h2 id="products-heading" className="text-responsive-lg text-gray-800">
            {selectedCategory === 'all' ? 'All Products' : `${categories.find(c => c.id === selectedCategory)?.name} Lights`}
            <span className="text-responsive-sm font-normal text-gray-600 ml-2">
              ({filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'})
            </span>
          </h2>
          <div className="flex space-x-2">
            <DSButton 
              variant="ghost" 
              size="icon"
              aria-label="Open filter options"
              className="bg-white shadow-sm hover:shadow-md"
            >
              <Filter className="w-5 h-5 text-gray-600" aria-hidden="true" />
            </DSButton>
          </div>
        </div>
        
        <div 
          id="products-grid"
          role="tabpanel"
          aria-labelledby="products-heading"
          className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={onProductClick}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={isInWishlist(product.id)}
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-12 text-gray-500 spacing-stack-md">
              <p>No products found matching your criteria.</p>
              <DSButton
                variant="tertiary"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                Clear filters
              </DSButton>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};