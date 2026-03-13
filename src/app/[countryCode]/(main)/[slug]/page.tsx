import { Metadata } from "next"
import { notFound } from "next/navigation"
import { ServerPageRenderer } from "@/lib/page-builder/page-renderer"

interface PageProps {
  params: {
    countryCode: string
    slug: string
  }
}

// Get page data by slug
async function getPageBySlug(slug: string) {
  const backendUrl = process.env.SHOPIKOOL_API_URL || 'http://localhost:3000'
  const storeId = process.env.STORE_ID

  if (!storeId) {
    throw new Error('STORE_ID is not configured')
  }

  try {
    const response = await fetch(
      `${backendUrl}/stores/${storeId}/pages/slug/${slug}`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    )

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPageBySlug(params.slug)

  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: page.metaTitle || page.pageName,
    description: page.metaDescription || `${page.pageName} - ${page.pageType}`,
    keywords: page.metaKeywords,
    openGraph: page.ogImage ? {
      images: [page.ogImage],
    } : undefined,
  }
}

export default async function CustomPage({ params }: PageProps) {
  const page = await getPageBySlug(params.slug)

  if (!page || page.status !== 'PUBLISHED') {
    notFound()
  }

  return (
    <div className="w-full">
      <ServerPageRenderer sections={page.sections} />
      
      {/* Custom CSS if provided */}
      {page.customCss && (
        <style dangerouslySetInnerHTML={{ __html: page.customCss }} />
      )}
      
      {/* Custom JS if provided */}
      {page.customJs && (
        <script dangerouslySetInnerHTML={{ __html: page.customJs }} />
      )}
    </div>
  )
}
