"use client"

import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"

/**
 * Client-side customer hook for Puck components
 * Fetches authenticated customer data including profile, addresses, and orders
 */
export function useCustomer() {
  const [customer, setCustomer] = useState<HttpTypes.StoreCustomer | null>(null)
  const [addresses, setAddresses] = useState<HttpTypes.StoreCustomerAddress[]>([])
  const [orders, setOrders] = useState<HttpTypes.StoreOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCustomer = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/customers/me', {
        credentials: 'include',
      })
      
      if (!response.ok) {
        if (response.status === 401) {
          // Not authenticated
          setCustomer(null)
          setIsLoading(false)
          return
        }
        throw new Error('Failed to fetch customer')
      }
      
      const data = await response.json()
      setCustomer(data.customer)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load customer')
      setCustomer(null)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAddresses = async () => {
    try {
      const response = await fetch('/api/customers/me/addresses', {
        credentials: 'include',
      })
      
      if (response.ok) {
        const data = await response.json()
        setAddresses(data.addresses || [])
      }
    } catch (err) {
      console.error('Failed to fetch addresses:', err)
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/customers/me/orders', {
        credentials: 'include',
      })
      
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err)
    }
  }

  useEffect(() => {
    fetchCustomer()
  }, [])

  useEffect(() => {
    if (customer) {
      fetchAddresses()
      fetchOrders()
    }
  }, [customer?.id])

  const updateCustomer = async (updates: Partial<HttpTypes.StoreCustomer>) => {
    try {
      const response = await fetch('/api/customers/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updates),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update customer')
      }
      
      const data = await response.json()
      setCustomer(data.customer)
      return { success: true, customer: data.customer }
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to update customer' 
      }
    }
  }

  const addAddress = async (address: Partial<HttpTypes.StoreCustomerAddress>) => {
    try {
      const response = await fetch('/api/customers/me/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(address),
      })
      
      if (!response.ok) {
        throw new Error('Failed to add address')
      }
      
      await fetchAddresses()
      return { success: true }
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to add address' 
      }
    }
  }

  const updateAddress = async (addressId: string, updates: Partial<HttpTypes.StoreCustomerAddress>) => {
    try {
      const response = await fetch(`/api/customers/me/addresses/${addressId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updates),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update address')
      }
      
      await fetchAddresses()
      return { success: true }
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to update address' 
      }
    }
  }

  const deleteAddress = async (addressId: string) => {
    try {
      const response = await fetch(`/api/customers/me/addresses/${addressId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete address')
      }
      
      await fetchAddresses()
      return { success: true }
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to delete address' 
      }
    }
  }

  return {
    customer,
    addresses,
    orders,
    isLoading,
    error,
    updateCustomer,
    addAddress,
    updateAddress,
    deleteAddress,
    refreshCustomer: fetchCustomer,
    refreshAddresses: fetchAddresses,
    refreshOrders: fetchOrders,
  }
}
