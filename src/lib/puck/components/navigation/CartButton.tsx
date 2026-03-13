'use client';

import React from "react";
import { ComponentConfig } from "@measured/puck";
import { ShoppingCart } from "lucide-react";
import { usePuckContext } from "@/components/puck/PuckContextProvider";
import CartDrawer from "@/components/cart/CartDrawer";

export interface CartButtonProps {
  showLabel: boolean;
  label: string;
  showBadge: boolean;
  badgePosition: "top-right" | "top-left" | "bottom-right";
  iconSize: "sm" | "md" | "lg";
  iconColor: string;
  hoverColor: string;
  badgeBackgroundColor: string;
  badgeTextColor: string;
  style: "minimal" | "outlined" | "filled";
}

export const CartButton: ComponentConfig<CartButtonProps> = {
  label: "Cart Button",
  
  fields: {
    showLabel: {
      type: "radio",
      label: "Show Label",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    label: {
      type: "text",
      label: "Button Label",
    },
    showBadge: {
      type: "radio",
      label: "Show Item Count Badge",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    badgePosition: {
      type: "select",
      label: "Badge Position",
      options: [
        { label: "Top Right", value: "top-right" },
        { label: "Top Left", value: "top-left" },
        { label: "Bottom Right", value: "bottom-right" },
      ],
    },
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
    badgeBackgroundColor: {
      type: "text",
      label: "Badge Background Color",
    },
    badgeTextColor: {
      type: "text",
      label: "Badge Text Color",
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
  },

  defaultProps: {
    showLabel: false,
    label: "Cart",
    showBadge: true,
    badgePosition: "top-right",
    iconSize: "md",
    iconColor: "#000000",
    hoverColor: "#3b82f6",
    badgeBackgroundColor: "#ef4444",
    badgeTextColor: "#ffffff",
    style: "minimal",
  },

  render: ({
    showLabel,
    label,
    showBadge,
    badgePosition,
    iconSize,
    iconColor,
    hoverColor,
    badgeBackgroundColor,
    badgeTextColor,
    style,
  }) => {
    const context = usePuckContext();
    const [cartCount, setCartCount] = React.useState(0);
    const [isHovered, setIsHovered] = React.useState(false);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    // Fetch cart count from context or API
    React.useEffect(() => {
      if (context?.cartItemsCount !== undefined) {
        setCartCount(context.cartItemsCount);
        return;
      }

      const fetchCartCount = async () => {
        try {
          const response = await fetch('/api/cart/count');
          if (response.ok) {
            const data = await response.json();
            setCartCount(data.count || 0);
          }
        } catch (error) {
          console.error('Failed to fetch cart count:', error);
        }
      };

      fetchCartCount();
    }, [context]);

    const sizeMap = {
      sm: 20,
      md: 24,
      lg: 28,
    };

    const iconSizeValue = sizeMap[iconSize];

    const badgePositionClasses = {
      "top-right": "-top-2 -right-2",
      "top-left": "-top-2 -left-2",
      "bottom-right": "-bottom-2 -right-2",
    };

    const styleClasses = {
      minimal: "p-2 rounded-full hover:bg-gray-100",
      outlined: "p-2 border-2 rounded-full hover:bg-gray-100",
      filled: "p-2 rounded-full",
    };

    return (
      <>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className={`relative flex items-center gap-2 transition-all ${styleClasses[style]}`}
          style={{
            color: isHovered ? hoverColor : iconColor,
            backgroundColor: style === 'filled' ? (isHovered ? hoverColor : iconColor) : 'transparent',
            borderColor: style === 'outlined' ? iconColor : 'transparent',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={`Shopping cart with ${cartCount} items`}
        >
          <div className="relative">
            <ShoppingCart
              size={iconSizeValue}
              style={{
                color: style === 'filled' ? '#ffffff' : (isHovered ? hoverColor : iconColor)
              }}
            />

            {showBadge && cartCount > 0 && (
              <span
                className={`absolute ${badgePositionClasses[badgePosition]} rounded-full min-w-[20px] h-5 flex items-center justify-center text-xs font-bold px-1.5`}
                style={{
                  backgroundColor: badgeBackgroundColor,
                  color: badgeTextColor,
                }}
              >
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>

          {showLabel && (
            <span
              className="font-medium"
              style={{
                color: style === 'filled' ? '#ffffff' : (isHovered ? hoverColor : iconColor)
              }}
            >
              {label}
            </span>
          )}
        </button>

        <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </>
    );
  },
};
