import React, { useState, useMemo, useCallback } from 'react';
import { Screen, Product } from './types';
import { products, featuredProducts } from './data/products';
import { categories } from './data/categories';
import { useCart } from './hooks/useCart';
import { useWishlist } from './hooks/useWishlist';
import { useNotification } from './hooks/useNotification';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Notification } from './components/common/Notification';
import { ImageUploadModal } from './components/common/ImageUploadModal';
import { HomeScreen } from './components/screens/HomeScreen';
import { ProductScreen } from './components/screens/ProductScreen';
import { CartScreen } from './components/screens/CartScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false);

  const { cart, addToCart, removeFromCart, cartItemCount, cartTotal } = useCart();
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

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product');
  }, []);

  const handleImageUploadComplete = useCallback(() => {
    showNotificationMessage('Found 5 similar products!');
  }, [showNotificationMessage]);

  // Memoized screen navigation handlers
  const handleCartClick = useCallback(() => setCurrentScreen('cart'), []);
  const handleBackToHome = useCallback(() => setCurrentScreen('home'), []);
  const handleShowImageUpload = useCallback(() => setShowImageUpload(true), []);
  const handleCloseImageUpload = useCallback(() => setShowImageUpload(false), []);

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
      onCameraClick={handleShowImageUpload}
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
    handleShowImageUpload,
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
        onBuyNow={handleAddToCartAndNavigate}
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
      handleAddToCartAndNavigate,
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
    />
  ), [
    cart,
    cartItemCount,
    cartTotal,
    handleBackToHome,
    handleAddToCart,
    removeFromCart
  ]);

  return (
    <ErrorBoundary>
      <main 
        className="w-full max-w-md mx-auto bg-white min-h-screen relative lg:max-w-lg xl:max-w-xl"
        role="main"
        aria-label="LightSpace Shopping App"
      >
        <Notification show={showNotification} message={notificationMessage} />
        <ImageUploadModal 
          show={showImageUpload}
          onClose={handleCloseImageUpload}
          onUploadComplete={handleImageUploadComplete}
        />
        
        {currentScreen === 'home' && homeScreen}
        {currentScreen === 'product' && productScreen}
        {currentScreen === 'cart' && cartScreen}
      </main>
    </ErrorBoundary>
  );
};

export default App;