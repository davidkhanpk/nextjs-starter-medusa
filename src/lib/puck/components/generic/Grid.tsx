'use client';

import { ComponentConfig } from '@measured/puck';

export interface GridProps {
  id: string;
  columns: '1' | '2' | '3' | '4' | '5' | '6';
  gap: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  mobileColumns: '1' | '2';
  tabletColumns: '1' | '2' | '3' | '4';
}

export const Grid: ComponentConfig<GridProps> = {
  label: 'Grid',
  fields: {
    id: { type: 'text', label: 'ID' },
    columns: {
      type: 'radio',
      label: 'Desktop Columns',
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
      ],
    },
    tabletColumns: {
      type: 'radio',
      label: 'Tablet Columns',
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
    },
    mobileColumns: {
      type: 'radio',
      label: 'Mobile Columns',
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
      ],
    },
    gap: {
      type: 'radio',
      label: 'Gap',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
  },
  defaultProps: {
    id: 'grid-1',
    columns: '3',
    tabletColumns: '2',
    mobileColumns: '1',
    gap: 'md',
  },
  render: ({ id, columns, tabletColumns, mobileColumns, gap, puck: { renderDropZone } }) => {
    const gapClasses = {
      none: 'gap-0',
      sm: 'gap-3',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    };

    const columnClasses = {
      '1': 'lg:grid-cols-1',
      '2': 'lg:grid-cols-2',
      '3': 'lg:grid-cols-3',
      '4': 'lg:grid-cols-4',
      '5': 'lg:grid-cols-5',
      '6': 'lg:grid-cols-6',
    };

    const tabletColumnClasses = {
      '1': 'md:grid-cols-1',
      '2': 'md:grid-cols-2',
      '3': 'md:grid-cols-3',
      '4': 'md:grid-cols-4',
    };

    const mobileColumnClasses = {
      '1': 'grid-cols-1',
      '2': 'grid-cols-2',
    };

    return (
      <div
        id={id}
        className={`grid ${mobileColumnClasses[mobileColumns] || 'grid-cols-1'} ${tabletColumnClasses[tabletColumns] || 'md:grid-cols-2'} ${columnClasses[columns] || 'lg:grid-cols-3'} ${gapClasses[gap] || 'gap-6'}`}
      >
        {renderDropZone('items')}
      </div>
    );
  },
};

export default Grid;
