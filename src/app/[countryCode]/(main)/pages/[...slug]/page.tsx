import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, getAllPublishedPages } from "@lib/puck/data";
import PuckRenderer from "@/components/puck/PuckRenderer";

interface PageProps {
  params: Promise<{
    countryCode: string;
    slug: string[];
  }>;
}

/**
 * Generate static params for all published pages
 * This enables static generation at build time
 */
export async function generateStaticParams() {
  // Return empty — pages render on-demand via SSR.
  // Multi-tenant image has no Medusa backend at Docker build time.
  return []
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugString = slug.join('/');
  
  const page = await getPageBySlug(slugString);
  
  if (!page) {
    return {
      title: "Page Not Found",
    };
  }
  
  return {
    title: page.metaTitle || page.pageName,
    description: page.metaDescription || `Read about ${page.pageName}`,
  };
}

/**
 * Dynamic Page Route
 * Handles all custom pages built with Puck editor
 */
export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const slugString = slug.join('/');
  
  // Fetch page data from Shopikool backend
  const page = await getPageBySlug(slugString);
  
  // If page doesn't exist, show 404
  if (!page) {
    notFound();
  }
  
  // If page is not published, show 404
  if (page.status !== 'PUBLISHED') {
    notFound();
  }
  
  // Render page with Puck
  return (
    <div className="dynamic-page">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{page.pageName}</h1>
        <PuckRenderer data={page.puckData} />
      </div>
    </div>
  );
}
