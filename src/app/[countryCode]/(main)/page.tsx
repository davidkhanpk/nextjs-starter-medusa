import { Metadata } from "next"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getPageLayout } from "@lib/page-builder/api"
import { DynamicSectionRenderer } from "@lib/page-builder/section-renderer"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  // Get dynamic page layout (supports per-store customization)
  const pageLayout = await getPageLayout()

  if (!pageLayout) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Unable to load page layout</p>
      </div>
    )
  }

  // Sort sections by order
  const sortedSections = [...pageLayout.sections].sort((a, b) => a.order - b.order)

  return (
    <>
      {sortedSections.map((section) => (
        <DynamicSectionRenderer
          key={section.id}
          section={section}
          region={region}
          collections={collections}
        />
      ))}
    </>
  )
}
