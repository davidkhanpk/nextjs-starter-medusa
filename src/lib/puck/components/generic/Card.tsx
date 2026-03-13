'use client';

import { ComponentConfig } from '@measured/puck';
import { resolveColor } from '@/lib/theme/token-utils';

export interface CardProps {
  id: string;
  padding: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border: boolean;
  rounded: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  backgroundColor: string;
  hoverEffect: boolean;
}

export const Card: ComponentConfig<CardProps> = {
  label: 'Card',
  fields: {
    id: { type: 'text', label: 'ID' },
    padding: {
      type: 'radio',
      label: 'Padding',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
    shadow: {
      type: 'radio',
      label: 'Shadow',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
    border: {
      type: 'radio',
      label: 'Border',
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
        { label: 'Extra Large', value: 'xl' },
        { label: 'Full', value: 'full' },
      ],
    },
    backgroundColor: {
      type: 'custom',
      label: 'Background Color',
      render: ({ value, onChange }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="color"
            value={value || '#ffffff'}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: '60px', height: '32px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#ffffff"
            style={{ flex: 1, padding: '6px 8px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'monospace' }}
          />
        </div>
      ),
    },
    hoverEffect: {
      type: 'radio',
      label: 'Hover Effect',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
  },
  defaultProps: {
    id: 'card-1',
    padding: 'lg',
    shadow: 'md',
    border: true,
    rounded: 'lg',
    backgroundColor: '#ffffff',
    hoverEffect: true,
  },
  render: ({ id, padding, shadow, border, rounded, backgroundColor, hoverEffect, puck: { renderDropZone } }) => {
    const paddingClasses = {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12',
    };

    const shadowClasses = {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    };

    const roundedClasses = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    };

    return (
      <div
        id={id}
        className={`
          ${paddingClasses[padding]}
          ${shadowClasses[shadow]}
          ${roundedClasses[rounded]}
          ${border ? 'border border-gray-200 dark:border-gray-700' : ''}
          ${hoverEffect ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1' : ''}
        `}
        style={{ backgroundColor: resolveColor(backgroundColor) }}
      >
        {renderDropZone('content')}
      </div>
    );
  },
};

export default Card;
