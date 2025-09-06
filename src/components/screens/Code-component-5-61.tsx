import React from 'react';
import { ChevronLeft, ShoppingCart, Minus, Plus } from 'lucide-react';
import { CartItem } from '../../types';

interface CartScreenProps {
  cart: CartItem[];
  cartItemCount: number;
  cartTotal: number;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
  onRemoveFromCart: (productId: number) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cart,
  cartItemCount,
  cartTotal,
  onBack,
  onAddToCart,
  onRemoveFromCart
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white flex items-center justify-between p-4 border-b shadow-sm sticky top-0 z-10">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Shopping Cart</h1>
        </div>
        <span className="text-sm text-gray-600">{cartItemCount} items</span>
      </div>

      {cart.length === 0 ? (
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-12 h-12 text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Discover amazing lighting products</p>
            <button
              onClick={onBack}
              className="bg-green-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 pb-32">
          <div className="p-4 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    {item.discount && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        -{item.discount}%
                      </span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-gray-800">{item.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-green-800 font-bold">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">${item.originalPrice}</span>
                      )}
                    </div>
                    {item.freeShipping && (
                      <span className="text-xs text-green-600 font-medium">Free Shipping</span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="p-2 rounded-full border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="p-2 rounded-full border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="px-4 mb-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItemCount} items)</span>
                  <span>${cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span>${cartTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Checkout Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-sm mx-auto shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-sm text-gray-600">Total:</span>
                <span className="text-2xl font-bold text-green-800 ml-2">${cartTotal}</span>
              </div>
              <div className="text-right">
                <div className="text-xs text-green-600">✓ Free Shipping</div>
                <div className="text-xs text-gray-500">2-3 Days Delivery</div>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-green-800 to-green-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:from-green-700 hover:to-green-600 transition-all">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};