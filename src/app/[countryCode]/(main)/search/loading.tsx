export default function SearchLoading() {
  return (
    <div className="content-container py-6">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Grid skeleton */}
      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i} className="space-y-3">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
          </li>
        ))}
      </ul>
    </div>
  )
}
