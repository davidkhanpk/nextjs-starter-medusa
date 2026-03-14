'use client';

import { ComponentConfig } from "@measured/puck";
import { useProduct } from "@lib/hooks/useProduct";
import { Heart } from "lucide-react";
import { useState } from "react";

export interface WishlistButtonProps {
  showLabel?: boolean;
  labelText?: string;
  size?: "small" | "medium" | "large";
  style?: "default" | "outline" | "ghost" | "icon-only";
  iconPosition?: "left" | "right";
}

export const WishlistButton: ComponentConfig<WishlistButtonProps> = {
  label: "Wishlist Button",

  fields: {
    showLabel: {
      type: "radio",
      label: "Show Label",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    labelText: {
      type: "text",
      label: "Label Text",
    },
    size: {
      type: "select",
      label: "Size",
      options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
      ],
    },
    style: {
      type: "select",
      label: "Style",
      options: [
        { label: "Default", value: "default" },
        { label: "Outline", value: "outline" },
        { label: "Ghost", value: "ghost" },
        { label: "Icon Only", value: "icon-only" },
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
  },

  defaultProps: {
    showLabel: true,
    labelText: "Add to Wishlist",
    size: "medium",
    style: "outline",
    iconPosition: "left",
  },

  render: ({
    showLabel,
    labelText,
    size = "medium",
    style = "outline",
    iconPosition = "left",
  }: WishlistButtonProps) => {
    const { product } = useProduct();
    const [isInWishlist, setIsInWishlist] = useState(false);

    if (!product) {
      return null;
    }

    const handleToggleWishlist = () => {
      // TODO: Integrate with actual wishlist API
      setIsInWishlist(!isInWishlist);
      
      if (!isInWishlist) {
        console.log("Added to wishlist:", product.id);
        // Show success notification
      } else {
        console.log("Removed from wishlist:", product.id);
      }
    };

    const sizeClasses = {
      small: "px-3 py-1.5 text-sm",
      medium: "px-4 py-2 text-base",
      large: "px-6 py-3 text-lg",
    };

    const iconSizeClasses = {
      small: "w-4 h-4",
      medium: "w-5 h-5",
      large: "w-6 h-6",
    };

    const styleClasses = {
      default: isInWishlist
        ? "bg-red-500 text-white hover:bg-red-600"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200",
      outline: isInWishlist
        ? "border-2 border-red-500 text-red-500 bg-red-50 hover:bg-red-100"
        : "border-2 border-gray-300 text-gray-700 hover:border-gray-400",
      ghost: isInWishlist
        ? "text-red-500 hover:bg-red-50"
        : "text-gray-700 hover:bg-gray-100",
      "icon-only": isInWishlist
        ? "text-red-500 hover:bg-red-50 p-2"
        : "text-gray-700 hover:bg-gray-100 p-2",
    };

    const heartIcon = (
      <Heart
        className={`${iconSizeClasses[size] || 'w-5 h-5'} ${isInWishlist ? "fill-current" : ""}`}
      />
    );

    const buttonLabel = isInWishlist
      ? "Remove from Wishlist"
      : labelText;

    return (
      <button
        type="button"
        onClick={handleToggleWishlist}
        className={`
          wishlist-button
          inline-flex items-center justify-center gap-2
          font-medium rounded-lg
          transition-all duration-200
          ${style === "icon-only" ? "p-2" : (sizeClasses[size] || 'px-4 py-2 text-base')}
          ${styleClasses[style] || 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
        `}
        aria-label={buttonLabel}
        title={buttonLabel}
      >
        {iconPosition === "left" && heartIcon}
        {(showLabel && style !== "icon-only") && (
          <span>{buttonLabel}</span>
        )}
        {iconPosition === "right" && heartIcon}
      </button>
    );
  },
};
