/**
 * Dynamic Page Renderer
 * 
 * Renders a page from its configuration by dynamically loading
 * and rendering sections in the correct order.
 */

'use client';

import { PageSection } from './types';
import { getSectionComponent } from './section-registry';
import { buildTailwindClasses } from './tailwind-mapper';

interface PageRendererProps {
  sections: PageSection[];
  className?: string;
}

/**
 * Renders a complete page from section configurations
 */
export function PageRenderer({ sections, className = '' }: PageRendererProps) {
  // Filter enabled sections and sort by order
  const activeSections = sections
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);

  if (activeSections.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-gray-500">
        <p>No sections configured for this page.</p>
      </div>
    );
  }

  return (
    <div className={`page-builder ${className}`}>
      {activeSections.map((section, index) => (
        <SectionRenderer 
          key={section.id || `section-${index}`} 
          section={section} 
        />
      ))}
    </div>
  );
}

interface SectionRendererProps {
  section: PageSection;
}

/**
 * Renders a single section based on its type
 */
export function SectionRenderer({ section }: SectionRendererProps) {
  const Component = getSectionComponent(section.type);

  if (!Component) {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="border-2 border-dashed border-red-500 p-8 text-center">
          <p className="text-red-600 font-semibold">
            Section type "{section.type}" not found
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Please register this section type in the section registry
          </p>
        </div>
      );
    }
    return null;
  }

  // Build container classes from section style configuration
  const containerClasses = section.style 
    ? buildTailwindClasses(section.style)
    : '';

  return (
    <section 
      id={section.id}
      className={`page-section ${containerClasses}`}
      data-section-type={section.type}
    >
      {/* @ts-expect-error - Dynamic component with varying props */}
      <Component {...section} />
    </section>
  );
}

/**
 * Server-side page renderer for SSR/SSG
 */
interface ServerPageRendererProps {
  sections: PageSection[];
  className?: string;
}

export async function ServerPageRenderer({ 
  sections, 
  className = '' 
}: ServerPageRendererProps) {
  // Filter enabled sections and sort by order
  const activeSections = sections
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);

  if (activeSections.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-gray-500">
        <p>No sections configured for this page.</p>
      </div>
    );
  }

  return (
    <div className={`page-builder ${className}`}>
      {activeSections.map((section, index) => {
        const Component = getSectionComponent(section.type);
        
        if (!Component) return null;

        // Build container classes from section style configuration
        const containerClasses = section.style 
          ? buildTailwindClasses(section.style)
          : '';

        return (
          <section 
            key={section.id || `section-${index}`}
            id={section.id}
            className={`page-section ${containerClasses}`}
            data-section-type={section.type}
          >
            {/* @ts-expect-error - Dynamic component with varying props */}
            <Component {...section} />
          </section>
        );
      })}
    </div>
  );
}

/**
 * Hook to get page configuration from API
 */
export async function getPageConfig(
  storeId: string, 
  pageType: string
): Promise<PageSection[]> {
  try {
    const response = await fetch(
      `${process.env.SHOPIKOOL_API_URL}/stores/${storeId}/pages/default/${pageType}`,
      {
        next: { revalidate: 60 }, // Cache for 1 minute
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch page config: ${response.statusText}`);
    }

    const data = await response.json();
    return data.sections || [];
  } catch (error) {
    console.error('Error fetching page config:', error);
    return [];
  }
}

/**
 * Hook to get custom page by slug
 */
export async function getCustomPageConfig(
  storeId: string, 
  slug: string
): Promise<PageSection[]> {
  try {
    const response = await fetch(
      `${process.env.SHOPIKOOL_API_URL}/stores/${storeId}/pages/slug/${slug}`,
      {
        next: { revalidate: 60 }, // Cache for 1 minute
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch page config: ${response.statusText}`);
    }

    const data = await response.json();
    return data.sections || [];
  } catch (error) {
    console.error('Error fetching custom page config:', error);
    return [];
  }
}

/**
 * Utility to validate section configuration
 */
export function validateSection(section: PageSection): boolean {
  // Basic validation
  if (!section.id || !section.type) {
    console.error('Section missing required fields:', section);
    return false;
  }

  // Check if section type is registered
  const Component = getSectionComponent(section.type);
  if (!Component) {
    console.error(`Unknown section type: ${section.type}`);
    return false;
  }

  return true;
}

/**
 * Utility to validate entire page configuration
 */
export function validatePageConfig(sections: PageSection[]): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!Array.isArray(sections)) {
    errors.push('Sections must be an array');
    return { isValid: false, errors };
  }

  sections.forEach((section, index) => {
    if (!validateSection(section)) {
      errors.push(`Invalid section at index ${index}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}
