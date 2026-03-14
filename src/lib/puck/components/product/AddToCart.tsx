'use client';

import { ComponentConfig } from "@measured/puck";
import { useProduct } from "@lib/hooks/useProduct";
import { useCart } from "@lib/hooks/useCart";
import { useState, useMemo, useEffect } from "react";
import { ShoppingCart, Check } from "lucide-react";

export interface AddToCartProps {
  variant: "primary" | "secondary" | "outline" | "ghost" | "custom";
  size: "sm" | "md" | "lg";
  fullWidth: boolean;
  text: string;
  showIcon: boolean;
  disabled: boolean;
  // Color properties
  backgroundColor: string;
  textColor: string;
  hoverBackgroundColor: string;
  hoverTextColor: string;
  borderColor: string;
  useThemeColors: boolean;
  // Spacing properties
  marginTop: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
  paddingX: string;
  paddingY: string;
  borderRadius: string;
}

export const AddToCart: ComponentConfig<AddToCartProps> = {
  label: "Add to Cart Button",

  fields: {
    text: {
      type: "text",
      label: "Button Text",
    },
    variant: {
      type: "select",
      label: "Style",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Outline", value: "outline" },
        { label: "Ghost", value: "ghost" },
        { label: "Custom Colors", value: "custom" },
      ],
    },
    useThemeColors: {
      type: "radio",
      label: "Use Theme Colors",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    backgroundColor: {
      type: "text",
      label: "Background Color (hex, rgb, or theme token)",
    },
    textColor: {
      type: "text",
      label: "Text Color (hex, rgb, or theme token)",
    },
    hoverBackgroundColor: {
      type: "text",
      label: "Hover Background Color",
    },
    hoverTextColor: {
      type: "text",
      label: "Hover Text Color",
    },
    borderColor: {
      type: "text",
      label: "Border Color (for outline variant)",
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
    fullWidth: {
      type: "radio",
      label: "Full Width",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showIcon: {
      type: "radio",
      label: "Show Cart Icon",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      options: [
        { label: "None", value: "rounded-none" },
        { label: "Small", value: "rounded-sm" },
        { label: "Medium", value: "rounded-md" },
        { label: "Large", value: "rounded-lg" },
        { label: "Extra Large", value: "rounded-xl" },
        { label: "Full", value: "rounded-full" },
      ],
    },
    marginTop: {
      type: "select",
      label: "Margin Top",
      options: [
        { label: "None", value: "mt-0" },
        { label: "Small (0.5rem)", value: "mt-2" },
        { label: "Medium (1rem)", value: "mt-4" },
        { label: "Large (1.5rem)", value: "mt-6" },
        { label: "X-Large (2rem)", value: "mt-8" },
      ],
    },
    marginBottom: {
      type: "select",
      label: "Margin Bottom",
      options: [
        { label: "None", value: "mb-0" },
        { label: "Small (0.5rem)", value: "mb-2" },
        { label: "Medium (1rem)", value: "mb-4" },
        { label: "Large (1.5rem)", value: "mb-6" },
        { label: "X-Large (2rem)", value: "mb-8" },
      ],
    },
    marginLeft: {
      type: "select",
      label: "Margin Left",
      options: [
        { label: "None", value: "ml-0" },
        { label: "Auto", value: "ml-auto" },
        { label: "Small", value: "ml-2" },
        { label: "Medium", value: "ml-4" },
      ],
    },
    marginRight: {
      type: "select",
      label: "Margin Right",
      options: [
        { label: "None", value: "mr-0" },
        { label: "Auto", value: "mr-auto" },
        { label: "Small", value: "mr-2" },
        { label: "Medium", value: "mr-4" },
      ],
    },
    paddingX: {
      type: "select",
      label: "Horizontal Padding",
      options: [
        { label: "Small", value: "px-4" },
        { label: "Medium", value: "px-6" },
        { label: "Large", value: "px-8" },
        { label: "X-Large", value: "px-10" },
      ],
    },
    paddingY: {
      type: "select",
      label: "Vertical Padding",
      options: [
        { label: "Small", value: "py-2" },
        { label: "Medium", value: "py-3" },
        { label: "Large", value: "py-4" },
        { label: "X-Large", value: "py-5" },
      ],
    },
    disabled: {
      type: "radio",
      label: "Disabled State (Preview)",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    text: "Add to Cart",
    variant: "primary",
    size: "md",
    fullWidth: false,
    showIcon: true,
    disabled: false,
    backgroundColor: "#000000",
    textColor: "#ffffff",
    hoverBackgroundColor: "#1f2937",
    hoverTextColor: "#ffffff",
    borderColor: "#000000",
    useThemeColors: false,
    marginTop: "mt-4",
    marginBottom: "mb-4",
    marginLeft: "ml-0",
    marginRight: "mr-0",
    paddingX: "px-6",
    paddingY: "py-3",
    borderRadius: "rounded-lg",
  },

  render: (props) => {
    const { 
      text, variant = 'primary', size = 'md', fullWidth = false, showIcon = true, disabled = false,
      backgroundColor = '#000000', textColor = '#ffffff', hoverBackgroundColor = '#1f2937', hoverTextColor = '#ffffff', borderColor = '#000000', useThemeColors = false,
      marginTop = 'mt-4', marginBottom = 'mb-4', marginLeft = 'ml-0', marginRight = 'mr-0', paddingX = 'px-6', paddingY = 'py-3', borderRadius = 'rounded-lg'
    } = props;
    
    const { product, countryCode, selectedVariant, theme, quantity } = useProduct();
    const { addItem, isLoading } = useCart();
    const [justAdded, setJustAdded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Variant and size class maps (declared early so preview block can use them)
    const variantClassesPreview: Record<string, string> = {
      primary: "bg-black text-white hover:bg-gray-900",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
      outline: "border-2 border-black text-black hover:bg-black hover:text-white bg-transparent",
      ghost: "text-black hover:bg-gray-100 bg-transparent",
      custom: "",
    };

    const sizeClasses: Record<string, string> = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    };

    // Show visual preview even in editor (when product is null)
    if (!product) {
      const previewStyles: React.CSSProperties = {
        backgroundColor: variant === 'custom' && backgroundColor ? backgroundColor : undefined,
        color: variant === 'custom' && textColor ? textColor : undefined,
        borderColor: variant === 'outline' && borderColor ? borderColor : undefined,
      };

      return (
        <button
          type="button"
          disabled
          className={`
            ${variant === 'custom' ? '' : variantClassesPreview[variant]}
            ${sizeClasses[size]}
            ${fullWidth ? 'w-full' : ''}
            ${marginTop} ${marginBottom} ${marginLeft} ${marginRight}
            ${paddingX} ${paddingY}
            ${borderRadius}
            font-medium transition-all duration-200
            disabled:opacity-70 disabled:cursor-not-allowed
            flex items-center justify-center gap-2
            ${variant === 'outline' ? 'border-2' : ''}
          `}
          style={variant === 'custom' ? previewStyles : undefined}
        >
          {showIcon && <ShoppingCart className="w-5 h-5" />}
          {text || 'Add to Cart'}
        </button>
      );
    }

    // Check if selected variant is in stock
    const inStock = useMemo(() => {
      if (!selectedVariant) return false;
      
      // If we don't manage inventory, we can always add to cart
      if (!selectedVariant.manage_inventory) {
        return true;
      }

      // If we allow back orders, we can add to cart
      if (selectedVariant.allow_backorder) {
        return true;
      }

      // If there is inventory available, we can add to cart
      if (selectedVariant.manage_inventory && (selectedVariant.inventory_quantity || 0) > 0) {
        return true;
      }

      return false;
    }, [selectedVariant]);

    const isDisabled = disabled || !selectedVariant || !inStock || isLoading;

    const handleAddToCart = async () => {
      if (!selectedVariant?.id || isDisabled) return;

      try {
        await addItem({
          variantId: selectedVariant.id,
          quantity: quantity || 1,  // Use quantity from context
          countryCode: countryCode || 'us',
        });

        // Show success state
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 2000);
      } catch (error) {
        console.error("Failed to add to cart:", error);
      }
    };

    // Resolve colors from theme tokens if using theme colors
    const resolveColor = (color: string): string => {
      if (!useThemeColors || !theme?.globalSettings?.colors?.tokens) return color;
      
      // Check if color is a theme token (e.g., "button.primary")
      if (color.includes('.')) {
        const parts = color.split('.');
        let value: any = theme.globalSettings.colors.tokens;
        for (const part of parts) {
          value = value?.[part];
          if (!value) break;
        }
        return value || color;
      }
      
      return color;
    };

    // Get resolved colors
    const resolvedBg = resolveColor(backgroundColor);
    const resolvedText = resolveColor(textColor);
    const resolvedHoverBg = resolveColor(hoverBackgroundColor);
    const resolvedHoverText = resolveColor(hoverTextColor);
    const resolvedBorder = resolveColor(borderColor);

    // Build custom styles
    const customStyles: React.CSSProperties = {};
    if (variant === 'custom') {
      customStyles.backgroundColor = isHovered ? resolvedHoverBg : resolvedBg;
      customStyles.color = isHovered ? resolvedHoverText : resolvedText;
      if (borderColor) {
        customStyles.borderColor = resolvedBorder;
        customStyles.borderWidth = '2px';
        customStyles.borderStyle = 'solid';
      }
    }

    const widthClass = fullWidth ? "w-full" : "";

    return (
      <button
        type="button"
        disabled={isDisabled}
        className={`
          ${variant === 'custom' ? '' : variantClassesPreview[variant]}
          ${sizeClasses[size]}
          ${widthClass}
          ${marginTop} ${marginBottom} ${marginLeft} ${marginRight}
          ${paddingX} ${paddingY}
          ${borderRadius}
          font-medium
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center gap-2
          ${justAdded ? "!bg-green-600 !text-white" : ""}
        `}
        style={variant === 'custom' ? customStyles : undefined}
        onClick={handleAddToCart}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {showIcon && (
          justAdded ? (
            <Check className="w-5 h-5" />
          ) : (
            <ShoppingCart className="w-5 h-5" />
          )
        )}
        <span>
          {isLoading 
            ? "Adding..." 
            : justAdded 
            ? "Added!" 
            : !selectedVariant
            ? "Select variant"
            : !inStock
            ? "Out of Stock"
            : text || 'Add to Cart'}
        </span>
      </button>
    );
  },
};