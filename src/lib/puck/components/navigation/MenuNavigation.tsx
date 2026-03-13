'use client';

import React from "react";
import { ComponentConfig } from "@measured/puck";
import Link from "@/components/common/SafeLink";
import { ChevronDown } from "lucide-react";
import { DropdownMenu } from "@medusajs/ui";
import { usePuckContext } from "@/components/puck/PuckContextProvider";

export interface MenuItem {
  id: string;
  label: string;
  url?: string;
  type: 'category' | 'collection' | 'page' | 'custom';
  entityId?: string;
  position: number;
  parentId?: string | null;
  children?: MenuItem[];
  isVisible: boolean;
  openInNewTab: boolean;
  megaMenu?: {
    enabled: boolean;
    columns: number;
    showImage: boolean;
    imageUrl?: string;
    featuredItems?: {
      id: string;
      label: string;
      url: string;
      imageUrl?: string;
    }[];
  };
}

export interface MenuNavigationProps {
  menuHandle: string;
  layout: "horizontal" | "vertical" | "stacked";
  alignment: "left" | "center" | "right";
  hoverEffect: "underline" | "background" | "color" | "none";
  textColor: string;
  hoverColor: string;
  fontSize: "sm" | "base" | "lg";
  fontWeight: "normal" | "medium" | "semibold" | "bold";
  showDropdownArrows: boolean;
  dropdownStyle: "default" | "mega";
  maxDepth: 1 | 2 | 3;
  menuData?: MenuItem[]; // Server-side fetched menu data
  // Theme tokens for styling
  dropdownBackground?: string;
  dropdownBorder?: string;
  dropdownShadow?: string;
  dropdownRadius?: string;
}

