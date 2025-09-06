import React, { useState } from 'react';
import { ChevronLeft, Heart, ShoppingCart, Star, Plus, Clock, Truck } from 'lucide-react';
import { Product } from '../../types';

interface ProductScreenProps {
  product: Product;
  cartItemCount: number;
  onBack: () => void;
  onCartClick: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export const ProductScreen: React.FC<ProductScreenProps> = ({
  product,
  cartItemCount,
  onBack,
  onCartClick,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isInWishlist
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [showRealSize, setShowRealSize] = useState(false);
  
  const productImages = product.images || [product.image];
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
        <button 
          onClick={onBack}
          className="p-2 bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold truncate mx-4">{product.name}</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => onToggleWishlist(product)}
            className="p-2 bg-gray-100 rounded-full"
          >
            <Heart 
              className={`w-6 h-6 ${
                isInWishlist
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-600'
              }`} 
            />
          </button>
          <button 
            onClick={onCartClick} 
            className="relative p-2 bg-gray-100 rounded-full"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Product Images */}
      <div className="relative">
        <div className="h-80 overflow-hidden">
          <img 
            src={productImages[currentImageIdx]} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Image Indicators */}
        {productImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {productImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIdx(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIdx ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {product.isNew && <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">NEW</span>}
          {product.isBestseller && <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">BESTSELLER</span>}
          {product.discount && <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">-{product.discount}% OFF</span>}
        </div>

        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => setShowRealSize(!showRealSize)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              showRealSize 
                ? 'bg-green-800 text-white shadow-lg' 
                : 'bg-white/90 text-gray-700 backdrop-blur-sm'
            }`}
          >
            {showRealSize ? '✓ Actual Size' : 'Show Actual Size'}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl font-bold text-green-800">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
              )}
              {product.discount && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                  Save {product.discount}%
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
            
            {/* Shipping & Stock Info */}
            <div className="flex flex-wrap gap-3 mb-6">
              {product.freeShipping && (
                <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
                  <Truck className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-800 font-medium">Free Shipping</span>
                </div>
              )}
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-800 font-medium">2-3 Days Delivery</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                <span className="text-sm text-gray-700">Stock: {product.stock} left</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-4">
          <div className="flex">
            {['overview', 'specs', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-center capitalize font-medium transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-green-800 text-green-800'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="mb-20">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold mb-2">Key Features:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Energy-efficient LED compatible</li>
                  <li>• Easy installation with all hardware included</li>
                  <li>• Premium quality materials</li>
                  <li>• 2-year warranty included</li>
                </ul>
              </div>
            </div>
          )}
          
          {activeTab === 'specs' && (
            <div className="space-y-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                  <span className="capitalize font-medium text-gray-700">{key}:</span>
                  <span className="text-gray-900 font-semibold">{value}</span>
                </div>
              ))}
              <div className="bg-blue-50 p-4 rounded-xl mt-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> All measurements are approximate. Please verify dimensions before installation.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">{product.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{product.reviews} reviews</p>
                </div>
              </div>
              
              {/* Sample Reviews */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Sarah M.</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">Perfect lighting for my dining room! Easy to install and looks amazing.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Mike D.</span>
                    <div className="flex">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">Good quality product. Fast delivery and well packaged.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-sm mx-auto">
        <div className="flex space-x-3">
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-green-800 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={() => onBuyNow(product)}
            className="bg-gray-800 text-white px-6 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};