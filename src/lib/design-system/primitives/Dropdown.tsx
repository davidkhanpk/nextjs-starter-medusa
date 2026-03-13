'use client'

/**
 * Dropdown Primitive - Headless UI wrapper with theme support
 * Reusable dropdown component for navigation, filters, etc.
 */

import { Menu, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'

export interface DropdownProps {
  trigger: ReactNode
  children: ReactNode
  align?: 'left' | 'center' | 'right'
  width?: string
  className?: string
  buttonClassName?: string
  panelClassName?: string
  style?: {
    button?: React.CSSProperties
    panel?: React.CSSProperties
  }
}

export function Dropdown({
  trigger,
  children,
  align = 'left',
  width = 'auto',
  className = '',
  buttonClassName = '',
  panelClassName = '',
  style = {}
}: DropdownProps) {
  const alignmentClasses = {
    left: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-0'
  }

  return (
    <Menu as="div" className={`relative ${className}`}>
      <Menu.Button 
        className={buttonClassName}
        style={style.button}
      >
        {trigger}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute z-50 mt-2 ${alignmentClasses[align]} ${panelClassName}`}
          style={{
            width: width,
            ...style.panel
          }}
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export interface DropdownItemProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

export function DropdownItem({ 
  children, 
  onClick, 
  href,
  disabled = false,
  className = '',
  style = {}
}: DropdownItemProps) {
  return (
    <Menu.Item disabled={disabled}>
      {({ active }) => (
        href ? (
          <a
            href={href}
            className={`${className} ${active ? 'active' : ''}`}
            style={style}
            onClick={onClick}
          >
            {children}
          </a>
        ) : (
          <button
            onClick={onClick}
            className={`${className} ${active ? 'active' : ''}`}
            style={style}
          >
            {children}
          </button>
        )
      )}
    </Menu.Item>
  )
}
