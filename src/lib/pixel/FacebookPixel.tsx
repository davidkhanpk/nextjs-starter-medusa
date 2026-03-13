"use client"

import { useEffect, useState } from "react"

interface FacebookPixelProps {
  storeId: string
}

export default function FacebookPixel({ storeId }: FacebookPixelProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  // Wait for hydration to complete
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    // Only run after hydration is complete
    if (!isHydrated || !storeId) return

    const loadPixel = async () => {
      try {
        // Fetch pixel code from backend
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SHOPIKOOL_API_URL || process.env.SHOPIKOOL_API_URL}/marketing/facebook-pixel/code/${storeId}`
        )
        
        if (!response.ok) {
          console.warn("Facebook Pixel not configured for this store")
          return
        }

        const data = await response.json()
        
        // Inject pixel script into head
        const script = document.createElement("div")
        script.innerHTML = data.pixelCode
        
        // Execute script tags
        const scriptTags = script.getElementsByTagName("script")
        for (let i = 0; i < scriptTags.length; i++) {
          const newScript = document.createElement("script")
          newScript.text = scriptTags[i].text
          newScript.setAttribute('data-fb-pixel', 'true')
          document.head.appendChild(newScript)
        }

        // Add noscript fallback
        const noscript = script.getElementsByTagName("noscript")[0]
        if (noscript) {
          const clonedNoscript = noscript.cloneNode(true) as HTMLElement
          clonedNoscript.setAttribute('data-fb-pixel', 'true')
          document.body.appendChild(clonedNoscript)
        }

        console.log("✅ Facebook Pixel loaded successfully")
      } catch (error) {
        console.error("Failed to load Facebook Pixel:", error)
      }
    }

    loadPixel()
  }, [storeId, isHydrated])

  return null
}
