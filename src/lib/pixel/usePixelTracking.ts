"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    fbq?: (...args: any[]) => void
    _fbq?: any
    fbq_track_purchase?: (value: number, currency: string, content_ids: string[]) => void
    fbq_track_add_to_cart?: (value: number, currency: string, content_id: string, content_name: string) => void
    fbq_track_view_content?: (value: number, currency: string, content_id: string, content_name: string, content_category?: string) => void
    fbq_track_initiate_checkout?: (value: number, currency: string, content_ids: string[], num_items: number) => void
    fbq_track_search?: (search_string: string) => void
  }
}

export const usePixelTracking = () => {
  const trackEvent = (eventName: string, data?: any) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", eventName, data)
    }
  }

  return {
    trackPageView: () => trackEvent("PageView"),
    
    trackViewContent: (params: {
      value: number
      currency?: string
      contentId: string
      contentName: string
      contentCategory?: string
    }) => {
      if (window.fbq_track_view_content) {
        window.fbq_track_view_content(
          params.value,
          params.currency || "USD",
          params.contentId,
          params.contentName,
          params.contentCategory
        )
      }
    },
    
    trackAddToCart: (params: {
      value: number
      currency?: string
      contentId: string
      contentName: string
    }) => {
      if (window.fbq_track_add_to_cart) {
        window.fbq_track_add_to_cart(
          params.value,
          params.currency || "USD",
          params.contentId,
          params.contentName
        )
      }
    },
    
    trackInitiateCheckout: (params: {
      value: number
      currency?: string
      contentIds: string[]
      numItems: number
    }) => {
      if (window.fbq_track_initiate_checkout) {
        window.fbq_track_initiate_checkout(
          params.value,
          params.currency || "USD",
          params.contentIds,
          params.numItems
        )
      }
    },
    
    trackPurchase: (params: {
      value: number
      currency?: string
      contentIds: string[]
    }) => {
      if (window.fbq_track_purchase) {
        window.fbq_track_purchase(
          params.value,
          params.currency || "USD",
          params.contentIds
        )
      }
    },
    
    trackSearch: (searchString: string) => {
      if (window.fbq_track_search) {
        window.fbq_track_search(searchString)
      }
    }
  }
}
