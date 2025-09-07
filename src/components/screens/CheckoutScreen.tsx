import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, CreditCard, Lock, AlertCircle, Loader2, ShoppingBag, Truck, Shield } from 'lucide-react';
import { CartItem, PaymentMethod, SavedCard } from '../../types';
import { usePayment } from '../../hooks/usePayment';
import { formatCardNumber, getCardType, getCardIcon, maskCardNumber } from '../../utils/paymentUtils';
import { DSButton } from '../ui/ds-button';
import { OptimizedImage } from '../common/OptimizedImage';

interface CheckoutScreenProps {
  cartItems: CartItem[];
  onBack: () => void;
  onComplete: (orderData: any) => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  cartItems,
  onBack,
  onComplete
}) => {
  const {
    paymentState,
    checkoutData,
    availablePaymentMethods,
    savedCards,
    initializeCheckout,
    goToPaymentStep,
    goBackToSummary,
    selectPaymentMethod,
    selectSavedCard,
    updateNewCard,
    updateBillingAddress,
    processPayment,
    clearError,
    currentStep,
    hasError,
    errorMessage,
    isProcessing
  } = usePayment();

  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Initialize checkout on mount
  useEffect(() => {
    initializeCheckout(cartItems);
  }, [cartItems, initializeCheckout]);

  // Handle payment completion
  const handlePaymentComplete = async () => {
    const result = await processPayment();
    
    if (result.success && checkoutData) {
      const orderData = {
        orderNumber: `LS${Date.now().toString().slice(-8)}`,
        orderItems: checkoutData.items,
        orderTotal: checkoutData.total,
        transactionId: result.transactionId,
        customerInfo: checkoutData.shippingAddress,
        estimatedDelivery: new Date(Date.now() + (5 + Math.floor(Math.random() * 3)) * 24 * 60 * 60 * 1000).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long'
        }),
        orderDate: new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };
      
      onComplete(orderData);
    }
  };

  if (!checkoutData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-green-800" />
      </div>
    );
  }

  // Order Summary Step
  const renderOrderSummary = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Order Summary</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Shield className="w-4 h-4" />
          <span>Secure Checkout</span>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold mb-4 flex items-center">
          <ShoppingBag className="w-5 h-5 mr-2" />
          Items ({checkoutData.items.length})
        </h3>
        <div className="space-y-4">
          {checkoutData.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              <OptimizedImage 
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
                aspectRatio="1/1"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold mb-4 flex items-center">
          <Truck className="w-5 h-5 mr-2" />
          Shipping Address
        </h3>
        <div className="text-sm text-gray-600">
          <p className="font-medium">{checkoutData.shippingAddress.name}</p>
          <p>{checkoutData.shippingAddress.street}</p>
          <p>{checkoutData.shippingAddress.city}, {checkoutData.shippingAddress.state} {checkoutData.shippingAddress.zipCode}</p>
          <p className="mt-2">📧 {checkoutData.shippingAddress.email}</p>
          <p>📱 {checkoutData.shippingAddress.phone}</p>
        </div>
      </div>

      {/* Order Total */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${checkoutData.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{checkoutData.shipping === 0 ? 'FREE' : `$${checkoutData.shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${checkoutData.tax.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${checkoutData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <DSButton 
        onClick={goToPaymentStep}
        className="w-full bg-green-800 hover:bg-green-700 text-white py-3"
        size="lg"
      >
        Continue to Payment
        <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
      </DSButton>
    </div>
  );

  // Payment Method Selection
  const renderPaymentSelection = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Method</h1>
          <p className="text-sm text-gray-500 mt-1">Choose how you'd like to pay</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">${checkoutData.total.toFixed(2)}</p>
          <p className="text-sm text-gray-500">Total</p>
        </div>
      </div>

      {/* Error Message */}
      {hasError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
          <div>
            <p className="text-sm text-red-800">{errorMessage}</p>
            <DSButton 
              variant="ghost" 
              size="sm" 
              onClick={clearError}
              className="mt-2 text-red-600 hover:text-red-700"
            >
              Dismiss
            </DSButton>
          </div>
        </div>
      )}

      {/* Payment Methods */}
      <div className="space-y-4">
        <h3 className="font-semibold">Select Payment Method</h3>
        <div className="grid gap-3">
          {availablePaymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => selectPaymentMethod(method)}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                paymentState.selectedMethod?.id === method.id
                  ? 'border-green-800 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{method.icon}</span>
                <div className="flex-1">
                  <p className="font-medium">{method.name}</p>
                  {method.isDefault && (
                    <span className="text-xs text-green-600">Recommended</span>
                  )}
                </div>
                {paymentState.selectedMethod?.id === method.id && (
                  <Check className="w-5 h-5 text-green-800" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card Selection (if card method selected) */}
      {paymentState.selectedMethod?.type === 'card' && (
        <div className="space-y-4">
          <h3 className="font-semibold">Choose Card</h3>
          
          {/* Saved Cards */}
          {savedCards.length > 0 && (
            <div className="space-y-3">
              {savedCards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => {
                    selectSavedCard(card);
                    setShowNewCardForm(false);
                  }}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    paymentState.selectedCard?.id === card.id
                      ? 'border-green-800 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getCardIcon(card.brand)}</span>
                    <div className="flex-1">
                      <p className="font-medium">**** **** **** {card.last4}</p>
                      <p className="text-sm text-gray-500">
                        {card.holderName} • Expires {card.expiryMonth.toString().padStart(2, '0')}/{card.expiryYear}
                      </p>
                    </div>
                    {paymentState.selectedCard?.id === card.id && (
                      <Check className="w-5 h-5 text-green-800" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add New Card Option */}
          <div
            onClick={() => {
              setShowNewCardForm(true);
              selectSavedCard({} as SavedCard); // Clear saved card selection
            }}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              showNewCardForm
                ? 'border-green-800 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-gray-400" />
              <span className="font-medium">Add New Card</span>
              {showNewCardForm && <Check className="w-5 h-5 text-green-800" />}
            </div>
          </div>

          {/* New Card Form */}
          {showNewCardForm && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
                    value={formatCardNumber(paymentState.newCard?.number || '')}
                    onChange={(e) => updateNewCard({ number: e.target.value.replace(/\D/g, '') })}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Month
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
                      value={paymentState.newCard?.expiryMonth || ''}
                      onChange={(e) => updateNewCard({ expiryMonth: e.target.value })}
                    >
                      <option value="">MM</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                          {(i + 1).toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
                      value={paymentState.newCard?.expiryYear || ''}
                      onChange={(e) => updateNewCard({ expiryYear: e.target.value })}
                    >
                      <option value="">YYYY</option>
                      {[...Array(10)].map((_, i) => {
                        const year = new Date().getFullYear() + i;
                        return (
                          <option key={year} value={year.toString()}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
                      value={paymentState.newCard?.cvv || ''}
                      onChange={(e) => updateNewCard({ cvv: e.target.value.replace(/\D/g, '') })}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
                    value={paymentState.newCard?.holderName || ''}
                    onChange={(e) => updateNewCard({ holderName: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Terms Agreement */}
      <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
        <input
          type="checkbox"
          id="terms"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="mt-1"
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
          I agree to the <span className="text-green-800 font-medium">Terms of Service</span> and{' '}
          <span className="text-green-800 font-medium">Privacy Policy</span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <DSButton
          variant="outline"
          onClick={goBackToSummary}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </DSButton>
        <DSButton
          onClick={handlePaymentComplete}
          disabled={!paymentState.selectedMethod || !agreedToTerms}
          className="flex-1 bg-green-800 hover:bg-green-700 text-white"
        >
          <Lock className="w-4 h-4 mr-2" />
          Complete Payment
        </DSButton>
      </div>
    </div>
  );

  // Processing Step
  const renderProcessing = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      <div className="relative">
        <Loader2 className="w-16 h-16 animate-spin text-green-800" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Lock className="w-6 h-6 text-green-800" />
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Processing Payment</h2>
        <p className="text-gray-600">Please wait while we securely process your payment...</p>
        <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Shield className="w-4 h-4" />
        <span>256-bit SSL Encryption</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-4">
          <DSButton
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-gray-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </DSButton>
          <div className="flex-1">
            <h1 className="font-semibold">Checkout</h1>
            <div className="flex items-center space-x-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${currentStep === 'summary' ? 'bg-green-800' : 'bg-gray-300'}`} />
              <div className={`w-2 h-2 rounded-full ${currentStep === 'payment' ? 'bg-green-800' : 'bg-gray-300'}`} />
              <div className={`w-2 h-2 rounded-full ${currentStep === 'processing' ? 'bg-green-800' : 'bg-gray-300'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {currentStep === 'summary' && renderOrderSummary()}
        {currentStep === 'payment' && renderPaymentSelection()}
        {currentStep === 'processing' && renderProcessing()}
      </div>
    </div>
  );
};