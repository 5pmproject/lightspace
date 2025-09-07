import React, { useState, useMemo, useCallback } from 'react';
import { Screen, Product } from './types';
import { products, featuredProducts } from './data/products';
import { categories } from './data/categories';
import { useCart } from './hooks/useCart';
import { useWishlist } from './hooks/useWishlist';
import { useNotification } from './hooks/useNotification';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Notification } from './components/common/Notification';
import { HomeScreen } from './components/screens/HomeScreen';
import { ProductScreen } from './components/screens/ProductScreen';
import { CartScreen } from './components/screens/CartScreen';
import { OrderCompleteScreen } from './components/screens/OrderCompleteScreen';
import { CheckoutScreen } from './components/screens/CheckoutScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderData, setOrderData] = useState<any>(null);

  const { cart, addToCart, removeFromCart, cartItemCount, cartTotal, clearCart } = useCart();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();
  const { showNotification, notificationMessage, showNotificationMessage } = useNotification();

  // Memoized handlers to prevent unnecessary re-renders
  const handleToggleWishlist = useCallback((product: Product) => {
    const wasAdded = toggleWishlist(product);
    showNotificationMessage(wasAdded ? 'Added to wishlist!' : 'Removed from wishlist');
  }, [toggleWishlist, showNotificationMessage]);

  const handleAddToCart = useCallback((product: Product) => {
    addToCart(product);
    showNotificationMessage('Added to cart!');
  }, [addToCart, showNotificationMessage]);

  const handleAddToCartAndNavigate = useCallback((product: Product) => {
    addToCart(product);
    showNotificationMessage('Added to cart!');
    setCurrentScreen('cart');
  }, [addToCart, showNotificationMessage]);

  const handleBuyNow = useCallback((product: Product) => {
    // Clear cart and add only this product
    clearCart();
    addToCart(product);
    showNotificationMessage('Proceeding to checkout...');
    setCurrentScreen('checkout');
  }, [clearCart, addToCart, showNotificationMessage]);

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product');
  }, []);

  // 체크아웃 관련 핸들러들
  const handleGoToCheckout = useCallback(() => {
    if (cart.length === 0) {
      showNotificationMessage('Your cart is empty');
      return;
    }
    setCurrentScreen('checkout');
  }, [cart, showNotificationMessage]);

  const handleCheckoutComplete = useCallback((orderData: any) => {
    setOrderData(orderData);
    setCurrentScreen('order-complete');
    clearCart(); // 장바구니 비우기
    showNotificationMessage('🎉 주문이 완료되었습니다!');
  }, [clearCart, showNotificationMessage]);

  // 주문 완료 관련 핸들러들 (기존 방식 유지)
  const handleCheckout = useCallback(() => {
    // 랜덤 주문 번호 생성
    const orderNumber = `LS${Date.now().toString().slice(-8)}`;
    
    // 예상 배송일 계산 (현재 날짜 + 5-7일)
    const deliveryDays = Math.floor(Math.random() * 3) + 5; // 5-7일
    const estimatedDelivery = new Date(Date.now() + deliveryDays * 24 * 60 * 60 * 1000);
    
    const newOrder = {
      orderNumber,
      orderItems: [...cart],
      orderTotal: cartTotal,
      customerInfo: {
        name: 'John Doe',
        email: 'john.doe@example.com', 
        phone: '+1 (555) 123-4567',
        address: {
          street: '123 Main Street, Apt 4B',
          city: 'New York',
          state: 'NY',
          zipCode: '10001'
        }
      },
      estimatedDelivery: estimatedDelivery.toLocaleDateString('ko-KR', {
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
    
    setOrderData(newOrder);
    setCurrentScreen('order-complete');
    clearCart(); // 장바구니 비우기
    showNotificationMessage('🎉 주문이 완료되었습니다!');
  }, [cart, cartTotal, clearCart, showNotificationMessage]);

  const handleTrackOrder = useCallback(() => {
    showNotificationMessage('📦 주문 추적 페이지로 이동합니다');
    // 실제로는 주문 추적 페이지로 이동하거나 모달을 띄울 수 있습니다
  }, [showNotificationMessage]);

  const handleDownloadReceipt = useCallback(() => {
    showNotificationMessage('📄 영수증을 다운로드했습니다');
    // 실제로는 PDF 다운로드 기능을 구현할 수 있습니다
  }, [showNotificationMessage]);

  // Memoized screen navigation handlers
  const handleCartClick = useCallback(() => setCurrentScreen('cart'), []);
  
  const handleBackToHome = useCallback(() => {
    setCurrentScreen('home');
    setSelectedProduct(null);
    setOrderData(null);
  }, []);

  // Memoized filtered products to prevent unnecessary recalculations
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Memoized screen components
  const homeScreen = useMemo(() => (
    <HomeScreen
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      featuredProducts={featuredProducts}
      filteredProducts={filteredProducts}
      categories={categories}
      cartItemCount={cartItemCount}
      onProductClick={handleProductClick}
      onCartClick={handleCartClick}
      onAddToCart={handleAddToCart}
      onToggleWishlist={handleToggleWishlist}
      isInWishlist={isInWishlist}
    />
  ), [
    searchQuery,
    selectedCategory,
    filteredProducts,
    cartItemCount,
    handleProductClick,
    handleCartClick,
    handleAddToCart,
    handleToggleWishlist,
    isInWishlist
  ]);

  const productScreen = useMemo(() => 
    selectedProduct ? (
      <ProductScreen
        product={selectedProduct}
        cartItemCount={cartItemCount}
        onBack={handleBackToHome}
        onCartClick={handleCartClick}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={isInWishlist(selectedProduct.id)}
      />
    ) : null, 
    [
      selectedProduct,
      cartItemCount,
      handleBackToHome,
      handleCartClick,
      handleAddToCart,
      handleBuyNow,
      handleToggleWishlist,
      isInWishlist
    ]
  );

  const cartScreen = useMemo(() => (
    <CartScreen
      cart={cart}
      cartItemCount={cartItemCount}
      cartTotal={cartTotal}
      onBack={handleBackToHome}
      onAddToCart={handleAddToCart}
      onRemoveFromCart={removeFromCart}
      onCheckout={handleGoToCheckout}
      onQuickCheckout={handleCheckout}
    />
  ), [
    cart,
    cartItemCount,
    cartTotal,
    handleBackToHome,
    handleAddToCart,
    removeFromCart,
    handleGoToCheckout,
    handleCheckout
  ]);

  const orderCompleteScreen = useMemo(() => 
    orderData ? (
      <OrderCompleteScreen
        orderNumber={orderData.orderNumber}
        orderItems={orderData.orderItems}
        orderTotal={orderData.orderTotal}
        customerInfo={orderData.customerInfo}
        estimatedDelivery={orderData.estimatedDelivery}
        onBackToHome={handleBackToHome}
        onTrackOrder={handleTrackOrder}
        onDownloadReceipt={handleDownloadReceipt}
      />
    ) : null,
    [orderData, handleBackToHome, handleTrackOrder, handleDownloadReceipt]
  );

  const checkoutScreen = useMemo(() => (
    <CheckoutScreen
      cartItems={cart}
      onBack={handleBackToHome}
      onComplete={handleCheckoutComplete}
    />
  ), [cart, handleBackToHome, handleCheckoutComplete]);

  return (
    <ErrorBoundary>
      <main 
        className="w-full max-w-md mx-auto bg-white min-h-screen relative lg:max-w-lg xl:max-w-xl"
        role="main"
        aria-label="LightSpace Shopping App"
      >
        <Notification show={showNotification} message={notificationMessage} />
        
        {currentScreen === 'home' && homeScreen}
        {currentScreen === 'product' && productScreen}
        {currentScreen === 'cart' && cartScreen}
        {currentScreen === 'checkout' && checkoutScreen}
        {currentScreen === 'order-complete' && orderCompleteScreen}
      </main>
    </ErrorBoundary>
  );
};

export default App;