import React from 'react';
import { ChevronLeft, Plus, Minus, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { CartItem } from '../../types';

interface CartScreenProps {
  cart: CartItem[];
  cartItemCount: number;
  cartTotal: number;
  onBack: () => void;
  onAddToCart: (product: CartItem) => void;
  onRemoveFromCart: (productId: number) => void;
  onCheckout: () => void; // 새로 추가된 prop
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cart,
  cartItemCount,
  cartTotal,
  onBack,
  onAddToCart,
  onRemoveFromCart,
  onCheckout
}) => {
  // 배송비 계산 (무료배송 조건: $100 이상)
  const freeShippingThreshold = 100;
  const shippingCost = cartTotal >= freeShippingThreshold ? 0 : 15;
  const finalTotal = cartTotal + shippingCost;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm">
          <button 
            onClick={onBack}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="뒤로 가기"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-lg">장바구니</h1>
          <div className="w-10"></div>
        </div>

        {/* Empty Cart */}
        <div className="flex flex-col items-center justify-center px-4 py-20">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">장바구니가 비어있습니다</h2>
          <p className="text-gray-500 text-center mb-8">
            마음에 드는 조명을 찾아 장바구니에 담아보세요
          </p>
          <button
            onClick={onBack}
            className="bg-green-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors"
          >
            쇼핑 계속하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
        <button 
          onClick={onBack}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="뒤로 가기"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold text-lg">장바구니 ({cartItemCount})</h1>
        <div className="w-10"></div>
      </div>

      <div className="flex flex-col pb-32">
        {/* 무료배송 안내 */}
        {remainingForFreeShipping > 0 && (
          <div className="mx-4 mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">무료배송까지</span>
              <span className="text-sm font-bold text-blue-800">${remainingForFreeShipping} 남음</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((cartTotal / freeShippingThreshold) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              ${remainingForFreeShipping} 더 구매하시면 무료배송 혜택을 받으실 수 있어요!
            </p>
          </div>
        )}

        {cartTotal >= freeShippingThreshold && (
          <div className="mx-4 mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-sm font-medium text-green-800">무료배송 적용되었습니다!</span>
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 px-4 mt-4 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex gap-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        aria-label={`${item.name} 수량 감소`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onAddToCart(item)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        aria-label={`${item.name} 수량 증가`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                      {item.quantity > 1 && (
                        <div className="text-xs text-gray-500">${item.price} × {item.quantity}</div>
                      )}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label={`${item.name} 삭제`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Summary & Checkout */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 max-w-md mx-auto lg:max-w-lg xl:max-w-xl">
        <div className="space-y-4">
          {/* Order Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>상품 금액</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>배송비</span>
              <span className={shippingCost === 0 ? 'text-green-600 font-medium' : ''}>
                {shippingCost === 0 ? '무료' : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between text-lg font-bold">
                <span>총 결제 금액</span>
                <span className="text-green-600">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={onCheckout}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
            aria-label={`총 ${finalTotal.toFixed(2)}달러 결제하기`}
          >
            <CreditCard className="w-5 h-5" />
            <span>${finalTotal.toFixed(2)} 결제하기</span>
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              안전한 결제를 위해 SSL 보안 연결을 사용합니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};