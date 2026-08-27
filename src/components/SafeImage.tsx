import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  fallbackPlaceholder?: React.ReactNode;
  containerClassName?: string;
  aspectRatio?: string;
}

/**
 * Transforms standard Imgur page URLs to direct image URLs if necessary
 */
export function normalizeImgurUrl(url: string): string {
  if (!url || url.includes('undefined') || url.trim() === '') return '';
  
  // If it's imgur.com/XXXXX (not i.imgur.com and no extension)
  const imgurMatch = url.match(/https?:\/\/(?:www\.)?imgur\.com\/([a-zA-Z0-9]+)$/);
  if (imgurMatch && imgurMatch[1] && imgurMatch[1] !== 'undefined') {
    return `https://i.imgur.com/${imgurMatch[1]}.png`;
  }
  return url;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  containerClassName = '',
  fallbackPlaceholder,
  aspectRatio,
  ...props
}) => {
  const normalizedPrimary = normalizeImgurUrl(src);
  const normalizedFallback = fallbackSrc ? normalizeImgurUrl(fallbackSrc) : '';

  const [currentSrc, setCurrentSrc] = useState<string>(normalizedPrimary);
  const [hasError, setHasError] = useState<boolean>(!normalizedPrimary);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleError = () => {
    if (currentSrc === normalizedPrimary && normalizedFallback && normalizedFallback !== normalizedPrimary) {
      setCurrentSrc(normalizedFallback);
    } else {
      setHasError(true);
    }
  };

  if (hasError || !currentSrc) {
    if (fallbackPlaceholder) {
      return <div className={containerClassName}>{fallbackPlaceholder}</div>;
    }
    return null;
  }

  return (
    <div 
      className={`relative inline-block overflow-hidden ${containerClassName}`} 
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <img
        src={currentSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        {...props}
      />
    </div>
  );
};
