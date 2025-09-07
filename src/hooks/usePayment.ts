import { useState, useCallback } from 'react';
import { PaymentState, PaymentMethod, SavedCard, CheckoutData } from '../types';
import { 
  simulatePaymentProcessing, 
  validateCardNumber, 
  validateExpiryDate, 
  validateCVV, 
  validateAddress,
  getAvailablePaymentMethods,
  getMockSavedCards,
  calculateTax,
  calculateShipping
} from '../utils/paymentUtils';

export const usePayment = () => {
  const [paymentState, setPaymentState] = useState<PaymentState>({
    step: 'summary',
    isProcessing: false
  });

  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [availablePaymentMethods] = useState<PaymentMethod[]>(getAvailablePaymentMethods());
  const [savedCards] = useState<SavedCard[]>(getMockSavedCards());

  // Initialize checkout data
  const initializeCheckout = useCallback((cartItems: any[], shippingAddress?: any) => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = calculateShipping(subtotal, cartItems);
    const tax = calculateTax(subtotal);
    const total = subtotal + shipping + tax;

    const defaultAddress = shippingAddress || {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      street: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    };

    const newCheckoutData: CheckoutData = {
      items: cartItems,
      subtotal,
      tax,
      shipping,
      total,
      shippingAddress: defaultAddress
    };

    setCheckoutData(newCheckoutData);
    setPaymentState({
      step: 'summary',
      isProcessing: false
    });
  }, []);

  // Navigate to payment step
  const goToPaymentStep = useCallback(() => {
    setPaymentState(prev => ({
      ...prev,
      step: 'payment',
      error: undefined
    }));
  }, []);

  // Navigate back to summary
  const goBackToSummary = useCallback(() => {
    setPaymentState(prev => ({
      ...prev,
      step: 'summary',
      error: undefined
    }));
  }, []);

  // Select payment method
  const selectPaymentMethod = useCallback((method: PaymentMethod) => {
    setPaymentState(prev => ({
      ...prev,
      selectedMethod: method,
      selectedCard: undefined,
      newCard: undefined,
      error: undefined
    }));
  }, []);

  // Select saved card
  const selectSavedCard = useCallback((card: SavedCard) => {
    setPaymentState(prev => ({
      ...prev,
      selectedCard: card,
      newCard: undefined,
      error: undefined
    }));
  }, []);

  // Update new card data
  const updateNewCard = useCallback((cardData: Partial<NonNullable<PaymentState['newCard']>>) => {
    setPaymentState(prev => ({
      ...prev,
      newCard: {
        number: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        holderName: '',
        ...prev.newCard,
        ...cardData
      },
      error: undefined
    }));
  }, []);

  // Update billing address
  const updateBillingAddress = useCallback((address: Partial<NonNullable<PaymentState['billingAddress']>>) => {
    setPaymentState(prev => ({
      ...prev,
      billingAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        ...prev.billingAddress,
        ...address
      },
      error: undefined
    }));
  }, []);

  // Validate payment data
  const validatePaymentData = useCallback((): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    const { selectedMethod, selectedCard, newCard, billingAddress } = paymentState;

    if (!selectedMethod) {
      errors.push('Please select a payment method');
      return { isValid: false, errors };
    }

    if (selectedMethod.type === 'card') {
      if (selectedCard) {
        // Using saved card - no additional validation needed
      } else if (newCard) {
        // Validate new card
        if (!validateCardNumber(newCard.number)) {
          errors.push('Invalid card number');
        }
        
        if (!validateExpiryDate(newCard.expiryMonth, newCard.expiryYear)) {
          errors.push('Invalid or expired card');
        }
        
        if (!validateCVV(newCard.cvv)) {
          errors.push('Invalid CVV code');
        }
        
        if (!newCard.holderName.trim()) {
          errors.push('Cardholder name is required');
        }

        // Validate billing address for new cards
        if (billingAddress) {
          const addressValidation = validateAddress(billingAddress);
          if (!addressValidation.isValid) {
            errors.push(...addressValidation.errors);
          }
        } else {
          errors.push('Billing address is required');
        }
      } else {
        errors.push('Please select a card or add a new one');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }, [paymentState]);

  // Process payment
  const processPayment = useCallback(async (): Promise<{ success: boolean; transactionId?: string; error?: string }> => {
    const validation = validatePaymentData();
    if (!validation.isValid) {
      const error = validation.errors.join(', ');
      setPaymentState(prev => ({ ...prev, error }));
      return { success: false, error };
    }

    if (!checkoutData || !paymentState.selectedMethod) {
      const error = 'Missing checkout or payment data';
      setPaymentState(prev => ({ ...prev, error }));
      return { success: false, error };
    }

    setPaymentState(prev => ({
      ...prev,
      step: 'processing',
      isProcessing: true,
      error: undefined
    }));

    try {
      const result = await simulatePaymentProcessing(
        checkoutData.total,
        paymentState.selectedMethod,
        paymentState.selectedCard || paymentState.newCard
      );

      if (result.success) {
        setPaymentState(prev => ({
          ...prev,
          step: 'complete',
          isProcessing: false
        }));
      } else {
        setPaymentState(prev => ({
          ...prev,
          step: 'payment',
          isProcessing: false,
          error: result.error
        }));
      }

      return result;
    } catch (error) {
      const errorMessage = 'Payment processing failed. Please try again.';
      setPaymentState(prev => ({
        ...prev,
        step: 'payment',
        isProcessing: false,
        error: errorMessage
      }));
      return { success: false, error: errorMessage };
    }
  }, [paymentState, checkoutData, validatePaymentData]);

  // Reset payment state
  const resetPayment = useCallback(() => {
    setPaymentState({
      step: 'summary',
      isProcessing: false
    });
    setCheckoutData(null);
  }, []);

  // Set error
  const setError = useCallback((error: string) => {
    setPaymentState(prev => ({ ...prev, error }));
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setPaymentState(prev => ({ ...prev, error: undefined }));
  }, []);

  return {
    // State
    paymentState,
    checkoutData,
    availablePaymentMethods,
    savedCards,
    
    // Actions
    initializeCheckout,
    goToPaymentStep,
    goBackToSummary,
    selectPaymentMethod,
    selectSavedCard,
    updateNewCard,
    updateBillingAddress,
    validatePaymentData,
    processPayment,
    resetPayment,
    setError,
    clearError,
    
    // Computed values
    isProcessing: paymentState.isProcessing,
    currentStep: paymentState.step,
    hasError: !!paymentState.error,
    errorMessage: paymentState.error
  };
};