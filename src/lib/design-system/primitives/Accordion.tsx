'use client'

/**
 * Accordion Primitive - Headless UI Disclosure wrapper
 * For mobile menu collapsible sections
 */

import { Disclosure, Transition } from '@headlessui/react'
import { ReactNode } from 'react'

export interface AccordionProps {
  title: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  className?: string
  buttonClassName?: string
  panelClassName?: string
  style?: {
    button?: React.CSSProperties
    panel?: React.CSSProperties
  }
  icon?: {
    open: ReactNode
    closed: ReactNode
  }
}

export function Accordion({
  title,
  children,
  defaultOpen = false,
  className = '',
  buttonClassName = '',
  panelClassName = '',
  style = {},
  icon
}: AccordionProps) {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <div className={className}>
          <Disclosure.Button 
            className={`${buttonClassName} ${open ? 'open' : ''}`}
            style={style.button}
          >
            {title}
            {icon && (
              <span className="accordion-icon">
                {open ? icon.open : icon.closed}
              </span>
            )}
          </Disclosure.Button>
          
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel 
              className={panelClassName}
              style={style.panel}
            >
              {children}
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  )
}
