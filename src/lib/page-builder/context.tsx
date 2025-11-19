'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { PageLayout, PageSection, SectionType, DEFAULT_SECTION_CONFIGS } from './types'

interface PageBuilderContextType {
  currentLayout: PageLayout | null
  sections: PageSection[]
  isLoading: boolean
  addSection: (type: SectionType, position?: number) => void
  removeSection: (sectionId: string) => void
  updateSection: (sectionId: string, updates: Partial<PageSection>) => void
  reorderSections: (fromIndex: number, toIndex: number) => void
  toggleSection: (sectionId: string) => void
  saveLayout: () => Promise<void>
  loadLayout: (layoutId: string) => Promise<void>
  createNewLayout: (name: string) => Promise<void>
}

const PageBuilderContext = createContext<PageBuilderContextType | undefined>(undefined)

export const usePageBuilder = () => {
  const context = useContext(PageBuilderContext)
  if (!context) {
    throw new Error('usePageBuilder must be used within PageBuilderProvider')
  }
  return context
}

interface PageBuilderProviderProps {
  children: ReactNode
  storeId?: string
  initialLayout?: PageLayout
}

export const PageBuilderProvider: React.FC<PageBuilderProviderProps> = ({
  children,
  storeId,
  initialLayout,
}) => {
  const [currentLayout, setCurrentLayout] = useState<PageLayout | null>(initialLayout || null)
  const [sections, setSections] = useState<PageSection[]>(initialLayout?.sections || [])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (initialLayout) {
      setCurrentLayout(initialLayout)
      setSections(initialLayout.sections)
    } else {
      loadDefaultLayout()
    }
  }, [initialLayout])

  const loadDefaultLayout = async () => {
    setIsLoading(true)
    try {
      // Try to fetch layout from API
      if (storeId) {
        const response = await fetch(`/api/page-builder/layouts?storeId=${storeId}`)
        if (response.ok) {
          const data = await response.json()
          if (data.currentLayout) {
            setCurrentLayout(data.currentLayout)
            setSections(data.currentLayout.sections)
            return
          }
        }
      }
      
      // Fallback to localStorage if no storeId or API fails
      const savedLayout = localStorage.getItem('pageBuilderLayout')
      if (savedLayout) {
        const layout = JSON.parse(savedLayout)
        setCurrentLayout(layout)
        setSections(layout.sections)
      }
    } catch (error) {
      console.error('Error loading layout:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateId = () => `section_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  const addSection = (type: SectionType, position?: number) => {
    const defaultConfig = DEFAULT_SECTION_CONFIGS[type]
    const newSection: PageSection = {
      ...defaultConfig,
      id: generateId(),
      type,
      enabled: true,
      order: position !== undefined ? position : sections.length,
    } as PageSection

    setSections(prev => {
      const newSections = [...prev]
      if (position !== undefined) {
        newSections.splice(position, 0, newSection)
        // Update order numbers
        return newSections.map((section, index) => ({ ...section, order: index }))
      }
      return [...newSections, newSection]
    })
  }

  const removeSection = (sectionId: string) => {
    setSections(prev => {
      const filtered = prev.filter(section => section.id !== sectionId)
      // Update order numbers
      return filtered.map((section, index) => ({ ...section, order: index }))
    })
  }

  const updateSection = (sectionId: string, updates: Partial<PageSection>) => {
    setSections(prev =>
      prev.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    )
  }

  const reorderSections = (fromIndex: number, toIndex: number) => {
    setSections(prev => {
      const newSections = [...prev]
      const [removed] = newSections.splice(fromIndex, 1)
      newSections.splice(toIndex, 0, removed)
      // Update order numbers
      return newSections.map((section, index) => ({ ...section, order: index }))
    })
  }

  const toggleSection = (sectionId: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === sectionId ? { ...section, enabled: !section.enabled } : section
      )
    )
  }

  const saveLayout = async () => {
    if (!currentLayout) return

    const updatedLayout: PageLayout = {
      ...currentLayout,
      sections,
      updatedAt: new Date().toISOString(),
    }

    setIsLoading(true)
    try {
      if (storeId) {
        // Save to API
        const response = await fetch('/api/page-builder/layouts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            storeId,
            layout: updatedLayout,
          }),
        })

        if (!response.ok) throw new Error('Failed to save layout')
      }

      // Always save to localStorage as backup
      localStorage.setItem('pageBuilderLayout', JSON.stringify(updatedLayout))
      setCurrentLayout(updatedLayout)
    } catch (error) {
      console.error('Error saving layout:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loadLayout = async (layoutId: string) => {
    setIsLoading(true)
    try {
      if (storeId) {
        const response = await fetch(`/api/page-builder/layouts/${layoutId}?storeId=${storeId}`)
        if (response.ok) {
          const layout = await response.json()
          setCurrentLayout(layout)
          setSections(layout.sections)
          return
        }
      }
      throw new Error('Layout not found')
    } catch (error) {
      console.error('Error loading layout:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const createNewLayout = async (name: string) => {
    const newLayout: PageLayout = {
      id: `layout_${Date.now()}`,
      name,
      sections: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setCurrentLayout(newLayout)
    setSections([])
    
    try {
      await saveLayout()
    } catch (error) {
      console.error('Error creating layout:', error)
      throw error
    }
  }

  const value: PageBuilderContextType = {
    currentLayout,
    sections,
    isLoading,
    addSection,
    removeSection,
    updateSection,
    reorderSections,
    toggleSection,
    saveLayout,
    loadLayout,
    createNewLayout,
  }

  return (
    <PageBuilderContext.Provider value={value}>
      {children}
    </PageBuilderContext.Provider>
  )
}
