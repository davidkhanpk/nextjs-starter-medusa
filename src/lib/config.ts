import Medusa from "@medusajs/js-sdk"

// Function to get backend URL at runtime
const getMedusaBackendUrl = () => {
  // In production, this reads from runtime environment
  const url =  process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
  return url
}

const getMedusaPublishableKey = () => {
  // In production, this reads from runtime environment
  // Prioritize MEDUSA_PUBLISHABLE_KEY for runtime flexibility
  const key = process.env.MEDUSA_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
  return key
}

// For true runtime configuration, we need to create SDK instances on-demand
// rather than at module load time
let sdkInstance: Medusa | null = null

export const getSDK = () => {
  if (!sdkInstance) {
    sdkInstance = new Medusa({
      baseUrl: getMedusaBackendUrl(),
      debug: process.env.NODE_ENV === "development",
      publishableKey: getMedusaPublishableKey(),
    })
  }
  return sdkInstance
}

// For backward compatibility, export as sdk
export const sdk = new Proxy({} as Medusa, {
  get: (target, prop) => {
    return (getSDK() as any)[prop]
  }
})
