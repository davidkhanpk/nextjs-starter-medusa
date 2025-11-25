/**
 * Newsletter Section
 */

'use client';

import { NewsletterSection as NewsletterSectionType } from '@lib/page-builder/types';
import NewsletterForm from '@modules/layout/components/newsletter-form';

interface NewsletterSectionProps extends NewsletterSectionType {}

export default function NewsletterSection(props: NewsletterSectionProps) {
  const {
    title,
    subtitle,
    layout,
    showImage,
    image,
  } = props;

  if (layout === 'banner') {
    return (
      <div className="bg-primary text-white py-16">
        <div className="content-container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {showImage && image && (
              <div className="hidden md:block">
                <img 
                  src={image} 
                  alt="Newsletter" 
                  className="rounded-lg w-full h-auto"
                />
              </div>
            )}
            <div className={showImage && image ? '' : 'md:col-span-2 max-w-2xl mx-auto text-center'}>
              {subtitle && (
                <p className="text-sm uppercase tracking-wide mb-2 opacity-90">
                  {subtitle}
                </p>
              )}
              {title && (
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {title}
                </h2>
              )}
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container py-12">
      <div className="max-w-2xl mx-auto text-center">
        {subtitle && (
          <p className="text-sm uppercase tracking-wide text-muted mb-2">
            {subtitle}
          </p>
        )}
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {title}
          </h2>
        )}
        <NewsletterForm />
      </div>
    </div>
  );
}
