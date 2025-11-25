import React from 'react'
import { SectionProps } from './dynamic-section-renderer'

export default function EyeCatcherSection({ section }: SectionProps) {
  const position = section.position || 'top-right'
  const colorTheme = section.colorTheme || 'red'
  
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  }[position]

  const colorClasses = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
    black: 'bg-black',
  }[colorTheme]

  return (
    <div className={`absolute ${positionClasses} ${colorClasses} text-white px-3 py-1 rounded-md font-semibold text-sm shadow-lg z-10`}>
      {section.badgeText || 'New'}
    </div>
  )
}
