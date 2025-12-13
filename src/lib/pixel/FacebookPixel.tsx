"use client"

import { useEffect } from "react"

interface FacebookPixelProps {
  storeId: string
}

export default function FacebookPixel({ storeId }: FacebookPixelProps) {
  useEffect(() => {
    const loadPixel = async () => {
      try {
        // Fetch pixel code from backend
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/marketing/facebook-pixel/code/${storeId}`
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
          document.head.appendChild(newScript)
        }

        // Add noscript fallback
        const noscript = script.getElementsByTagName("noscript")[0]
        if (noscript) {
          document.body.appendChild(noscript.cloneNode(true))
        }

        console.log("✅ Facebook Pixel loaded successfully")
      } catch (error) {
        console.error("Failed to load Facebook Pixel:", error)
      }
    }

    loadPixel()
  }, [storeId])

  return null
}
