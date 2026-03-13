import { Metadata } from "next"
import { getRegion } from "@lib/data/regions"
import { getDefaultHomepage } from "@lib/page-builder/api"
import PuckRenderer from "@/components/puck/PuckRenderer"

export async function generateMetadata(props: {
  params: Promise<{ countryCode: string }>
}): Promise<Metadata> {
  const homepage = await getDefaultHomepage()

  return {
    title: homepage?.metaTitle || "Medusa Next.js Starter Template",
    description:
      homepage?.metaDescription ||
      "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
  }
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

  // Fetch homepage data from PageBuilder
  const homepage = await getDefaultHomepage()

  if (!homepage || !homepage.puckData) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-gray-500">
          Homepage not configured yet. Please set up your homepage in the
          dashboard.
        </p>
      </div>
    )
  }

  console.log("Homepage Puck Data:", homepage.puckData)

  // Render using Puck
  return <PuckRenderer data={homepage.puckData} />
}

