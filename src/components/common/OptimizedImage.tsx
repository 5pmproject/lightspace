import React, { useState, useCallback } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  lazy?: boolean;
  aspectRatio?: string;
  sizes?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc,
  lazy = true,
  aspectRatio,
  sizes,
  className = '',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    onLoad?.(event);
  }, [onLoad]);

  const handleError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    }
    onError?.(event);
  }, [fallbackSrc, currentSrc, onError]);

  // Generate WebP and optimized URLs if possible
  const optimizedSrc = currentSrc.includes('unsplash.com') 
    ? `${currentSrc}&auto=format&fit=crop&w=800&q=80`
    : currentSrc;

  return (
    <div 
      className={`relative overflow-hidden bg-gray-100 ${aspectRatio ? `aspect-[${aspectRatio}]` : ''} ${className}`}
      role="img"
      aria-label={alt}
    >
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error state */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Image not available</span>
          </div>
        </div>
      )}

      <img
        src={optimizedSrc}
        alt={alt}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};