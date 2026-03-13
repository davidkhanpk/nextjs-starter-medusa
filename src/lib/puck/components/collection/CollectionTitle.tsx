'use client';

import React from "react";
import { ComponentConfig } from "@measured/puck";
import { usePuckContext } from "@/components/puck/PuckContextProvider";

export interface CollectionTitleProps {
  tag: "h1" | "h2" | "h3" | "h4";
  fontSize: string;
  textAlign: "left" | "center" | "right";
  fontWeight: "normal" | "medium" | "semibold" | "bold";
  marginBottom: string;
  showProductCount: boolean;
}

export const CollectionTitle: ComponentConfig<CollectionTitleProps> = {
  label: "Collection Title",

  fields: {
    tag: {
      type: "select",
      label: "HTML Tag",
      options: [
        { label: "H1", value: "h1" },
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
        { label: "H4", value: "h4" },
      ],
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      options: [
        { label: "Small", value: "text-2xl" },
        { label: "Medium", value: "text-3xl" },
        { label: "Large", value: "text-4xl" },
        { label: "X-Large", value: "text-5xl" },
      ],
    },
    textAlign: {
      type: "select",
      label: "Text Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    fontWeight: {
      type: "select",
      label: "Font Weight",
      options: [
        { label: "Normal", value: "normal" },
        { label: "Medium", value: "medium" },
        { label: "Semibold", value: "semibold" },
        { label: "Bold", value: "bold" },
      ],
    },
    marginBottom: {
      type: "select",
      label: "Bottom Margin",
      options: [
        { label: "None", value: "mb-0" },
        { label: "Small", value: "mb-2" },
        { label: "Medium", value: "mb-4" },
        { label: "Large", value: "mb-6" },
        { label: "X-Large", value: "mb-8" },
      ],
    },
    showProductCount: {
      type: "radio",
      label: "Show Product Count",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    tag: "h1",
    fontSize: "text-3xl",
    textAlign: "left",
    fontWeight: "bold",
    marginBottom: "mb-4",
    showProductCount: true,
  },

  render: ({ tag: Tag, fontSize, textAlign, fontWeight, marginBottom, showProductCount }) => {
    const { context } = usePuckContext();
    const collection = context?.collection;

    if (!collection) {
      return (
        <div className="text-gray-500 p-4 border border-gray-200 rounded">
          Collection data not available
        </div>
      );
    }

    const alignmentClass = textAlign === "center" ? "text-center" : textAlign === "right" ? "text-right" : "text-left";
    const fontWeightClass = `font-${fontWeight}`;

    return (
      <Tag className={`${fontSize} ${alignmentClass} ${fontWeightClass} ${marginBottom}`}>
        {collection.title}
        {showProductCount && collection.products && (
          <span className="text-gray-500 text-base font-normal ml-2">
            ({collection.products.length} {collection.products.length === 1 ? 'product' : 'products'})
          </span>
        )}
      </Tag>
    );
  },
};
