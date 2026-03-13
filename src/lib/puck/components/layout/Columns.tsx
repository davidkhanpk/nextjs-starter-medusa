'use client';

import { ComponentConfig, DropZone } from "@measured/puck";

export interface ColumnsProps {
  columns: 2 | 3 | 4;
  layout?: "equal" | "60-40" | "40-60" | "70-30" | "30-70" | "50-50";
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  mobileStack?: boolean;
  alignItems?: "start" | "center" | "end" | "stretch";
}

export const Columns: ComponentConfig<ColumnsProps> = {
  label: "Columns",

  fields: {
    columns: {
      type: "select",
      label: "Number of Columns",
      options: [
        { label: "2 Columns", value: 2 },
        { label: "3 Columns", value: 3 },
        { label: "4 Columns", value: 4 },
      ],
    },
    layout: {
      type: "select",
      label: "Column Layout (2 columns only)",
      options: [
        { label: "Equal (50/50)", value: "50-50" },
        { label: "Left Larger (60/40)", value: "60-40" },
        { label: "Right Larger (40/60)", value: "40-60" },
        { label: "Left Much Larger (70/30)", value: "70-30" },
        { label: "Right Much Larger (30/70)", value: "30-70" },
      ],
    },
    gap: {
      type: "select",
      label: "Gap Between Columns",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "X-Large", value: "xl" },
      ],
    },
    mobileStack: {
      type: "radio",
      label: "Stack on Mobile",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    alignItems: {
      type: "select",
      label: "Vertical Alignment",
      options: [
        { label: "Start", value: "start" },
        { label: "Center", value: "center" },
        { label: "End", value: "end" },
        { label: "Stretch", value: "stretch" },
      ],
    },
  },

  defaultProps: {
    columns: 2,
    layout: "50-50",
    gap: "lg",
    mobileStack: true,
    alignItems: "start",
  },

  render: ({
    columns,
    layout = "50-50",
    gap = "lg",
    mobileStack = true,
    alignItems = "start",
  }) => {
    const gapClasses = {
      none: "gap-0",
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
      xl: "gap-12",
    };

    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    };

    // Desktop grid column classes
    const desktopColumnClasses: Record<number, string> = {
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-2 lg:grid-cols-4",
    };

    // Custom layout classes for 2-column layouts (fr units avoid overflow with gap)
    const desktopLayoutClasses: Record<string, string> = {
      "50-50": "md:grid-cols-2",
      "60-40": "md:grid-cols-[3fr_2fr]",
      "40-60": "md:grid-cols-[2fr_3fr]",
      "70-30": "md:grid-cols-[7fr_3fr]",
      "30-70": "md:grid-cols-[3fr_7fr]",
    };

    // Use custom layout for 2 columns, otherwise use standard grid
    const desktopGridClass =
      columns === 2
        ? (desktopLayoutClasses[layout] || desktopLayoutClasses["50-50"])
        : (desktopColumnClasses[columns] || desktopColumnClasses[2]);

    // Mobile stacking: grid-cols-1 on mobile, then desktop layout on md+ breakpoint
    // grid-cols-2 / grid-cols-3 / grid-cols-4 are safelisted in tailwind.config.js
    const responsiveClass = mobileStack
      ? `grid-cols-1 ${desktopGridClass}`
      : desktopGridClass;

    return (
      <div className={`grid ${responsiveClass} ${gapClasses[gap]} ${alignClasses[alignItems]}`}>
        {Array.from({ length: columns }, (_, i) => (
          <div key={i} className="min-h-[100px]">
            <DropZone zone={`column-${i + 1}`} />
          </div>
        ))}
      </div>
    );
  },
};
