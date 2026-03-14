'use client';

import { ComponentConfig } from '@measured/puck';
import { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: string;
}

export interface TabsProps {
  id: string;
  tabs: TabItem[];
  defaultTab?: number;
  alignment: 'left' | 'center' | 'right';
  tabStyle: 'underline' | 'pills' | 'bordered';
}

export const Tabs: ComponentConfig<TabsProps> = {
  label: 'Tabs',
  fields: {
    id: { type: 'text', label: 'ID' },
    tabs: {
      type: 'array',
      label: 'Tabs',
      arrayFields: {
        id: { type: 'text', label: 'Tab ID' },
        label: { type: 'text', label: 'Tab Label' },
        content: { type: 'textarea', label: 'Tab Content' },
      },
      defaultItemProps: {
        id: 'tab-1',
        label: 'Tab',
        content: 'Tab content goes here',
      },
    },
    defaultTab: {
      type: 'number',
      label: 'Default Active Tab (0-based index)',
    },
    alignment: {
      type: 'radio',
      label: 'Tab Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    tabStyle: {
      type: 'radio',
      label: 'Tab Style',
      options: [
        { label: 'Underline', value: 'underline' },
        { label: 'Pills', value: 'pills' },
        { label: 'Bordered', value: 'bordered' },
      ],
    },
  },
  defaultProps: {
    id: 'tabs-1',
    tabs: [
      { id: 'tab-1', label: 'Tab 1', content: 'Content for tab 1' },
      { id: 'tab-2', label: 'Tab 2', content: 'Content for tab 2' },
      { id: 'tab-3', label: 'Tab 3', content: 'Content for tab 3' },
    ],
    defaultTab: 0,
    alignment: 'left',
    tabStyle: 'underline',
  },
  render: ({ id, tabs, defaultTab = 0, alignment, tabStyle }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    const alignmentClasses = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    };

    const getTabClasses = (isActive: boolean) => {
      const baseClasses = 'px-4 py-2 font-medium transition-colors cursor-pointer';
      
      if (tabStyle === 'underline') {
        return `${baseClasses} ${
          isActive
            ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
            : 'border-b-2 border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`;
      }
      
      if (tabStyle === 'pills') {
        return `${baseClasses} rounded-lg ${
          isActive
            ? 'bg-blue-500 text-white'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`;
      }
      
      // bordered
      return `${baseClasses} border rounded-t-lg ${
        isActive
          ? 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-b-white dark:border-b-gray-800 text-gray-900 dark:text-gray-100'
          : 'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
      }`;
    };

    return (
      <div id={id} className="w-full">
        {/* Tab Headers */}
        <div
          className={`flex ${alignmentClasses[alignment] || 'justify-start'} gap-2 ${
            tabStyle === 'bordered' ? 'border-b border-gray-300 dark:border-gray-700' : ''
          }`}
        >
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={getTabClasses(activeTab === index)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className={`mt-4 ${tabStyle === 'bordered' ? 'border border-t-0 border-gray-300 dark:border-gray-700 rounded-b-lg p-4' : ''}`}>
          {tabs[activeTab] && (
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {tabs[activeTab].content}
            </div>
          )}
        </div>
      </div>
    );
  },
};

export default Tabs;
