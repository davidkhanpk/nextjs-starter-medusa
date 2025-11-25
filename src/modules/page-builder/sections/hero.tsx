/**
 * Hero Section Component
 */

import { HeroSection as HeroSectionType } from '@lib/page-builder/types';
import { buildTailwindClasses } from '@lib/page-builder/tailwind-mapper';
import Link from 'next/link';

interface HeroSectionProps extends HeroSectionType {}

const HEIGHT_CLASSES = {
  sm: 'min-h-[300px]',
  md: 'min-h-[500px]',
  lg: 'min-h-[700px]',
  full: 'min-h-screen',
};

const TEXT_ALIGN_CLASSES = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
};

export default function HeroSection(props: HeroSectionProps) {
  const {
    title,
    subtitle,
    variant,
    height,
    backgroundImage,
    backgroundVideo,
    ctaText,
    ctaLink,
    secondaryCtaText,
    secondaryCtaLink,
    overlayOpacity = 40,
    textAlign,
    showScrollIndicator,
  } = props;

  const heightClass = HEIGHT_CLASSES[height];
  const alignClass = TEXT_ALIGN_CLASSES[textAlign];

  // Gradient background for gradient variant
  const gradientBg = variant === 'gradient' 
    ? 'bg-gradient-to-br from-primary to-secondary' 
    : '';

  return (
    <div className={`relative ${heightClass} flex items-center justify-center overflow-hidden ${gradientBg}`}>
      {/* Background Image */}
      {variant === 'image' && backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div 
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity / 100 }}
          />
        </>
      )}

      {/* Background Video */}
      {variant === 'video' && backgroundVideo && (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <div 
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity / 100 }}
          />
        </>
      )}

      {/* Content */}
      <div className={`relative z-10 content-container px-4 md:px-8 py-12 flex flex-col ${alignClass}`}>
        {subtitle && (
          <p className="text-sm md:text-base uppercase tracking-wide mb-4 opacity-90">
            {subtitle}
          </p>
        )}
        
        {title && (
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 max-w-4xl">
            {title}
          </h1>
        )}

        {/* CTAs */}
        {(ctaText || secondaryCtaText) && (
          <div className="flex flex-wrap gap-4 mt-8">
            {ctaText && ctaLink && (
              <Link
                href={ctaLink}
                className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                {ctaText}
              </Link>
            )}
            {secondaryCtaText && secondaryCtaLink && (
              <Link
                href={secondaryCtaLink}
                className="px-8 py-4 bg-transparent border-2 border-current font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 opacity-70"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      )}
    </div>
  );
}
