import { cache } from "react";

export interface PuckPageData {
  id: string;
  slug: string;
  pageName: string;
  pageType: string;
  status: string;
  puckData: any;
  isDefault: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Fetch page data from Shopikool backend by slug
 * Cached for the lifetime of the request
 */
export const getPageBySlug = cache(async (slug: string): Promise<PuckPageData | null> => {
  const BACKEND_URL = process.env.SHOPIKOOL_API_URL || "http://localhost:3000/api";
  const STORE_ID = process.env.STORE_ID || "";

  if (!STORE_ID) {
    console.error("STORE_ID is not set");
    return null;
  }

  try {
    const response = await fetch(
      `${BACKEND_URL}/stores/${STORE_ID}/pages/slug/${slug}`,
      {
        next: { 
          tags: [`page-${slug}`],
          revalidate: 300, // 5 minutes
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch page: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching page by slug:", error);
    return null;
  }
});

/**
 * Fetch all published pages for static generation
 */
export async function getAllPublishedPages(): Promise<PuckPageData[]> {
  const BACKEND_URL = process.env.SHOPIKOOL_API_URL || "http://localhost:3000/api";
  const STORE_ID = process.env.STORE_ID || "";

  if (!STORE_ID) {
    console.error("STORE_ID is not set");
    return [];
  }

  try {
    const response = await fetch(
      `${BACKEND_URL}/stores/${STORE_ID}/pages?status=PUBLISHED`,
      {
        next: { 
          tags: ['pages'],
          revalidate: 600, // 10 minutes
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch pages: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all published pages:", error);
    return [];
  }
}

/**
 * Fetch default homepage
 */
export async function getHomepage(): Promise<PuckPageData | null> {
  const BACKEND_URL = process.env.SHOPIKOOL_API_URL || "http://localhost:3000/api";
  const STORE_ID = process.env.STORE_ID || "";

  if (!STORE_ID) {
    console.error("STORE_ID is not set");
    return null;
  }

  try {
    const response = await fetch(
      `${BACKEND_URL}/stores/${STORE_ID}/pages/default/HOMEPAGE`,
      {
        next: { 
          tags: ['homepage'],
          revalidate: 300, // 5 minutes
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch homepage: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching homepage:", error);
    return null;
  }
}
