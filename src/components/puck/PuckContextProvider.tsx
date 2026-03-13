"use client"

import { createContext, useContext, ReactNode } from 'react'

interface PuckContextData {
  context?: any
  theme?: any
}

const PuckContext = createContext<PuckContextData | undefined>(undefined)

export function PuckContextProvider({ 
  children, 
  data,
  theme 
}: { 
  children: ReactNode
  data: any
  theme?: any
}) {
  return (
    <PuckContext.Provider value={{ context: data?.context, theme }}>
      {children}
    </PuckContext.Provider>
  )
}

export function usePuckContext() {
  const context = useContext(PuckContext)
  if (!context) {
    return { context: undefined, theme: undefined }
  }
  return context
}
