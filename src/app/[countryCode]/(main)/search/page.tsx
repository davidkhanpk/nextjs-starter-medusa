import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SearchResults from './search-results'

type Props = {
  params: { countryCode: string }
  searchParams: { q?: string }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = searchParams.q || ''
  
  return {
    title: query ? `Search results for "${query}"` : 'Search',
    description: `Find products matching "${query}"`,
  }
}

export default function SearchPage({ params, searchParams }: Props) {
  const query = searchParams.q
  
  if (!query) {
    notFound()
  }

  return (
    <div className="content-container py-6">
      <SearchResults 
        query={query} 
        countryCode={params.countryCode} 
      />
    </div>
  )
}
