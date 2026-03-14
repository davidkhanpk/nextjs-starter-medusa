'use client';

import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Search } from "lucide-react";

export interface SearchIconProps {
  iconSize: "sm" | "md" | "lg";
  iconColor: string;
  hoverColor: string;
  style: "minimal" | "outlined" | "filled";
  openSearchOnClick: boolean;
}

export const SearchIcon: ComponentConfig<SearchIconProps> = {
  label: "Search Icon",
  
  fields: {
    iconSize: {
      type: "select",
      label: "Icon Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    iconColor: {
      type: "text",
      label: "Icon Color",
    },
    hoverColor: {
      type: "text",
      label: "Hover Color",
    },
    style: {
      type: "select",
      label: "Button Style",
      options: [
        { label: "Minimal", value: "minimal" },
        { label: "Outlined", value: "outlined" },
        { label: "Filled", value: "filled" },
      ],
    },
    openSearchOnClick: {
      type: "radio",
      label: "Open Search Modal on Click",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    iconSize: "md",
    iconColor: "#000000",
    hoverColor: "#3b82f6",
    style: "minimal",
    openSearchOnClick: true,
  },

  render: ({
    iconSize,
    iconColor,
    hoverColor,
    style,
    openSearchOnClick,
  }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [searchOpen, setSearchOpen] = React.useState(false);

    const handleClick = () => {
      if (openSearchOnClick) {
        setSearchOpen(!searchOpen);
      }
    };

    const sizeMap = {
      sm: 20,
      md: 24,
      lg: 28,
    };

    const iconSizeValue = sizeMap[iconSize] || 24;

    const styleClasses = {
      minimal: "p-2 rounded-full hover:bg-gray-100",
      outlined: "p-2 border-2 rounded-full hover:bg-gray-100",
      filled: "p-2 rounded-full",
    };

    return (
      <>
        <button
          onClick={handleClick}
          className={`transition-all ${styleClasses[style] || 'p-2 rounded-full hover:bg-gray-100'}`}
          style={{
            color: isHovered ? hoverColor : iconColor,
            backgroundColor: style === 'filled' ? (isHovered ? hoverColor : iconColor) : 'transparent',
            borderColor: style === 'outlined' ? iconColor : 'transparent',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Search"
        >
          <Search 
            size={iconSizeValue}
            style={{ 
              color: style === 'filled' ? '#ffffff' : (isHovered ? hoverColor : iconColor)
            }}
          />
        </button>

        {/* Search Modal/Dropdown */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-50">
            <input
              type="search"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              autoFocus
              onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
            />
          </div>
        )}
      </>
    );
  },
};
