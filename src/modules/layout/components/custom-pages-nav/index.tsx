import Link from "next/link"

interface Page {
  id: string
  pageName: string
  slug: string
  pageType: string
  status: string
}

async function getPublishedPages() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace('/api', '') || 'http://localhost:3001'
  const storeId = process.env.NEXT_PUBLIC_STORE_ID

  if (!storeId) {
    return []
  }

  try {
    const response = await fetch(
      `${backendUrl}/api/stores/${storeId}/pages?status=PUBLISHED`,
      {
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      }
    )

    if (!response.ok) {
      return []
    }

    const pages = await response.json()
    
    // Filter out homepage and system pages, only show custom content pages
    return pages.filter((page: Page) => 
      ['ABOUT', 'CONTACT', 'CUSTOM'].includes(page.pageType)
    )
  } catch (error) {
    console.error('Error fetching pages:', error)
    return []
  }
}

export async function CustomPagesNav() {
  const pages = await getPublishedPages()

  if (pages.length === 0) {
    return null
  }

  return (
    <div className="flex items-center gap-x-6">
      {pages.map((page: Page) => (
        <Link
          key={page.id}
          href={`/${page.slug}`}
          className="text-sm text-ui-fg-subtle hover:text-ui-fg-base transition-colors"
        >
          {page.pageName}
        </Link>
      ))}
    </div>
  )
}
