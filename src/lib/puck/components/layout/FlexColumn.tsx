'use client';

import React from "react";
import { ComponentConfig } from "@measured/puck";
import { DropZone } from "@measured/puck";

export interface FlexColumnProps {
  justifyContent: "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";
  alignItems: "start" | "center" | "end" | "stretch";
  gap: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  fullHeight: boolean;
  minHeight?: string;
  padding?: string;
  backgroundColor?: string;
  borderRadius?: string;
}

export const FlexColumn: ComponentConfig<FlexColumnProps> = {
  label: "Flex Column",
  
  fields: {
    justifyContent: {
      type: "select",
      label: "Vertical Alignment",
      options: [
        { label: "Start (Top)", value: "start" },
        { label: "Center", value: "center" },
        { label: "End (Bottom)", value: "end" },
        { label: "Space Between", value: "space-between" },
        { label: "Space Around", value: "space-around" },
        { label: "Space Evenly", value: "space-evenly" },
      ],
    },
    alignItems: {
      type: "select",
      label: "Horizontal Alignment",
      options: [
        { label: "Start (Left)", value: "start" },
        { label: "Center", value: "center" },
        { label: "End (Right)", value: "end" },
        { label: "Stretch", value: "stretch" },
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
    fullHeight: {
      type: "radio",
      label: "Full Height",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    minHeight: {
      type: "text",
      label: "Min Height (e.g., 200px)",
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
    justifyContent: "start",
    alignItems: "start",
    gap: "md",
    fullHeight: false,
    minHeight: "auto",
    padding: "0",
    backgroundColor: "transparent",
    borderRadius: "0",
  },

  render: ({
    justifyContent,
    alignItems,
    gap,
    fullHeight,
    minHeight,
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
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: justifyContentMap[justifyContent] || 'flex-start',
          alignItems: alignItemsMap[alignItems] || 'stretch',
          gap: gapValues[gap] || '1rem',
          height: fullHeight ? "100%" : "auto",
          minHeight: fullHeight ? undefined : minHeight || "50px",
          padding,
          backgroundColor,
          borderRadius,
          border: "1px dashed rgba(0, 0, 0, 0.1)",
        }}
      >
        <DropZone zone="flex-column-content" disallow={[]} />
      </div>
    );
  },
};
