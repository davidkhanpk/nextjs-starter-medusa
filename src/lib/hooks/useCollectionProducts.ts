"use client"

import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"

interface ProductFilters {
  price_gte?: number
  price_lte?: number
  category_id?: string[]
  collection_id?: string
  tag_id?: string[]
}

interface ProductSort {
  field: string
  order: "asc" | "desc"
}

/**
 * Client-side collection products hook for Puck components
 */
export function useCollectionProducts(collectionId?: string) {
  const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([])
  const [collection, setCollection] = useState<HttpTypes.StoreCollection | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState<ProductFilters>({})
  const [sort, setSort] = useState<ProductSort>({ field: "created_at", order: "desc" })
  const [page, setPage] = useState(1)
  const limit = 12

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: ((page - 1) * limit).toString(),
        ...(collectionId && { collection_id: collectionId }),
        ...(filters.price_gte && { 'price[gte]': filters.price_gte.toString() }),
        ...(filters.price_lte && { 'price[lte]': filters.price_lte.toString() }),
        ...(filters.category_id && { category_id: filters.category_id.join(',') }),
        order: sort.order === "desc" ? `-${sort.field}` : sort.field,
      })
      
      const response = await fetch(`/api/products?${params}`)
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      
      const data = await response.json()
      setProducts(data.products || [])
      setTotal(data.count || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products')
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCollection = async () => {
    if (!collectionId) return
    
    try {
      const response = await fetch(`/api/collections/${collectionId}`)
      if (response.ok) {
        const data = await response.json()
        setCollection(data.collection)
      }
    } catch (err) {
      console.error('Failed to fetch collection:', err)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [collectionId, filters, sort, page])

  useEffect(() => {
    fetchCollection()
  }, [collectionId])

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
    setPage(1) // Reset to first page
  }

  const updateSort = (newSort: ProductSort) => {
    setSort(newSort)
    setPage(1) // Reset to first page
  }

  const clearFilters = () => {
    setFilters({})
    setPage(1)
  }

  return {
    products,
    collection,
    isLoading,
    error,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    limit,
    filters,
    sort,
    updateFilters,
    updateSort,
    clearFilters,
    setPage,
    refreshProducts: fetchProducts,
  }
}
