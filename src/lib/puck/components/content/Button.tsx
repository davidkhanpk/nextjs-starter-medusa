import { ComponentConfig } from "@measured/puck";
import { resolveColor } from "@/lib/theme/token-utils";
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export interface ButtonProps {
  // Content
  text: string;
  url: string;
  openInNewTab: boolean;
  
  // Style
  variant: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size: "sm" | "md" | "lg" | "xl";
  fullWidth: boolean;
  
  // Colors
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  hoverBackgroundColor: string;
  hoverTextColor: string;
  
  // Icon
  showIcon: boolean;
  iconPosition: "left" | "right";
  iconName: string;
  
  // Styling
  borderRadius: "none" | "sm" | "md" | "lg" | "full";
  shadow: "none" | "sm" | "md" | "lg" | "xl";
  
  // Alignment
  alignment: "left" | "center" | "right";
  
  // Spacing
  marginTop: number;
  marginBottom: number;
}

export const Button: ComponentConfig<ButtonProps> = {
  label: "Button",
  
  fields: {
    // Content
    text: {
      type: "text",
      label: "Button Text",
    },
    url: {
      type: "text",
      label: "Link URL",
    },
    openInNewTab: {
      type: "radio",
      label: "Open in New Tab",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    
    // Style
    variant: {
      type: "select",
      label: "Button Variant",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Outline", value: "outline" },
        { label: "Ghost", value: "ghost" },
        { label: "Danger", value: "danger" },
      ],
    },
    size: {
      type: "select",
      label: "Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
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
    
    // Colors
    backgroundColor: {
      type: "text",
      label: "Background Color (hex)",
    },
    textColor: {
      type: "text",
      label: "Text Color (hex)",
    },
    borderColor: {
      type: "text",
      label: "Border Color (hex)",
    },
    hoverBackgroundColor: {
      type: "text",
      label: "Hover Background Color (hex)",
    },
    hoverTextColor: {
      type: "text",
      label: "Hover Text Color (hex)",
    },
    
    // Icon
    showIcon: {
      type: "radio",
      label: "Show Icon",
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
    iconName: {
      type: "text",
      label: "Icon Name (e.g., arrow-right, shopping-cart)",
    },
    
    // Styling
    borderRadius: {
      type: "select",
      label: "Border Radius",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Full (Pill)", value: "full" },
      ],
    },
    shadow: {
      type: "select",
      label: "Shadow",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
      ],
    },
    
    // Alignment
    alignment: {
      type: "select",
      label: "Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    
    // Spacing
    marginTop: {
      type: "number",
      label: "Margin Top (px)",
      min: 0,
      max: 200,
    },
    marginBottom: {
      type: "number",
      label: "Margin Bottom (px)",
      min: 0,
      max: 200,
    },
  },
  
  defaultProps: {
    text: "Click Me",
    url: "#",
    openInNewTab: false,
    variant: "primary",
    size: "md",
    fullWidth: false,
    backgroundColor: "#3b82f6",
    textColor: "#ffffff",
    borderColor: "#3b82f6",
    hoverBackgroundColor: "#2563eb",
    hoverTextColor: "#ffffff",
    showIcon: false,
    iconPosition: "right",
    iconName: "arrow-right",
    borderRadius: "md",
    shadow: "md",
    alignment: "left",
    marginTop: 0,
    marginBottom: 16,
  },
  
  render: (props) => {
    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
      xl: "px-10 py-5 text-xl",
    };
    
    const radiusClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };
    
    const shadowClasses = {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    };
    
    const alignmentClasses = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    };
    
    return (
      <div className={`button-wrapper flex ${alignmentClasses[props.alignment]}`}>
        <a
          href={props.url}
          target={props.openInNewTab ? "_blank" : undefined}
          rel={props.openInNewTab ? "noopener noreferrer" : undefined}
          className={`
            button
            inline-flex items-center gap-2
            font-semibold
            transition-all duration-200
            hover:scale-105
            active:scale-95
            ${sizeClasses[props.size]}
            ${radiusClasses[props.borderRadius]}
            ${shadowClasses[props.shadow]}
            ${props.fullWidth ? "w-full justify-center" : ""}
          `}
          style={{
            backgroundColor: resolveColor(props.backgroundColor),
            color: resolveColor(props.textColor),
            borderWidth: props.variant === "outline" ? "2px" : "0",
            borderColor: resolveColor(props.borderColor),
            marginTop: `${props.marginTop}px`,
            marginBottom: `${props.marginBottom}px`,
          }}
        >
          {props.showIcon && props.iconPosition === "left" && (
            <ArrowRightIcon className="w-5 h-5" />
          )}
          
          {props.text}
          
          {props.showIcon && props.iconPosition === "right" && (
            <ArrowRightIcon className="w-5 h-5" />
          )}
        </a>
        
        <style jsx>{`
          .button:hover {
            background-color: ${resolveColor(props.hoverBackgroundColor)} !important;
            color: ${resolveColor(props.hoverTextColor)} !important;
          }
        `}</style>
      </div>
    );
  },
};

export default Button;
