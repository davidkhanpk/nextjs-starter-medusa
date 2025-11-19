'use client'

import React, { useState } from 'react'
import { usePageBuilder } from '@lib/page-builder/context'
import { SectionType, DEFAULT_SECTION_CONFIGS } from '@lib/page-builder/types'
import {
  Plus,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
  Save,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

export const PageBuilderAdmin: React.FC = () => {
  const {
    sections,
    isLoading,
    addSection,
    removeSection,
    updateSection,
    reorderSections,
    toggleSection,
    saveLayout,
  } = usePageBuilder()

  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const toggleExpanded = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return
    reorderSections(draggedIndex, index)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const handleSave = async () => {
    try {
      await saveLayout()
      alert('Layout saved successfully!')
    } catch (error) {
      alert('Failed to save layout')
    }
  }

  const sectionTypeLabels: Record<SectionType, string> = {
    hero: 'Hero Section',
    'featured-products': 'Featured Products',
    'new-arrivals': 'New Arrivals',
    'on-sale': 'On Sale',
    categories: 'Categories',
    collections: 'Collections',
    banner: 'Banner',
    testimonials: 'Testimonials',
    newsletter: 'Newsletter',
    'instagram-feed': 'Instagram Feed',
    brands: 'Brands',
    'blog-posts': 'Blog Posts',
    'custom-html': 'Custom HTML',
    video: 'Video',
    'countdown-timer': 'Countdown Timer',
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Page Builder</h2>
          <p className="text-sm text-gray-600 mt-1">
            Drag and drop sections to customize your homepage
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Layout
        </button>
      </div>

      {/* Add Section Dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add Section
        </label>
        <select
          onChange={(e) => {
            if (e.target.value) {
              addSection(e.target.value as SectionType)
              e.target.value = ''
            }
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          defaultValue=""
        >
          <option value="" disabled>
            Choose a section type...
          </option>
          {Object.entries(sectionTypeLabels).map(([type, label]) => (
            <option key={type} value={type}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Sections List */}
      <div className="space-y-3">
        {sections.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No sections added yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Use the dropdown above to add your first section
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
              className={`border border-gray-200 rounded-lg bg-white ${
                draggedIndex === index ? 'opacity-50' : ''
              } ${!section.enabled ? 'bg-gray-50' : ''}`}
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 p-4">
                <button
                  className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
                  title="Drag to reorder"
                >
                  <GripVertical className="w-5 h-5" />
                </button>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {sectionTypeLabels[section.type]}
                  </h3>
                  {section.title && (
                    <p className="text-sm text-gray-600 mt-0.5">{section.title}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      section.enabled
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title={section.enabled ? 'Hide section' : 'Show section'}
                  >
                    {section.enabled ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>

                  <button
                    onClick={() => toggleExpanded(section.id)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Expand settings"
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
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Title */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Title
                      </label>
                      <input
                        type="text"
                        value={section.title || ''}
                        onChange={(e) =>
                          updateSection(section.id, { title: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter section title..."
                      />
                    </div>

                    {/* Subtitle */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Subtitle
                      </label>
                      <input
                        type="text"
                        value={section.subtitle || ''}
                        onChange={(e) =>
                          updateSection(section.id, { subtitle: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter section subtitle..."
                      />
                    </div>

                    {/* Type-specific settings */}
                    {(section.type === 'new-arrivals' ||
                      section.type === 'on-sale' ||
                      section.type === 'featured-products') && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Limit
                          </label>
                          <input
                            type="number"
                            value={section.limit}
                            onChange={(e) =>
                              updateSection(section.id, {
                                limit: parseInt(e.target.value),
                              })
                            }
                            min="1"
                            max="50"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Layout
                          </label>
                          <select
                            value={section.layout}
                            onChange={(e) =>
                              updateSection(section.id, {
                                layout: e.target.value as any,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="grid">Grid</option>
                            <option value="carousel">Carousel</option>
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

      {/* Preview Notice */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> Changes are previewed in real-time on your
          homepage. Don't forget to save when you're done!
        </p>
      </div>
    </div>
  )
}
