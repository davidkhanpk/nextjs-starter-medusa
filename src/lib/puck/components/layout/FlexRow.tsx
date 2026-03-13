'use client';

import React from "react";
import { ComponentConfig } from "@measured/puck";
import { DropZone } from "@measured/puck";

export interface FlexRowProps {
  justifyContent: "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";
  alignItems: "start" | "center" | "end" | "stretch" | "baseline";
  gap: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  wrap: "nowrap" | "wrap" | "wrap-reverse";
  fullWidth: boolean;
  maxWidth?: string;
  padding?: string;
  backgroundColor?: string;
  borderRadius?: string;
}

export const FlexRow: ComponentConfig<FlexRowProps> = {
  label: "Flex Row",
  
  fields: {
    justifyContent: {
      type: "select",
      label: "Horizontal Alignment",
      options: [
        { label: "Start (Left)", value: "start" },
        { label: "Center", value: "center" },
        { label: "End (Right)", value: "end" },
        { label: "Space Between", value: "space-between" },
        { label: "Space Around", value: "space-around" },
        { label: "Space Evenly", value: "space-evenly" },
      ],
    },
    alignItems: {
      type: "select",
      label: "Vertical Alignment",
      options: [
        { label: "Start (Top)", value: "start" },
        { label: "Center", value: "center" },
        { label: "End (Bottom)", value: "end" },
        { label: "Stretch", value: "stretch" },
        { label: "Baseline", value: "baseline" },
      ],
    },
    gap: {
      type: "select",
      label: "Gap Between Items",
      options: [
        { label: "None", value: "none" },
        { label: "Extra Small", value: "xs" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
      ],
    },
    wrap: {
      type: "select",
      label: "Wrap Behavior",
      options: [
        { label: "No Wrap", value: "nowrap" },
        { label: "Wrap", value: "wrap" },
        { label: "Wrap Reverse", value: "wrap-reverse" },
      ],
    },
    fullWidth: {
      type: "radio",
      label: "Full Width",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    maxWidth: {
      type: "text",
      label: "Max Width (if not full width)",
    },
    padding: {
      type: "text",
      label: "Padding (e.g., 1rem)",
    },
    backgroundColor: {
      type: "text",
      label: "Background Color",
    },
    borderRadius: {
      type: "text",
      label: "Border Radius (e.g., 0.5rem)",
    },
  },

  defaultProps: {
    justifyContent: "space-between",
    alignItems: "center",
    gap: "md",
    wrap: "nowrap",
    fullWidth: true,
    maxWidth: "100%",
    padding: "0",
    backgroundColor: "transparent",
    borderRadius: "0",
  },

  render: ({
    justifyContent,
    alignItems,
    gap,
    wrap,
    fullWidth,
    maxWidth,
    padding,
    backgroundColor,
    borderRadius,
  }) => {
    const gapValues = {
      none: "0",
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
    };

    const justifyContentMap = {
      start: "flex-start",
      center: "center",
      end: "flex-end",
      "space-between": "space-between",
      "space-around": "space-around",
      "space-evenly": "space-evenly",
    };

    const alignItemsMap = {
      start: "flex-start",
      center: "center",
      end: "flex-end",
      stretch: "stretch",
      baseline: "baseline",
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: justifyContentMap[justifyContent],
          alignItems: alignItemsMap[alignItems],
          flexWrap: wrap,
          gap: gapValues[gap],
          width: fullWidth ? "100%" : "auto",
          maxWidth: fullWidth ? undefined : maxWidth,
          padding,
          backgroundColor,
          borderRadius,
          minHeight: "50px",
        }}
      >
        <DropZone 
          zone="flex-row-content" 
          disallow={[]}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: justifyContentMap[justifyContent],
            alignItems: alignItemsMap[alignItems],
            flexWrap: wrap,
            gap: gapValues[gap],
            width: "100%",
          }}
        />
      </div>
    );
  },
};
