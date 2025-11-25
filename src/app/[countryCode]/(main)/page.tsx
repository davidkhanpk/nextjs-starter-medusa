import { Metadata } from "next"
import { getRegion } from "@lib/data/regions"
import { getPageLayout } from "@lib/page-builder/api"
import { ServerPageRenderer } from "@lib/page-builder/page-renderer"

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

  if (!region) {
    return null
  }

  // Get dynamic page layout from backend
  const pageLayout = await getPageLayout()

  if (!pageLayout) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Unable to load page layout</p>
      </div>
    )
  }

  // Render page using the dynamic page builder
  return <ServerPageRenderer sections={pageLayout.sections} />
}
