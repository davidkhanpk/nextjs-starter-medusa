'use client'

import React, { useState, useEffect } from 'react'
import { SectionType } from '@lib/page-builder/types'
import {
  Plus,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
  Save,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  Tag,
  Settings,
  Image as ImageIcon,
} from 'lucide-react'

interface Category {
  id: string
  name: string
  handle: string
  product_count?: number
}

interface HomepageSection {
  id: string
  type: SectionType
  enabled: boolean
  order: number
  title?: string
  subtitle?: string
  categoryId?: string
  categoryHandle?: string
  layout?: string
  columns?: number
  limit?: number
  [key: string]: any
}

export const HomepageEditor: React.FC<{ storeId: string }> = ({ storeId }) => {
  const [sections, setSections] = useState<HomepageSection[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Load existing layout and categories
  useEffect(() => {
    loadLayout()
    loadCategories()
  }, [storeId])

  const loadLayout = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/stores/${storeId}/homepage-layout`)
      if (response.ok) {
        const data = await response.json()
        setSections(data.sections || [])
      }
    } catch (error) {
      console.error('Error loading layout:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const response = await fetch(`/api/stores/${storeId}/categories`)
      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories || [])
      }
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const generateId = () => `section_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  const addSection = (type: SectionType) => {
    const newSection: HomepageSection = {
      id: generateId(),
      type,
      enabled: true,
      order: sections.length,
      title: getSectionDefaultTitle(type),
      layout: 'grid',
      columns: 4,
      limit: 8,
    }

    setSections([...sections, newSection])
    setExpandedSections(new Set([...expandedSections, newSection.id]))
  }

  const getSectionDefaultTitle = (type: SectionType): string => {
    const titles: Record<SectionType, string> = {
      'hero': 'Hero Section',
      'category-products': 'Products Section',
      'categories-grid': 'Shop by Category',
      'collections': 'Collections',
      'banner': 'Promotional Banner',
      'testimonials': 'Customer Reviews',
      'newsletter': 'Newsletter Signup',
      'custom-html': 'Custom Content',
    }
    return titles[type]
  }

  const removeSection = (sectionId: string) => {
    setSections(sections.filter(s => s.id !== sectionId).map((s, i) => ({ ...s, order: i })))
  }

  const toggleSection = (sectionId: string) => {
    setSections(sections.map(s => 
      s.id === sectionId ? { ...s, enabled: !s.enabled } : s
    ))
  }

  const updateSection = (sectionId: string, updates: Partial<HomepageSection>) => {
    setSections(sections.map(s => 
      s.id === sectionId ? { ...s, ...updates } : s
    ))
  }

  const toggleExpanded = (sectionId: string) => {
    const newSet = new Set(expandedSections)
    if (newSet.has(sectionId)) {
      newSet.delete(sectionId)
    } else {
      newSet.add(sectionId)
    }
    setExpandedSections(newSet)
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return
    
    const newSections = [...sections]
    const [removed] = newSections.splice(draggedIndex, 1)
    newSections.splice(index, 0, removed)
    
    setSections(newSections.map((s, i) => ({ ...s, order: i })))
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const saveLayout = async () => {
    setIsSaving(true)
    try {
      const response = await fetch(`/api/stores/${storeId}/homepage-layout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections }),
      })

      if (response.ok) {
        alert('✅ Homepage layout saved successfully!')
      } else {
        throw new Error('Failed to save')
      }
    } catch (error) {
      alert('❌ Failed to save homepage layout')
      console.error('Error saving layout:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return 'Select a category...'
    const category = categories.find(c => c.id === categoryId)
    return category ? `${category.name} (${category.product_count || 0} products)` : 'Unknown category'
  }

  const sectionIcons: Record<SectionType, React.ReactNode> = {
    'hero': <ImageIcon className="w-4 h-4" />,
    'category-products': <Tag className="w-4 h-4" />,
    'categories-grid': <LayoutGrid className="w-4 h-4" />,
    'collections': <LayoutGrid className="w-4 h-4" />,
    'banner': <ImageIcon className="w-4 h-4" />,
    'testimonials': <Tag className="w-4 h-4" />,
    'newsletter': <Tag className="w-4 h-4" />,
    'custom-html': <Settings className="w-4 h-4" />,
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading homepage editor...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow p-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Homepage Layout</h2>
          <p className="text-sm text-gray-600 mt-1">
            Add sections and assign categories to customize your storefront
          </p>
        </div>
        <button
          onClick={saveLayout}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          <Save className="w-5 h-5" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Add Section Buttons */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Section</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => addSection('hero')}
            className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <ImageIcon className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Hero Banner</span>
          </button>
          <button
            onClick={() => addSection('category-products')}
            className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
          >
            <Tag className="w-5 h-5 text-green-600" />
            <span className="font-medium">Category Products</span>
          </button>
          <button
            onClick={() => addSection('categories-grid')}
            className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
          >
            <LayoutGrid className="w-5 h-5 text-purple-600" />
            <span className="font-medium">Categories Grid</span>
          </button>
          <button
            onClick={() => addSection('banner')}
            className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all"
          >
            <ImageIcon className="w-5 h-5 text-orange-600" />
            <span className="font-medium">Banner</span>
          </button>
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-3">
        {sections.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <LayoutGrid className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No sections added yet</h3>
            <p className="text-gray-600">
              Click the buttons above to add your first section
            </p>
          </div>
        ) : (
          sections.map((section, index) => (
            <div
              key={section.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`bg-white border-2 rounded-lg transition-all ${
                draggedIndex === index 
                  ? 'opacity-50 border-blue-400' 
                  : section.enabled 
                    ? 'border-gray-200 hover:border-gray-300' 
                    : 'border-gray-100 bg-gray-50'
              }`}
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 p-4">
                <button
                  className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors"
                  title="Drag to reorder"
                >
                  <GripVertical className="w-6 h-6" />
                </button>

                <div className="flex items-center gap-2">
                  {sectionIcons[section.type]}
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {section.type.replace(/-/g, ' ')}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{section.title}</h3>
                  {section.type === 'category-products' && section.categoryId && (
                    <p className="text-sm text-gray-600 mt-0.5">
                      {getCategoryName(section.categoryId)}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      section.enabled
                        ? 'text-green-600 bg-green-50 hover:bg-green-100'
                        : 'text-gray-400 bg-gray-100 hover:bg-gray-200'
                    }`}
                    title={section.enabled ? 'Hide section' : 'Show section'}
                  >
                    {section.enabled ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={() => toggleExpanded(section.id)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit settings"
                  >
                    {expandedSections.has(section.id) ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>

                  <button
                    onClick={() => removeSection(section.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove section"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Section Settings (Expanded) */}
              {expandedSections.has(section.id) && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Title */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section Title
                      </label>
                      <input
                        type="text"
                        value={section.title || ''}
                        onChange={(e) => updateSection(section.id, { title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., New Arrivals, Hot Deals, etc."
                      />
                    </div>

                    {/* Subtitle */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section Subtitle (Optional)
                      </label>
                      <input
                        type="text"
                        value={section.subtitle || ''}
                        onChange={(e) => updateSection(section.id, { subtitle: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Check out our latest products"
                      />
                    </div>

                    {/* Category Selector (for category-products type) */}
                    {section.type === 'category-products' && (
                      <>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Category <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={section.categoryId || ''}
                            onChange={(e) => {
                              const category = categories.find(c => c.id === e.target.value)
                              updateSection(section.id, {
                                categoryId: e.target.value,
                                categoryHandle: category?.handle,
                              })
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Choose a category...</option>
                            {categories.map(cat => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name} ({cat.product_count || 0} products)
                              </option>
                            ))}
                          </select>
                          <p className="text-xs text-gray-500 mt-1">
                            Products from this category will be displayed in this section
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product Limit
                          </label>
                          <input
                            type="number"
                            value={section.limit || 8}
                            onChange={(e) => updateSection(section.id, { limit: parseInt(e.target.value) })}
                            min="1"
                            max="50"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Layout
                          </label>
                          <select
                            value={section.layout || 'grid'}
                            onChange={(e) => updateSection(section.id, { layout: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="grid">Grid</option>
                            <option value="carousel">Carousel</option>
                          </select>
                        </div>
                      </>
                    )}

                    {/* Categories Grid Settings */}
                    {section.type === 'categories-grid' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Layout
                          </label>
                          <select
                            value={section.layout || 'grid'}
                            onChange={(e) => updateSection(section.id, { layout: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="grid">Grid</option>
                            <option value="carousel">Carousel</option>
                            <option value="list">List</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Columns
                          </label>
                          <select
                            value={section.columns || 4}
                            onChange={(e) => updateSection(section.id, { columns: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="2">2 Columns</option>
                            <option value="3">3 Columns</option>
                            <option value="4">4 Columns</option>
                            <option value="6">6 Columns</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">💡 How it works:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Add sections using the buttons above</li>
          <li>• For "Category Products", select which category to display (e.g., "New Arrivals", "Sale Items")</li>
          <li>• Drag and drop sections to reorder them</li>
          <li>• Toggle visibility with the eye icon</li>
          <li>• Click "Save Changes" to update your homepage</li>
        </ul>
      </div>
    </div>
  )
}
