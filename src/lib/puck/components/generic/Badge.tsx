'use client';

import { ComponentConfig } from '@measured/puck';
import { resolveColor } from '@/lib/theme/token-utils';

export interface BadgeProps {
  id: string;
  text: string;
  variant: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size: 'sm' | 'md' | 'lg';
  rounded: 'sm' | 'md' | 'lg' | 'full';
  customBgColor?: string;
  customTextColor?: string;
}

export const Badge: ComponentConfig<BadgeProps> = {
  label: 'Badge',
  fields: {
    id: { type: 'text', label: 'ID' },
    text: {
      type: 'text',
      label: 'Badge Text',
    },
    variant: {
      type: 'select',
      label: 'Variant',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Primary', value: 'primary' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
        { label: 'Info', value: 'info' },
      ],
    },
    size: {
      type: 'radio',
      label: 'Size',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
    },
    rounded: {
      type: 'radio',
      label: 'Corner Radius',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Full (Pill)', value: 'full' },
      ],
    },
    customBgColor: {
      type: 'custom',
      label: 'Custom Background (Optional)',
      render: ({ value, onChange }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="color"
            value={value || '#000000'}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: '60px', height: '32px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Leave empty for default"
            style={{ flex: 1, padding: '6px 8px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'monospace' }}
          />
        </div>
      ),
    },
    customTextColor: {
      type: 'custom',
      label: 'Custom Text Color (Optional)',
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
            placeholder="Leave empty for default"
            style={{ flex: 1, padding: '6px 8px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'monospace' }}
          />
        </div>
      ),
    },
  },
  defaultProps: {
    id: 'badge-1',
    text: 'Badge',
    variant: 'default',
    size: 'md',
    rounded: 'md',
  },
  render: ({ id, text, variant, size, rounded, customBgColor, customTextColor }) => {
    const variants = {
      default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
      primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    };

    const sizes = {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-sm px-2.5 py-1',
      lg: 'text-base px-3 py-1.5',
    };

    const roundedClasses = {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    };

    const style: React.CSSProperties = {};
    if (customBgColor) {
      style.backgroundColor = resolveColor(customBgColor);
    }
    if (customTextColor) {
      style.color = resolveColor(customTextColor);
    }

    return (
      <span
        id={id}
        className={`
          inline-flex items-center font-medium
          ${sizes[size]}
          ${roundedClasses[rounded]}
          ${!customBgColor && !customTextColor ? variants[variant] : ''}
        `}
        style={Object.keys(style).length > 0 ? style : undefined}
      >
        {text}
      </span>
    );
  },
};

export default Badge;
