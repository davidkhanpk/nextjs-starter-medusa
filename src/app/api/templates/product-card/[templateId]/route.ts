import { NextRequest, NextResponse } from "next/server"

/**
 * Get a product card template configuration by ID
 * This would normally fetch from your backend/database
 * For now, returns predefined template configurations
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { templateId: string } }
) {
  try {
    const templateId = params.templateId

    // In production, fetch from your backend:
    // const response = await fetch(`${process.env.BACKEND_URL}/api/stores/${storeId}/templates?type=PRODUCT_CARD&id=${templateId}`)
    // return response.json()

    // For now, return predefined template configurations
    const templates: Record<string, any> = {
      "minimal-clean-card": {
        id: "minimal-clean-card",
        name: "Minimal Clean",
        imageGallery: {
          enabled: true,
          useThumbnail: true,
          showSwiper: false,
          aspectRatio: "1:1",
          borderRadius: "sm",
          shadow: false,
          hoverZoom: true,
        },
        title: {
          show: true,
          clickable: true,
          textSize: "sm",
          fontWeight: "medium",
          textAlign: "left",
          lineClamp: 2,
        },
        price: {
          show: true,
          showCompareAt: true,
          showSavingsBadge: false,
          textSize: "md",
          priceColor: "#000000",
          align: "left",
        },
        badges: {
          showSale: true,
          showNew: false,
          position: "top-right",
        },
        meta: {
          showRating: false,
          showWishlist: false,
        },
      },
      "standard-complete-card": {
        id: "standard-complete-card",
        name: "Standard Complete",
        imageGallery: {
          enabled: true,
          useThumbnail: false,
          showSwiper: true,
          aspectRatio: "4:5",
          borderRadius: "md",
          shadow: true,
          hoverZoom: true,
        },
        title: {
          show: true,
          clickable: true,
          textSize: "md",
          fontWeight: "medium",
          textAlign: "left",
          lineClamp: 2,
        },
        price: {
          show: true,
          showCompareAt: true,
          showSavingsBadge: true,
          textSize: "lg",
          priceColor: "#000000",
          align: "left",
        },
        badges: {
          showSale: true,
          showNew: true,
          position: "top-left",
        },
        meta: {
          showRating: true,
          showWishlist: true,
        },
      },
      "modern-detailed-card": {
        id: "modern-detailed-card",
        name: "Modern Detailed",
        imageGallery: {
          enabled: true,
          useThumbnail: false,
          showSwiper: true,
          aspectRatio: "4:5",
          borderRadius: "lg",
          shadow: true,
          hoverZoom: true,
        },
        title: {
          show: true,
          clickable: true,
          textSize: "lg",
          fontWeight: "semibold",
          textAlign: "left",
          lineClamp: 2,
        },
        price: {
          show: true,
          showCompareAt: true,
          showSavingsBadge: true,
          textSize: "xl",
          priceColor: "#1a1a1a",
          align: "left",
        },
        badges: {
          showSale: true,
          showNew: true,
          position: "top-left",
        },
        meta: {
          showRating: true,
          showWishlist: true,
        },
      },
      "luxury-elegant-card": {
        id: "luxury-elegant-card",
        name: "Luxury Elegant",
        imageGallery: {
          enabled: true,
          useThumbnail: false,
          showSwiper: true,
          aspectRatio: "3:4",
          borderRadius: "none",
          shadow: false,
          hoverZoom: false,
        },
        title: {
          show: true,
          clickable: true,
          textSize: "md",
          fontWeight: "normal",
          textAlign: "center",
          lineClamp: 1,
        },
        price: {
          show: true,
          showCompareAt: true,
          showSavingsBadge: false,
          textSize: "lg",
          priceColor: "#1a1a1a",
          align: "center",
        },
        badges: {
          showSale: true,
          showNew: false,
          position: "top-left",
        },
        meta: {
          showRating: false,
          showWishlist: true,
        },
      },
      "compact-grid-card": {
        id: "compact-grid-card",
        name: "Compact Grid",
        imageGallery: {
          enabled: true,
          useThumbnail: true,
          showSwiper: false,
          aspectRatio: "1:1",
          borderRadius: "md",
          shadow: false,
          hoverZoom: false,
        },
        title: {
          show: true,
          clickable: true,
          textSize: "sm",
          fontWeight: "medium",
          textAlign: "left",
          lineClamp: 1,
        },
        price: {
          show: true,
          showCompareAt: true,
          showSavingsBadge: false,
          textSize: "sm",
          priceColor: "#000000",
          align: "left",
        },
        badges: {
          showSale: true,
          showNew: false,
          position: "top-left",
        },
        meta: {
          showRating: false,
          showWishlist: false,
        },
      },
      "eco-friendly-card": {
        id: "eco-friendly-card",
        name: "Eco Friendly",
        imageGallery: {
          enabled: true,
          useThumbnail: false,
          showSwiper: true,
          aspectRatio: "1:1",
          borderRadius: "md",
          shadow: true,
          hoverZoom: true,
        },
        title: {
          show: true,
          clickable: true,
          textSize: "md",
          fontWeight: "medium",
          textAlign: "left",
          lineClamp: 2,
        },
        price: {
          show: true,
          showCompareAt: true,
          showSavingsBadge: true,
          textSize: "lg",
          priceColor: "#10b981",
          align: "left",
        },
        badges: {
          showSale: true,
          showNew: true,
          position: "top-right",
        },
        meta: {
          showRating: true,
          showWishlist: true,
        },
      },
    }

    const template = templates[templateId]

    if (!template) {
      return NextResponse.json(
        { error: "Template not found", template: null },
        { status: 404 }
      )
    }

    return NextResponse.json({ template })
  } catch (error) {
    console.error("Error fetching product card template:", error)
    return NextResponse.json(
      { error: "Failed to fetch template", template: null },
      { status: 500 }
    )
  }
}
