'use client';

import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export interface SearchBarProps {
  placeholder: string;
  style: "minimal" | "outlined" | "filled";
  size: "sm" | "md" | "lg";
  showIcon: boolean;
  iconPosition: "left" | "right";
  fullWidth: boolean;
  maxWidth?: string;
  borderRadius: "none" | "sm" | "md" | "lg" | "full";
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  focusBorderColor: string;
  showPopularSearches: boolean;
  popularSearches?: string[];
}

export const SearchBar: ComponentConfig<SearchBarProps> = {
  label: "Search Bar",
  
  fields: {
    placeholder: {
      type: "text",
      label: "Placeholder Text",
    },
    style: {
      type: "select",
      label: "Style",
      options: [
        { label: "Minimal", value: "minimal" },
        { label: "Outlined", value: "outlined" },
        { label: "Filled", value: "filled" },
      ],
    },
    size: {
      type: "select",
      label: "Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    showIcon: {
      type: "radio",
      label: "Show Search Icon",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    iconPosition: {
      type: "select",
      label: "Icon Position",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
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
    borderRadius: {
      type: "select",
      label: "Border Radius",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Full", value: "full" },
      ],
    },
    backgroundColor: {
      type: "text",
      label: "Background Color",
    },
    textColor: {
      type: "text",
      label: "Text Color",
    },
    borderColor: {
      type: "text",
      label: "Border Color",
    },
    focusBorderColor: {
      type: "text",
      label: "Focus Border Color",
    },
    showPopularSearches: {
      type: "radio",
      label: "Show Popular Searches",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    popularSearches: {
      type: "array",
      label: "Popular Searches",
      arrayFields: {
        search: { type: "text" },
      },
      getItemSummary: (item: any) => item.search || "Search term",
    },
  },

  defaultProps: {
    placeholder: "Search products...",
    style: "outlined",
    size: "md",
    showIcon: true,
    iconPosition: "left",
    fullWidth: false,
    maxWidth: "400px",
    borderRadius: "md",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    borderColor: "#e5e7eb",
    focusBorderColor: "#3b82f6",
    showPopularSearches: false,
    popularSearches: [],
  },

  render: ({
    placeholder,
    style,
    size,
    showIcon,
    iconPosition,
    fullWidth,
    maxWidth,
    borderRadius,
    backgroundColor,
    textColor,
    borderColor,
    focusBorderColor,
    showPopularSearches,
    popularSearches,
  }) => {
    const router = useRouter();
    const [query, setQuery] = React.useState("");
    const [isFocused, setIsFocused] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        // Medusa pattern: Use URL query params for search
        router.push(`/store?q=${encodeURIComponent(query.trim())}`);
        setQuery("");
        setIsFocused(false);
      }
    };

    const handlePopularSearch = (term: string) => {
      setQuery(term);
      router.push(`/store?q=${encodeURIComponent(term)}`);
      setIsFocused(false);
    };

    const sizeClasses = {
      sm: 'py-1.5 px-3 text-sm',
      md: 'py-2 px-4 text-base',
      lg: 'py-3 px-5 text-lg',
    };

    const radiusClasses = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    };

    const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;

    const styleClasses = {
      minimal: 'border-0 border-b-2',
      outlined: 'border',
      filled: 'border-0',
    };

    return (
      <div 
        className="relative"
        style={{ 
          width: fullWidth ? '100%' : 'auto',
          maxWidth: fullWidth ? undefined : maxWidth,
        }}
      >
        <form onSubmit={handleSearch} className="relative">
          <div className="relative flex items-center">
            {showIcon && iconPosition === 'left' && (
              <Search 
                className="absolute left-3 pointer-events-none" 
                size={iconSize}
                style={{ color: textColor, opacity: 0.5 }}
              />
            )}
            
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder={placeholder}
              className={`
                w-full transition-all duration-200
                ${sizeClasses[size] || 'px-4 py-2.5 text-base'}
                ${radiusClasses[borderRadius] || 'rounded-lg'}
                ${styleClasses[style] || 'border-2'}
                ${showIcon && iconPosition === 'left' ? 'pl-10' : ''}
                ${showIcon && iconPosition === 'right' ? 'pr-10' : ''}
                focus:outline-none
              `}
              style={{
                backgroundColor: style === 'filled' ? backgroundColor : 'transparent',
                color: textColor,
                borderColor: isFocused ? focusBorderColor : borderColor,
              }}
            />

            {showIcon && iconPosition === 'right' && (
              <button
                type="submit"
                className="absolute right-3"
                aria-label="Search"
              >
                <Search 
                  size={iconSize}
                  style={{ color: textColor, opacity: 0.5 }}
                />
              </button>
            )}

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-10"
                aria-label="Clear"
              >
                <X 
                  size={iconSize - 4}
                  style={{ color: textColor, opacity: 0.5 }}
                />
              </button>
            )}
          </div>
        </form>

        {/* Popular Searches Dropdown */}
        {showPopularSearches && isFocused && popularSearches && popularSearches.length > 0 && (
          <div 
            className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg rounded-lg py-2 z-50"
            style={{ borderColor }}
          >
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
              Popular Searches
            </div>
            {popularSearches.map((item: any, index: number) => (
              <button
                key={index}
                onClick={() => handlePopularSearch(item.search)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <Search size={14} className="text-gray-400" />
                <span style={{ color: textColor }}>{item.search}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
};
