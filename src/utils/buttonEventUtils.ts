/* ==================== buttonEventUtils.ts 시작 ==================== */
/**
 * 버튼 이벤트 처리를 위한 유틸리티 함수들
 * 참고: React SyntheticEvent 공식 문서 (https://react.dev/reference/react-dom/components/common#applying-css-styles)
 */

/**
 * 이벤트 전파를 안전하게 중단하는 함수
 * 마치 도미노가 쓰러지는 것을 중간에 막는 것처럼 이벤트 버블링을 차단
 */
export const stopEventPropagation = (event: React.MouseEvent | React.KeyboardEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

/**
 * 키보드 접근성을 위한 Enter/Space 키 핸들러
 * 스크린 리더 사용자도 마우스 사용자처럼 동일한 경험을 할 수 있도록 지원
 */
export const handleKeyboardActivation = (
  event: React.KeyboardEvent,
  callback: () => void
) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    event.stopPropagation();
    callback();
  }
};

/**
 * 비동기 버튼 액션을 안전하게 처리하는 래퍼 함수
 * 중복 클릭 방지와 에러 핸들링을 포함
 */
export const createAsyncButtonHandler = <T extends any[]>(
  asyncAction: (...args: T) => Promise<void>,
  options: {
    onStart?: () => void;
    onFinish?: () => void;
    onError?: (error: Error) => void;
  } = {}
) => {
  let isProcessing = false;

  return async (...args: T) => {
    if (isProcessing) return;

    isProcessing = true;
    options.onStart?.();

    try {
      await asyncAction(...args);
    } catch (error) {
      options.onError?.(error instanceof Error ? error : new Error('Unknown error'));
    } finally {
      isProcessing = false;
      options.onFinish?.();
    }
  };
};

/**
 * 디바운스된 검색 핸들러
 * 타이핑할 때마다 검색하지 않고 사용자가 입력을 멈춘 후 실행
 */
export const createDebouncedSearchHandler = (
  callback: (query: string) => void,
  delay: number = 300
) => {
  let timeoutId: NodeJS.Timeout;

  return (query: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(query), delay);
  };
};

/**
 * 접근성 레이블 생성 유틸리티
 * 상품 정보를 바탕으로 스크린 리더용 설명 생성
 */
export const createAccessibilityLabel = (
  productName: string,
  price: number,
  discount?: number,
  isInWishlist?: boolean
) => {
  const discountedPrice = discount ? price * (1 - discount / 100) : price;
  const priceText = discount 
    ? `$${discountedPrice.toFixed(2)} (${discount}% off from $${price.toFixed(2)})`
    : `$${price.toFixed(2)}`;
  
  const wishlistText = isInWishlist ? ', in wishlist' : '';
  
  return `${productName}, priced at ${priceText}${wishlistText}`;
};

/**
 * 포커스 관리 유틸리티
 * 모달이나 드롭다운 닫힌 후 원래 요소로 포커스 복귀
 */
export const createFocusManager = () => {
  let previouslyFocusedElement: HTMLElement | null = null;

  return {
    saveFocus: () => {
      previouslyFocusedElement = document.activeElement as HTMLElement;
    },
    restoreFocus: () => {
      if (previouslyFocusedElement && previouslyFocusedElement.focus) {
        previouslyFocusedElement.focus();
      }
    },
    trapFocus: (containerElement: HTMLElement) => {
      const focusableElements = containerElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') return;

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      };

      containerElement.addEventListener('keydown', handleTabKey);
      firstElement?.focus();

      return () => {
        containerElement.removeEventListener('keydown', handleTabKey);
      };
    }
  };
};

/**
 * 스크롤 위치 기반 버튼 표시/숨김 제어
 * 사용자가 스크롤할 때 부드럽게 나타나거나 사라지는 효과
 */
export const createScrollBasedVisibility = (
  threshold: number = 100,
  callback: (isVisible: boolean) => void
) => {
  let isVisible = true;
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const shouldShow = currentScrollY < lastScrollY || currentScrollY < threshold;

    if (shouldShow !== isVisible) {
      isVisible = shouldShow;
      callback(isVisible);
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};
/* ==================== buttonEventUtils.ts 끝 ==================== */