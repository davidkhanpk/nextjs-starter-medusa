'use client';

import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Search, X } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

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
    const router = useRouter();
    const params = useParams();
    const countryCode = (params?.countryCode as string) || 'us';

    const [isHovered, setIsHovered] = React.useState(false);
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleClick = () => {
      if (openSearchOnClick) {
        setSearchOpen(true);
        setQuery("");
      }
    };

    const handleClose = () => {
      setSearchOpen(false);
      setQuery("");
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/${countryCode}/search?q=${encodeURIComponent(query.trim())}`);
        handleClose();
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

        {/* Search Overlay — fixed to viewport so icon position in template doesn't matter */}
        {searchOpen && (
          <div
            className="fixed inset-0 z-[100] flex flex-col items-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
            onClick={handleClose}
          >
            {/* Search panel */}
            <div
              className="w-full max-w-2xl mt-16 mx-4 bg-white rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit} className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
                <Search size={20} className="text-gray-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 text-base text-gray-900 placeholder-gray-400 bg-transparent outline-none"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors shrink-0"
                  aria-label="Close search"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </form>
              {query ? (
                <div className="px-4 py-3 text-sm text-gray-400">
                  Press Enter to search for &ldquo;{query}&rdquo;
                </div>
              ) : (
                <div className="px-4 py-3 text-sm text-gray-400">
                  Start typing to search products...
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  },
};
