'use client';

import { ComponentConfig } from '@measured/puck';
import { resolveColor } from '@/lib/theme/token-utils';

export interface SpacerProps {
  id: string;
  height: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  showDivider: boolean;
  dividerColor: string;
  dividerStyle: 'solid' | 'dashed' | 'dotted';
}

export const Spacer: ComponentConfig<SpacerProps> = {
  label: 'Spacer',
  fields: {
    id: { type: 'text', label: 'ID' },
    height: {
      type: 'radio',
      label: 'Height',
      options: [
        { label: 'Extra Small (0.5rem)', value: 'xs' },
        { label: 'Small (1rem)', value: 'sm' },
        { label: 'Medium (2rem)', value: 'md' },
        { label: 'Large (3rem)', value: 'lg' },
        { label: 'Extra Large (4rem)', value: 'xl' },
        { label: '2XL (6rem)', value: '2xl' },
        { label: '3XL (8rem)', value: '3xl' },
      ],
    },
    showDivider: {
      type: 'radio',
      label: 'Show Divider Line',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    dividerStyle: {
      type: 'radio',
      label: 'Divider Style',
      options: [
        { label: 'Solid', value: 'solid' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Dotted', value: 'dotted' },
      ],
    },
    dividerColor: {
      type: 'custom',
      label: 'Divider Color',
      render: ({ value, onChange }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="color"
            value={value || '#e5e7eb'}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: '60px', height: '32px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#e5e7eb"
            style={{ flex: 1, padding: '6px 8px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'monospace' }}
          />
        </div>
      ),
    },
  },
  defaultProps: {
    id: 'spacer-1',
    height: 'md',
    showDivider: false,
    dividerStyle: 'solid',
    dividerColor: '#e5e7eb',
  },
  render: ({ id, height, showDivider, dividerStyle, dividerColor }) => {
    const heightClasses = {
      xs: 'h-2',
      sm: 'h-4',
      md: 'h-8',
      lg: 'h-12',
      xl: 'h-16',
      '2xl': 'h-24',
      '3xl': 'h-32',
    };

    return (
      <div id={id} className={`${heightClasses[height] || 'h-8'} w-full flex items-center`}>
        {showDivider && (
          <hr
            style={{
              width: '100%',
              borderColor: resolveColor(dividerColor),
              borderStyle: dividerStyle,
              borderWidth: '1px',
            }}
          />
        )}
      </div>
    );
  },
};

export default Spacer;
