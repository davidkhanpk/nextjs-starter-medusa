import { ComponentConfig } from "@measured/puck";
import { resolveColor } from "@/lib/theme/token-utils";

export interface TextProps {
  // Content
  text: string;
  richText: boolean;
  
  // Typography
  fontSize: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
  fontWeight: "light" | "normal" | "medium" | "semibold" | "bold";
  lineHeight: "tight" | "snug" | "normal" | "relaxed" | "loose";
  
  // Alignment
  textAlign: "left" | "center" | "right" | "justify";
  
  // Styling
  color: string;
  maxWidth: string;
  
  // Spacing
  marginTop: number;
  marginBottom: number;
  paddingX: number;
  paddingY: number;
}

export const Text: ComponentConfig<TextProps> = {
  label: "Text",
  
  fields: {
    // Content
    text: {
      type: "textarea",
      label: "Text Content",
    },
    richText: {
      type: "radio",
      label: "Rich Text (preserve formatting)",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    
    // Typography
    fontSize: {
      type: "select",
      label: "Font Size",
      options: [
        { label: "Extra Small", value: "xs" },
        { label: "Small", value: "sm" },
        { label: "Base", value: "base" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
        { label: "2XL", value: "2xl" },
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
      ],
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
    
    // Alignment
    textAlign: {
      type: "select",
      label: "Text Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
        { label: "Justify", value: "justify" },
      ],
    },
    
    // Styling
    color: {
      type: "text",
      label: "Text Color (hex)",
    },
    maxWidth: {
      type: "text",
      label: "Max Width (e.g., 800px, 80ch)",
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
    paddingX: {
      type: "number",
      label: "Padding Left/Right (px)",
      min: 0,
      max: 100,
    },
    paddingY: {
      type: "number",
      label: "Padding Top/Bottom (px)",
      min: 0,
      max: 100,
    },
  },
  
  defaultProps: {
    text: "Add your text content here. You can write multiple paragraphs, include line breaks, and format your content as needed.",
    richText: false,
    fontSize: "base",
    fontWeight: "normal",
    lineHeight: "relaxed",
    textAlign: "left",
    color: "#374151",
    maxWidth: "",
    marginTop: 0,
    marginBottom: 16,
    paddingX: 0,
    paddingY: 0,
  },
  
  render: (props) => {
    const fontSizeClasses = {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    };
    
    const weightClasses = {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };
    
    const lineHeightClasses = {
      tight: "leading-tight",
      snug: "leading-snug",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
      loose: "leading-loose",
    };
    
    const alignClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    };
    
    return (
      <div
        className={`
          text-component
          ${fontSizeClasses[props.fontSize] || 'text-base'}
          ${weightClasses[props.fontWeight] || 'font-normal'}
          ${lineHeightClasses[props.lineHeight] || 'leading-relaxed'}
          ${alignClasses[props.textAlign] || 'text-left'}
        `}
        style={{
          color: resolveColor(props.color),
          maxWidth: props.maxWidth || undefined,
          marginTop: props.marginTop != null ? `${props.marginTop}px` : '0px',
          marginBottom: props.marginBottom != null ? `${props.marginBottom}px` : '16px',
          paddingLeft: props.paddingX != null ? `${props.paddingX}px` : '0px',
          paddingRight: props.paddingX != null ? `${props.paddingX}px` : '0px',
          paddingTop: props.paddingY != null ? `${props.paddingY}px` : '0px',
          paddingBottom: props.paddingY != null ? `${props.paddingY}px` : '0px',
        }}
      >
        {props.richText ? (
          <div
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{
              __html: props.text.replace(/\n/g, '<br />'),
            }}
          />
        ) : (
          <p className="whitespace-pre-wrap">{props.text}</p>
        )}
      </div>
    );
  },
};

export default Text;