export const MenuNavigation: ComponentConfig<MenuNavigationProps> = {
  label: "Menu Navigation",
  
  fields: {
    menuHandle: {
      type: "text",
      label: "Menu Handle",
    },
    layout: {
      type: "select",
      label: "Layout",
      options: [
        { label: "Horizontal", value: "horizontal" },
        { label: "Vertical", value: "vertical" },
        { label: "Stacked", value: "stacked" },
      ],
    },
    alignment: {
      type: "select",
      label: "Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    hoverEffect: {
      type: "select",
      label: "Hover Effect",
      options: [
        { label: "Underline", value: "underline" },
        { label: "Background", value: "background" },
        { label: "Color Change", value: "color" },
        { label: "None", value: "none" },
      ],
    },
    textColor: {
      type: "text",
      label: "Text Color",
    },
    hoverColor: {
      type: "text",
      label: "Hover Color",
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Base", value: "base" },
        { label: "Large", value: "lg" },
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
    showDropdownArrows: {
      type: "radio",
      label: "Show Dropdown Arrows",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    dropdownStyle: {
      type: "select",
      label: "Dropdown Style",
      options: [
        { label: "Default Dropdown", value: "default" },
        { label: "Mega Menu", value: "mega" },
      ],
    },
    maxDepth: {
      type: "select",
      label: "Maximum Nesting Depth",
      options: [
        { label: "1 Level", value: 1 },
        { label: "2 Levels", value: 2 },
        { label: "3 Levels", value: 3 },
      ],
    },
    dropdownBackground: {
      type: "text",
      label: "Dropdown Background (token or color)",
    },
    dropdownBorder: {
      type: "text",
      label: "Dropdown Border (token or color)",
    },
    dropdownShadow: {
      type: "select",
      label: "Dropdown Shadow",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
      ],
    },
    dropdownRadius: {
      type: "select",
      label: "Dropdown Border Radius",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
      ],
    },
  },

  defaultProps: {
    menuHandle: "default",
    layout: "horizontal",
    alignment: "center",
    hoverEffect: "underline",
    textColor: "text.primary",
    hoverColor: "brand.primary",
    fontSize: "base",
    fontWeight: "medium",
    showDropdownArrows: true,
    dropdownStyle: "default",
    maxDepth: 3,
    dropdownBackground: "ui.background",
    dropdownBorder: "ui.border",
    dropdownShadow: "lg",
    dropdownRadius: "md",
  },

  render: ({
    menuHandle,
    layout,
    alignment,
    hoverEffect,
    textColor,
    hoverColor,
    fontSize,
    fontWeight,
    showDropdownArrows,
    dropdownStyle,
    maxDepth,
    menuData,
    dropdownBackground,
    dropdownBorder,
    dropdownShadow,
    dropdownRadius,
  }) => {
    const [menuItems] = React.useState<MenuItem[]>(menuData || []);
    const [openDropdowns, setOpenDropdowns] = React.useState<Set<string>>(new Set());
    const loading = false; // Data is provided server-side
    const error = !menuData ? "Menu data not provided" : null;
    
    const handleMouseEnter = (itemId: string) => {
      setOpenDropdowns(prev => new Set(prev).add(itemId));
    };

    const handleMouseLeave = (itemId: string) => {
      setOpenDropdowns(prev => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    };
    
    // Get theme from context for token resolution
    const puckContext = usePuckContext();
    const theme = puckContext?.theme;
    
    // Helper function to get display label with fallback
    const getDisplayLabel = (item: MenuItem): string => {
      // If label exists and is not empty, use it
      if (item.label && item.label.trim() !== '') {
        return item.label;
      }
      
      // Fallback to enriched data names if available
      if (item.type === 'category' && (item as any).enrichedData?.category?.name) {
        return (item as any).enrichedData.category.name;
      }
      if (item.type === 'collection' && (item as any).enrichedData?.collection?.title) {
        return (item as any).enrichedData.collection.title;
      }
      
      // Final fallback
      return item.label || 'Untitled';
    };
    
    // Helper function to resolve theme tokens
    const resolveToken = (value: string): string => {
      if (!value || !theme) return value;
      
      // If it's already a hex/rgb color, return as-is
      if (value.startsWith('#') || value.startsWith('rgb')) {
        return value;
      }
      
      // If it's a token path (e.g., "brand.primary"), resolve it
      const tokens = theme?.globalSettings?.colors?.tokens || theme?.colors?.tokens;
      if (tokens && value.includes('.')) {
        const parts = value.split('.');
        let resolved: any = tokens;
        
        for (const part of parts) {
          if (resolved && typeof resolved === 'object' && part in resolved) {
            resolved = resolved[part];
          } else {
            return value; // Token not found, return original
          }
        }
        
        return typeof resolved === 'string' ? resolved : value;
      }
      
      return value;
    };
    
    // Resolve theme tokens
    const resolvedTextColor = resolveToken(textColor);
    const resolvedHoverColor = resolveToken(hoverColor);
    const resolvedDropdownBg = resolveToken(dropdownBackground || 'ui.background');
    const resolvedDropdownBorder = resolveToken(dropdownBorder || 'ui.border');
    
    // Map shadow/radius to tailwind classes
    const shadowClass = {
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    }[dropdownShadow || 'lg'];
    
    const radiusClass = {
      sm: 'rounded',
      md: 'rounded-lg',
      lg: 'rounded-xl',
      xl: 'rounded-2xl',
    }[dropdownRadius || 'md'];

    // Filter visible items and sort by position
    const visibleItems = menuItems
      .filter(item => item.isVisible)
      .sort((a, b) => a.position - b.position);

    // Recursive function to render menu items with Medusa UI
    const renderMenuItem = (item: MenuItem, depth: number = 1): React.ReactNode => {
      if (depth > maxDepth) return null;

      const hasChildren = item.children && item.children.length > 0;
      const isOpen = openDropdowns.has(item.id);
      const visibleChildren = hasChildren 
        ? item.children!.filter(child => child.isVisible).sort((a, b) => a.position - b.position)
        : [];

      const linkProps = {
        href: item.url || '#',
        target: item.openInNewTab ? '_blank' : undefined,
        rel: item.openInNewTab ? 'noopener noreferrer' : undefined,
      };

      // If item has children, render with dropdown
      if (hasChildren && visibleChildren.length > 0) {
        return (
          <div
            key={item.id}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={() => handleMouseLeave(item.id)}
          >
            <DropdownMenu open={isOpen} onOpenChange={(open) => {
              if (open) {
                handleMouseEnter(item.id);
              } else {
                handleMouseLeave(item.id);
              }
            }}>
              <DropdownMenu.Trigger asChild>
                <button
                  className={`
                    flex items-center gap-1 px-4 py-2 transition-all cursor-pointer
                    ${hoverEffect === 'underline' ? 'hover:underline' : ''}
                    ${hoverEffect === 'background' ? 'hover:bg-gray-100 rounded' : ''}
                  `}
                  style={{ 
                    color: resolvedTextColor,
                    fontSize: fontSize === 'sm' ? '0.875rem' : fontSize === 'lg' ? '1.125rem' : '1rem',
                    fontWeight: fontWeight === 'normal' ? 400 : fontWeight === 'medium' ? 500 : fontWeight === 'semibold' ? 600 : 700,
                    background: 'none',
                    border: 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (hoverEffect === 'color') {
                      e.currentTarget.style.color = resolvedHoverColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (hoverEffect === 'color') {
                      e.currentTarget.style.color = resolvedTextColor;
                    }
                  }}
                >
                  {getDisplayLabel(item)}
                  {showDropdownArrows && <ChevronDown className="w-4 h-4" />}
                </button>
              </DropdownMenu.Trigger>
              
              <DropdownMenu.Content 
                className={`${shadowClass} ${radiusClass} min-w-[200px]`}
                style={{
                  backgroundColor: resolvedDropdownBg,
                  borderColor: resolvedDropdownBorder,
                }}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={() => handleMouseLeave(item.id)}
              >
                {visibleChildren.map(child => renderDropdownItem(child, depth + 1))}
              </DropdownMenu.Content>
            </DropdownMenu>
          </div>
        );
      }

      // Single item without children
      return (
        <Link
          key={item.id}
          {...linkProps}
          className={`
            block px-4 py-2 transition-all
            ${hoverEffect === 'underline' ? 'hover:underline' : ''}
            ${hoverEffect === 'background' ? 'hover:bg-gray-100 rounded' : ''}
          `}
          style={{ 
            color: resolvedTextColor,
            fontSize: fontSize === 'sm' ? '0.875rem' : fontSize === 'lg' ? '1.125rem' : '1rem',
            fontWeight: fontWeight === 'normal' ? 400 : fontWeight === 'medium' ? 500 : fontWeight === 'semibold' ? 600 : 700,
          }}
          onMouseEnter={(e) => {
            if (hoverEffect === 'color') {
              e.currentTarget.style.color = resolvedHoverColor;
            }
          }}
          onMouseLeave={(e) => {
            if (hoverEffect === 'color') {
              e.currentTarget.style.color = resolvedTextColor;
            }
          }}
        >
          {getDisplayLabel(item)}
        </Link>
      );
    };

    // Render items inside dropdown (nested)
    const renderDropdownItem = (item: MenuItem, depth: number): React.ReactNode => {
      if (depth > maxDepth) return null;

      const hasChildren = item.children && item.children.length > 0;
      const isOpen = openDropdowns.has(item.id);
      const visibleChildren = hasChildren 
        ? item.children!.filter(child => child.isVisible).sort((a, b) => a.position - b.position)
        : [];

      const linkProps = {
        href: item.url || '#',
        target: item.openInNewTab ? '_blank' : undefined,
        rel: item.openInNewTab ? 'noopener noreferrer' : undefined,
      };

      // If item has children, render as submenu
      if (hasChildren && visibleChildren.length > 0) {
        return (
          <DropdownMenu.SubMenu 
            key={item.id}
            open={isOpen}
            onOpenChange={(open) => {
              if (open) {
                handleMouseEnter(item.id);
              } else {
                handleMouseLeave(item.id);
              }
            }}
          >
            <DropdownMenu.SubMenuTrigger
              style={{
                color: resolvedTextColor,
                fontSize: fontSize === 'sm' ? '0.875rem' : fontSize === 'lg' ? '1.125rem' : '1rem',
              }}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={() => handleMouseLeave(item.id)}
            >
              {getDisplayLabel(item)}
            </DropdownMenu.SubMenuTrigger>
            <DropdownMenu.SubMenuContent
              className={`${shadowClass} ${radiusClass}`}
              style={{
                backgroundColor: resolvedDropdownBg,
                borderColor: resolvedDropdownBorder,
              }}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={() => handleMouseLeave(item.id)}
            >
              {visibleChildren.map(child => renderDropdownItem(child, depth + 1))}
            </DropdownMenu.SubMenuContent>
          </DropdownMenu.SubMenu>
        );
      }

      // Single item in dropdown
      return (
        <DropdownMenu.Item key={item.id} asChild>
          <Link
            {...linkProps}
            style={{ 
              color: resolvedTextColor,
              fontSize: fontSize === 'sm' ? '0.875rem' : fontSize === 'lg' ? '1.125rem' : '1rem',
            }}
          >
            {item.label}
          </Link>
        </DropdownMenu.Item>
      );
    };

    if (loading) {
      return (
        <nav className="flex items-center justify-center p-4">
          <div className="text-gray-500">Loading menu...</div>
        </nav>
      );
    }

    if (error) {
      return (
        <nav className="flex items-center justify-center p-4">
          <div className="text-red-500">Error: {error}</div>
        </nav>
      );
    }

    if (visibleItems.length === 0) {
      return (
        <nav className="flex items-center justify-center p-4">
          <div className="text-gray-500">No menu items available</div>
        </nav>
      );
    }

    const alignmentClasses = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    };

    const layoutClasses = {
      horizontal: 'flex-row',
      vertical: 'flex-col',
      stacked: 'flex-col',
    };

    return (
      <nav className={`flex ${layoutClasses[layout]} ${alignmentClasses[alignment]}`}>
        <div className={`flex ${layoutClasses[layout]} gap-2`}>
          {visibleItems.map(item => renderMenuItem(item, 1))}
        </div>
      </nav>
    );
  },
};
