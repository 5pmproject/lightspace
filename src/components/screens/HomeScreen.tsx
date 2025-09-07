/* ==================== 리팩토링된 HomeScreen.tsx 시작 ==================== */
import React, { useCallback, useMemo } from 'react';
import { Search, ShoppingCart, Camera, Filter } from 'lucide-react';
import { Product, Category } from '../../types';
import { FeaturedCard } from '../product/FeaturedCard';
import { ProductCard } from '../product/ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

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

/**
 * HomeScreen 컴포넌트 - LightSpace 앱의 메인 화면
 * 
 * 주요 기능:
 * - 제품 검색 및 카테고리 필터링
 * - Featured 제품 캐러셀
 * - 제품 그리드 표시
 * - 장바구니 및 위시리스트 관리
 */
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
  // ==================== 이벤트 핸들러 최적화 ====================
  
  /**
   * 검색 입력 핸들러 - 메모화로 불필요한 리렌더링 방지
   */
  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, [setSearchQuery]);

  /**
   * 검색 키보드 이벤트 핸들러 - Enter 키 처리
   */
  const handleSearchKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // 필요시 검색 실행 로직 추가
    }
  }, []);

  /**
   * 카테고리 변경 핸들러 - 메모화로 성능 최적화
   */
  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, [setSelectedCategory]);

  /**
   * 필터 초기화 핸들러
   */
  const handleClearFilters = useCallback(() => {
    setSelectedCategory('');
    setSearchQuery('');
  }, [setSelectedCategory, setSearchQuery]);

  /**
   * 카메라 버튼 클릭 핸들러 - 안전한 이벤트 처리
   */
  const handleCameraClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onCameraClick();
  }, [onCameraClick]);

  /**
   * 장바구니 버튼 클릭 핸들러 - 안전한 이벤트 처리
   */
  const handleCartClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onCartClick();
  }, [onCartClick]);

  // ==================== 계산된 값들 메모화 ====================

  /**
   * 선택된 카테고리 정보 - 메모화로 성능 최적화
   */
  const selectedCategoryInfo = useMemo(() => {
    return categories.find(cat => cat.id === selectedCategory);
  }, [categories, selectedCategory]);

  /**
   * 제품 개수 텍스트 - 메모화
   */
  const productCountText = useMemo(() => {
    const count = filteredProducts.length;
    return `${count} ${count === 1 ? 'product' : 'products'}`;
  }, [filteredProducts.length]);

  /**
   * 헤더 타이틀 - 선택된 카테고리에 따라 동적 생성
   */
  const productsTitle = useMemo(() => {
    if (!selectedCategory || selectedCategory === '') {
      return 'All Products';
    }
    return selectedCategoryInfo?.name || 'Products';
  }, [selectedCategory, selectedCategoryInfo]);

  /**
   * 장바구니 배지 표시 여부
   */
  const showCartBadge = useMemo(() => cartItemCount > 0, [cartItemCount]);

  /**
   * 장바구니 배지 텍스트
   */
  const cartBadgeText = useMemo(() => {
    return cartItemCount > 9 ? '9+' : cartItemCount.toString();
  }, [cartItemCount]);

  // ==================== 렌더링 컴포넌트들 ====================

  /**
   * 헤더 섹션 컴포넌트
   */
  const HeaderSection = useMemo(() => (
    <header className="bg-gradient-to-r from-green-800 to-green-700 px-4 py-6" role="banner">
      <div className="flex items-center justify-between mb-4">
        {/* 브랜드 로고 영역 */}
        <div>
          <h1 className="text-2xl font-bold text-white">LightSpace</h1>
          <p className="text-green-100 text-sm">Illuminate your space</p>
        </div>

        {/* 액션 버튼 영역 */}
        <nav className="flex items-center space-x-3" role="navigation" aria-label="Secondary navigation">
          <button
            type="button"
            onClick={handleCameraClick}
            aria-label="Search by photo - Upload an image to find similar products"
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            <Camera className="w-6 h-6 text-white" aria-hidden="true" />
          </button>
          
          <button
            type="button"
            onClick={handleCartClick}
            aria-label={`Shopping cart with ${cartItemCount} items`}
            className="relative p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            <ShoppingCart className="w-6 h-6 text-white" aria-hidden="true" />
            {showCartBadge && (
              <span 
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium shadow-lg"
                aria-label={`${cartItemCount} items in cart`}
              >
                {cartBadgeText}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* 검색바 */}
      <div className="relative">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
          aria-hidden="true" 
        />
        <input
          type="text"
          placeholder="Search for the perfect light..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border-0 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-transparent text-gray-900 placeholder-gray-500 shadow-sm"
          aria-label="Search products"
        />
      </div>
    </header>
  ), [
    handleCameraClick,
    handleCartClick,
    cartItemCount,
    showCartBadge,
    cartBadgeText,
    searchQuery,
    handleSearchChange,
    handleSearchKeyDown
  ]);

  /**
   * 카테고리 필터 섹션
   */
  const CategoryFilterSection = useMemo(() => (
    <section className="px-4 py-4" role="region" aria-label="Product categories">
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          type="button"
          onClick={() => handleCategoryChange('')}
          className={`whitespace-nowrap px-4 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            selectedCategory === ''
              ? 'bg-green-800 text-white hover:bg-green-700 focus:ring-green-600 shadow-md'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-300 shadow-sm'
          }`}
          aria-pressed={selectedCategory === ''}
          aria-label="Show all products"
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => handleCategoryChange(category.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              selectedCategory === category.id
                ? 'bg-green-800 text-white hover:bg-green-700 focus:ring-green-600 shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-300 shadow-sm'
            }`}
            aria-pressed={selectedCategory === category.id}
            aria-label={`Filter by ${category.name} category`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  ), [categories, selectedCategory, handleCategoryChange]);

  /**
   * Featured 제품 캐러셀 섹션
   */
  const FeaturedSection = useMemo(() => {
    if (featuredProducts.length === 0) return null;

    return (
      <section className="px-4 py-6" role="region" aria-label="Featured products">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Featured</h2>
          <button
            type="button"
            className="text-green-800 text-sm font-medium hover:text-green-700 hover:underline focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 rounded-md px-2 py-1"
            aria-label="View all featured products"
          >
            View All
          </button>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {featuredProducts.map((product) => (
              <CarouselItem 
                key={product.id} 
                className="pl-2 md:pl-4 basis-[280px] md:basis-[320px]"
              >
                <FeaturedCard
                  product={product}
                  onProductClick={onProductClick}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isInWishlist={isInWishlist(product.id)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious 
            className="hidden md:flex -left-4 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-0"
            aria-label="Previous featured product"
          />
          <CarouselNext 
            className="hidden md:flex -right-4 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-0"
            aria-label="Next featured product"
          />
        </Carousel>
      </section>
    );
  }, [featuredProducts, onProductClick, onAddToCart, onToggleWishlist, isInWishlist]);

  /**
   * 제품 그리드 섹션
   */
  const ProductGridSection = useMemo(() => (
    <section className="px-4 pb-20" role="region" aria-label="Product catalog">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{productsTitle}</h2>
          <p className="text-sm text-gray-600 mt-1">{productCountText}</p>
        </div>
        <button
          type="button"
          className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 shadow-sm transition-colors duration-200"
          aria-label="Filter and sort products"
        >
          <Filter className="w-4 h-4" aria-hidden="true" />
          <span>Filter</span>
        </button>
      </div>

      {filteredProducts.length > 0 ? (
        <div 
          className="grid grid-cols-2 gap-4"
          role="grid"
          aria-label="Product grid"
        >
          {filteredProducts.map((product) => (
            <div key={product.id} role="gridcell">
              <ProductCard
                product={product}
                onProductClick={onProductClick}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={isInWishlist(product.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12" role="status" aria-live="polite">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 max-w-sm mx-auto mb-4">
            Try adjusting your search or category filter to find what you're looking for.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-colors duration-200"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  ), [
    productsTitle,
    productCountText,
    filteredProducts,
    onProductClick,
    onAddToCart,
    onToggleWishlist,
    isInWishlist,
    handleClearFilters
  ]);

  // ==================== 메인 렌더링 ====================
  return (
    <div className="min-h-screen bg-gray-50">
      {HeaderSection}
      {CategoryFilterSection}
      {FeaturedSection}
      {ProductGridSection}
    </div>
  );
};
/* ==================== 리팩토링된 HomeScreen.tsx 끝 ==================== */