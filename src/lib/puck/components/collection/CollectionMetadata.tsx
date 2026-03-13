'use client';

import React from "react";
import { ComponentConfig } from "@measured/puck";
import { usePuckContext } from "@/components/puck/PuckContextProvider";

export interface CollectionMetadataProps {
  showHandle: boolean;
  showCreatedDate: boolean;
  showUpdatedDate: boolean;
  fontSize: string;
  textColor: string;
}

export const CollectionMetadata: ComponentConfig<CollectionMetadataProps> = {
  label: "Collection Metadata",

  fields: {
    showHandle: {
      type: "radio",
      label: "Show Handle",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showCreatedDate: {
      type: "radio",
      label: "Show Created Date",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showUpdatedDate: {
      type: "radio",
      label: "Show Updated Date",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      options: [
        { label: "Extra Small", value: "text-xs" },
        { label: "Small", value: "text-sm" },
        { label: "Medium", value: "text-base" },
      ],
    },
    textColor: {
      type: "select",
      label: "Text Color",
      options: [
        { label: "Gray 400", value: "text-gray-400" },
        { label: "Gray 500", value: "text-gray-500" },
        { label: "Gray 600", value: "text-gray-600" },
      ],
    },
  },

  defaultProps: {
    showHandle: false,
    showCreatedDate: false,
    showUpdatedDate: false,
    fontSize: "text-sm",
    textColor: "text-gray-500",
  },

  render: ({ showHandle, showCreatedDate, showUpdatedDate, fontSize, textColor }) => {
    const { context } = usePuckContext();
    const collection = context?.collection;

    if (!collection) {
      return null;
    }

    const metadata: string[] = [];

    if (showHandle && collection.handle) {
      metadata.push(`Handle: ${collection.handle}`);
    }

    if (showCreatedDate && collection.created_at) {
      const date = new Date(collection.created_at).toLocaleDateString();
      metadata.push(`Created: ${date}`);
    }

    if (showUpdatedDate && collection.updated_at) {
      const date = new Date(collection.updated_at).toLocaleDateString();
      metadata.push(`Updated: ${date}`);
    }

    if (metadata.length === 0) {
      return null;
    }

    return (
      <div className={`${fontSize} ${textColor} mb-4`}>
        {metadata.map((item, index) => (
          <span key={index}>
            {item}
            {index < metadata.length - 1 && " • "}
          </span>
        ))}
      </div>
    );
  },
};
