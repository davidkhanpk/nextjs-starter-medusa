/**
 * Custom HTML Section
 * Allows embedding custom HTML, CSS, and JavaScript
 */

'use client';

import { CustomHtmlSection as CustomHtmlSectionType } from '@lib/page-builder/types';
import { useEffect, useRef } from 'react';

interface CustomHTMLSectionProps extends CustomHtmlSectionType {}

export default function CustomHTMLSection(props: CustomHTMLSectionProps) {
  const { html, css } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject custom CSS if provided
    if (css && typeof window !== 'undefined') {
      const styleEl = document.createElement('style');
      styleEl.textContent = css;
      styleEl.id = `custom-section-${props.id}`;
      document.head.appendChild(styleEl);

      return () => {
        const existingStyle = document.getElementById(`custom-section-${props.id}`);
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    }
  }, [css, props.id]);

  return (
    <div 
      ref={containerRef}
      className="content-container py-12"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
