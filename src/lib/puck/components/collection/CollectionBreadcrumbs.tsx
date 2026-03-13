'use client';

import React from "react";
import { ComponentConfig } from "@measured/puck";
import { usePuckContext } from "@/components/puck/PuckContextProvider";
import Link from "@/components/common/SafeLink";
import { ChevronRight, Home } from "lucide-react";

export interface CollectionBreadcrumbsProps {
  showHomeIcon: boolean;
  separator: "arrow" | "slash" | "chevron";
  textSize: string;
  textColor: string;
  marginBottom: string;
}

export const CollectionBreadcrumbs: ComponentConfig<CollectionBreadcrumbsProps> = {
  label: "Collection Breadcrumbs",

  fields: {
    showHomeIcon: {
      type: "radio",
      label: "Show Home Icon",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    separator: {
      type: "select",
      label: "Separator Style",
      options: [
        { label: "Arrow →", value: "arrow" },
        { label: "Slash /", value: "slash" },
        { label: "Chevron >", value: "chevron" },
      ],
    },
    textSize: {
      type: "select",
      label: "Text Size",
      options: [
        { label: "Small", value: "text-sm" },
        { label: "Medium", value: "text-base" },
      ],
    },
    textColor: {
      type: "select",
      label: "Text Color",
      options: [
        { label: "Gray", value: "text-gray-500" },
        { label: "Gray Dark", value: "text-gray-600" },
        { label: "Blue", value: "text-blue-600" },
      ],
    },
    marginBottom: {
      type: "select",
      label: "Bottom Margin",
      options: [
        { label: "Small", value: "mb-2" },
        { label: "Medium", value: "mb-4" },
        { label: "Large", value: "mb-6" },
      ],
    },
  },

  defaultProps: {
    showHomeIcon: true,
    separator: "chevron",
    textSize: "text-sm",
    textColor: "text-gray-500",
    marginBottom: "mb-4",
  },

  render: ({ showHomeIcon, separator, textSize, textColor, marginBottom }) => {
    const { context } = usePuckContext();
    const collection = context?.collection;
    const countryCode = context?.countryCode || 'us';

    if (!collection) {
      return null;
    }

    const getSeparator = () => {
      switch (separator) {
        case "arrow":
          return <span className="mx-2">→</span>;
        case "slash":
          return <span className="mx-2">/</span>;
        case "chevron":
          return <ChevronRight className="w-4 h-4 mx-1 inline" />;
        default:
          return <ChevronRight className="w-4 h-4 mx-1 inline" />;
      }
    };

    return (
      <nav className={`flex items-center ${textSize} ${textColor} ${marginBottom}`}>
        <Link href={`/${countryCode}`} className="hover:underline flex items-center">
          {showHomeIcon && <Home className="w-4 h-4 mr-1" />}
          Home
        </Link>
        {getSeparator()}
        <Link href={`/${countryCode}/store`} className="hover:underline">
          Collections
        </Link>
        {getSeparator()}
        <span className="text-gray-900">{collection.title}</span>
      </nav>
    );
  },
};
