'use client';

import { ComponentConfig } from '@measured/puck';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

export interface AccordionProps {
  id: string;
  items: AccordionItem[];
  allowMultiple: boolean;
  defaultOpen?: number[];
  bordered: boolean;
  rounded: 'none' | 'sm' | 'md' | 'lg';
}

export const Accordion: ComponentConfig<AccordionProps> = {
  label: 'Accordion',
  fields: {
    id: { type: 'text', label: 'ID' },
    items: {
      type: 'array',
      label: 'Accordion Items',
      arrayFields: {
        id: { type: 'text', label: 'Item ID' },
        title: { type: 'text', label: 'Title' },
        content: { type: 'textarea', label: 'Content' },
      },
      defaultItemProps: {
        id: 'item-1',
        title: 'Accordion Item',
        content: 'Accordion content goes here',
      },
    },
    allowMultiple: {
      type: 'radio',
      label: 'Allow Multiple Open',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    bordered: {
      type: 'radio',
      label: 'Show Borders',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    rounded: {
      type: 'radio',
      label: 'Corner Radius',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
    },
  },
  defaultProps: {
    id: 'accordion-1',
    items: [
      {
        id: 'item-1',
        title: 'What is your return policy?',
        content: 'We offer a 30-day return policy on all items. Products must be in original condition.',
      },
      {
        id: 'item-2',
        title: 'How long does shipping take?',
        content: 'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery.',
      },
      {
        id: 'item-3',
        title: 'Do you ship internationally?',
        content: 'Yes, we ship to over 100 countries worldwide. International shipping times vary by location.',
      },
    ],
    allowMultiple: false,
    bordered: true,
    rounded: 'md',
  },
  render: ({ id, items, allowMultiple, bordered, rounded }) => {
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (index: number) => {
      if (allowMultiple) {
        setOpenItems((prev) =>
          prev.includes(index)
            ? prev.filter((i) => i !== index)
            : [...prev, index]
        );
      } else {
        setOpenItems((prev) => (prev.includes(index) ? [] : [index]));
      }
    };

    const roundedClasses = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
    };

    return (
      <div id={id} className="w-full space-y-2">
        {items.map((item, index) => {
          const isOpen = openItems.includes(index);

          return (
            <div
              key={item.id}
              className={`
                ${bordered ? 'border border-gray-200 dark:border-gray-700' : ''}
                ${roundedClasses[rounded]}
                overflow-hidden
              `}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleItem(index)}
                className={`
                  w-full flex items-center justify-between p-4
                  text-left font-medium text-gray-900 dark:text-gray-100
                  hover:bg-gray-50 dark:hover:bg-gray-800
                  transition-colors
                  ${isOpen && !bordered ? 'bg-gray-50 dark:bg-gray-800' : ''}
                `}
              >
                <span>{item.title}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform ${
                    isOpen ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div
                  className={`
                    p-4 pt-0
                    text-gray-600 dark:text-gray-400
                    whitespace-pre-wrap
                  `}
                >
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  },
};

export default Accordion;
