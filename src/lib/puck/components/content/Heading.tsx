import { ComponentConfig } from "@measured/puck";
import { resolveColor } from "@/lib/theme/token-utils";

export interface HeadingProps {
  // Content
  text: string;
  
  // Typography
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  fontWeight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
  
  // Alignment
  textAlign?: "left" | "center" | "right";
  
  // Styling
  color?: string;
  fontSize?: string;
  lineHeight?: "tight" | "snug" | "normal" | "relaxed" | "loose";
  letterSpacing?: "tighter" | "tight" | "normal" | "wide" | "wider";
  
  // Spacing
  marginTop?: number;
  marginBottom?: number;
  
  // Animation
  animation?: "none" | "fadeIn" | "slideUp" | "slideDown";
  animationDelay?: number;
}

export const Heading: ComponentConfig<HeadingProps> = {
  label: "Heading",
  
  fields: {
    // Content
    text: {
      type: "text",
      label: "Heading Text",
    },
    
    // Typography
    level: {
      type: "select",
      label: "Heading Level",
      options: [
        { label: "H1 (Largest)", value: "h1" },
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
        { label: "H4", value: "h4" },
        { label: "H5", value: "h5" },
        { label: "H6 (Smallest)", value: "h6" },
      ],
    },
    size: {
      type: "select",
      label: "Size Preset",
      options: [
        { label: "Extra Small", value: "xs" },
        { label: "Small", value: "sm" },
        { label: "Base", value: "base" },
        { label: "Large", value: "lg" },
        { label: "XL", value: "xl" },
        { label: "2XL", value: "2xl" },
        { label: "3XL", value: "3xl" },
        { label: "4XL", value: "4xl" },
        { label: "5XL", value: "5xl" },
      ],
    },
    fontWeight: {
      type: "select",
      label: "Font Weight",
      options: [
        { label: "Light", value: "light" },
        { label: "Normal", value: "normal" },
        { label: "Medium", value: "medium" },
        { label: "Semi Bold", value: "semibold" },
        { label: "Bold", value: "bold" },
        { label: "Extra Bold", value: "extrabold" },
      ],
    },
    
    // Alignment
    textAlign: {
      type: "select",
      label: "Text Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    
    // Styling
    color: {
      type: "text",
      label: "Text Color (hex)",
    },
    fontSize: {
      type: "text",
      label: "Font Size (e.g., 2.5rem, 40px)",
    },
    lineHeight: {
      type: "select",
      label: "Line Height",
      options: [
        { label: "Tight", value: "tight" },
        { label: "Snug", value: "snug" },
        { label: "Normal", value: "normal" },
        { label: "Relaxed", value: "relaxed" },
        { label: "Loose", value: "loose" },
      ],
    },
    letterSpacing: {
      type: "select",
      label: "Letter Spacing",
      options: [
        { label: "Tighter", value: "tighter" },
        { label: "Tight", value: "tight" },
        { label: "Normal", value: "normal" },
        { label: "Wide", value: "wide" },
        { label: "Wider", value: "wider" },
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
    
    // Animation
    animation: {
      type: "select",
      label: "Animation",
      options: [
        { label: "None", value: "none" },
        { label: "Fade In", value: "fadeIn" },
        { label: "Slide Up", value: "slideUp" },
        { label: "Slide Down", value: "slideDown" },
      ],
    },
    animationDelay: {
      type: "number",
      label: "Animation Delay (ms)",
      min: 0,
      max: 2000,
    },
  },
  
  defaultProps: {
    text: "Your Heading Here",
    level: "h2",
    fontWeight: "bold",
    textAlign: "left",
    color: "#1f2937",
    fontSize: "",
    lineHeight: "normal",
    letterSpacing: "normal",
    marginTop: 0,
    marginBottom: 16,
    animation: "none",
    animationDelay: 0,
  },
  
  render: (props) => {
    console.log('[Heading] Rendering with props:', { text: props.text, level: props.level, size: props.size });
    const Tag = props.level;
    
    // Size preset to fontSize mapping
    const sizeClasses = {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
    };
    
    const weightClasses = {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    };
    
    const alignClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };
    
    const lineHeightClasses = {
      tight: "leading-tight",
      snug: "leading-snug",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
      loose: "leading-loose",
    };
    
    const letterSpacingClasses = {
      tighter: "tracking-tighter",
      tight: "tracking-tight",
      normal: "tracking-normal",
      wide: "tracking-wide",
      wider: "tracking-wider",
    };
    
    const animationClasses = {
      none: "",
      fadeIn: "animate-fadeIn",
      slideUp: "animate-slideUp",
      slideDown: "animate-slideDown",
    };
    
    // Use size class if provided, otherwise use custom fontSize
    const sizeClass = props.size ? sizeClasses[props.size] : '';
    const fontWeight = props.fontWeight || 'semibold';
    const textAlign = props.textAlign || 'left';
    const lineHeight = props.lineHeight || 'normal';
    const letterSpacing = props.letterSpacing || 'normal';
    const animation = props.animation || 'none';
    
    return (
      <>
        <Tag
          className={`
            ${sizeClass || ''}
            ${weightClasses[fontWeight] || 'font-semibold'}
            ${alignClasses[textAlign] || 'text-left'}
            ${lineHeightClasses[lineHeight] || 'leading-normal'}
            ${letterSpacingClasses[letterSpacing] || 'tracking-normal'}
            ${animationClasses[animation] || ''}
          `}
          style={{
            color: props.color ? resolveColor(props.color) : undefined,
            fontSize: (!props.size && props.fontSize) ? props.fontSize : undefined,
            marginTop: props.marginTop !== undefined ? `${props.marginTop}px` : undefined,
            marginBottom: props.marginBottom !== undefined ? `${props.marginBottom}px` : undefined,
            animationDelay: props.animationDelay !== undefined ? `${props.animationDelay}ms` : undefined,
          }}
        >
          {props.text}
        </Tag>
        
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out forwards;
          }
          .animate-slideUp {
            animation: slideUp 0.6s ease-out forwards;
          }
          .animate-slideDown {
            animation: slideDown 0.6s ease-out forwards;
          }
        `}</style>
      </>
    );
  },
};

export default Heading;
