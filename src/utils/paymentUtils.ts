import { SavedCard, PaymentMethod } from '../types';

// Card validation utilities
export const validateCardNumber = (cardNumber: string): boolean => {
  // Remove spaces and non-digits
  const cleanNumber = cardNumber.replace(/\D/g, '');
  
  // Check length
  if (cleanNumber.length < 13 || cleanNumber.length > 19) {
    return false;
  }
  
  // Luhn algorithm validation
  let sum = 0;
  let isEven = false;
  
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

export const validateExpiryDate = (month: string, year: string): boolean => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  
  const expMonth = parseInt(month);
  const expYear = parseInt(year);
  
  // Check valid month
  if (expMonth < 1 || expMonth > 12) {
    return false;
  }
  
  // Check if card is expired
  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
    return false;
  }
  
  return true;
};

export const validateCVV = (cvv: string, cardType: string = ''): boolean => {
  const cleanCVV = cvv.replace(/\D/g, '');
  
  // American Express uses 4-digit CVV, others use 3-digit
  if (cardType.toLowerCase() === 'amex') {
    return cleanCVV.length === 4;
  }
  
  return cleanCVV.length === 3;
};

// Card formatting utilities
export const formatCardNumber = (cardNumber: string): string => {
  const cleanNumber = cardNumber.replace(/\D/g, '');
  
  // Format based on card type
  const cardType = getCardType(cleanNumber);
  
  if (cardType === 'amex') {
    // AMEX: 4-6-5 format
    return cleanNumber.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
  } else {
    // Others: 4-4-4-4 format
    return cleanNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
  }
};

export const maskCardNumber = (cardNumber: string): string => {
  const cleanNumber = cardNumber.replace(/\D/g, '');
  const last4 = cleanNumber.slice(-4);
  const masked = '*'.repeat(cleanNumber.length - 4);
  return formatCardNumber(masked + last4);
};

export const getCardType = (cardNumber: string): 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown' => {
  const cleanNumber = cardNumber.replace(/\D/g, '');
  
  if (/^4/.test(cleanNumber)) {
    return 'visa';
  } else if (/^5[1-5]/.test(cleanNumber) || /^2[2-7]/.test(cleanNumber)) {
    return 'mastercard';
  } else if (/^3[47]/.test(cleanNumber)) {
    return 'amex';
  } else if (/^6/.test(cleanNumber)) {
    return 'discover';
  }
  
  return 'unknown';
};

export const getCardIcon = (cardType: string): string => {
  const icons = {
    visa: '💳',
    mastercard: '💳',
    amex: '💳',
    discover: '💳',
    unknown: '💳'
  };
  
  return icons[cardType as keyof typeof icons] || icons.unknown;
};

// Payment processing simulation
export const simulatePaymentProcessing = async (
  amount: number,
  paymentMethod: PaymentMethod,
  card?: SavedCard | any
): Promise<{ success: boolean; transactionId?: string; error?: string }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
  
  // Simulate random failures (5% failure rate)
  const shouldFail = Math.random() < 0.05;
  
  if (shouldFail) {
    const errors = [
      'Payment declined by your bank',
      'Insufficient funds',
      'Card expired',
      'Invalid CVV code',
      'Payment processing failed'
    ];
    
    return {
      success: false,
      error: errors[Math.floor(Math.random() * errors.length)]
    };
  }
  
  // Generate transaction ID
  const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    success: true,
    transactionId
  };
};

// Address validation
export const validateAddress = (address: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!address.name?.trim()) {
    errors.push('Full name is required');
  }
  
  if (!address.email?.trim() || !/\S+@\S+\.\S+/.test(address.email)) {
    errors.push('Valid email address is required');
  }
  
  if (!address.phone?.trim()) {
    errors.push('Phone number is required');
  }
  
  if (!address.street?.trim()) {
    errors.push('Street address is required');
  }
  
  if (!address.city?.trim()) {
    errors.push('City is required');
  }
  
  if (!address.state?.trim()) {
    errors.push('State is required');
  }
  
  if (!address.zipCode?.trim()) {
    errors.push('ZIP code is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Tax and shipping calculations
export const calculateTax = (subtotal: number, taxRate: number = 0.08): number => {
  return Math.round(subtotal * taxRate * 100) / 100;
};

export const calculateShipping = (subtotal: number, items: any[]): number => {
  // Free shipping over $500
  if (subtotal >= 500) {
    return 0;
  }
  
  // Calculate based on item count and weight simulation
  const baseShipping = 15;
  const perItemFee = items.length * 2;
  
  return Math.min(baseShipping + perItemFee, 50); // Cap at $50
};

// Payment method data
export const getAvailablePaymentMethods = (): PaymentMethod[] => [
  {
    id: 'card',
    type: 'card',
    name: 'Credit/Debit Card',
    icon: '💳',
    isDefault: true
  },
  {
    id: 'paypal',
    type: 'paypal',
    name: 'PayPal',
    icon: '🅿️'
  },
  {
    id: 'apple-pay',
    type: 'apple-pay',
    name: 'Apple Pay',
    icon: '🍎'
  },
  {
    id: 'google-pay',
    type: 'google-pay',
    name: 'Google Pay',
    icon: '🅖'
  }
];

// Mock saved cards data
export const getMockSavedCards = (): SavedCard[] => [
  {
    id: 'card-1',
    last4: '4242',
    brand: 'visa',
    expiryMonth: 12,
    expiryYear: 2025,
    holderName: 'John Doe',
    isDefault: true
  },
  {
    id: 'card-2',
    last4: '8888',
    brand: 'mastercard',
    expiryMonth: 8,
    expiryYear: 2026,
    holderName: 'John Doe'
  }
];