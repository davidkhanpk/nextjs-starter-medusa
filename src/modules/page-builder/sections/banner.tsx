/**
 * Banner Section Component
 */

import { BannerSection as BannerSectionType } from '@lib/page-builder/types';
import Image from 'next/image';
import Link from 'next/link';

interface BannerSectionProps extends BannerSectionType {}

const HEIGHT_CLASSES = {
  sm: 'h-48 md:h-64',
  md: 'h-64 md:h-96',
  lg: 'h-96 md:h-[600px]',
  auto: 'h-auto',
};

export default function BannerSection(props: BannerSectionProps) {
  const {
    image,
    mobileImage,
    link,
    altText,
    height,
    fullWidth,
  } = props;

  const heightClass = HEIGHT_CLASSES[height];
  const containerClass = fullWidth ? 'w-full' : 'content-container mx-auto px-4';

  const content = (
    <div className={`relative ${heightClass} overflow-hidden rounded-lg`}>
      {/* Desktop Image */}
      <div className="hidden md:block relative w-full h-full">
        <Image
          src={image}
          alt={altText}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Mobile Image */}
      <div className="block md:hidden relative w-full h-full">
        <Image
          src={mobileImage || image}
          alt={altText}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Hover Overlay */}
      {link && (
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
      )}
    </div>
  );

  return (
    <div className={containerClass}>
      {link ? (
        <Link href={link} className="block">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}
