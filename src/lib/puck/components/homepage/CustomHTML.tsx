import { ComponentConfig } from "@measured/puck";
import React from "react";

export interface CustomHTMLProps {
  // Content
  htmlContent: string;
  cssContent: string;
  
  // Container
  useContainer: boolean;
  maxWidth: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  
  // Spacing
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  
  // Background
  backgroundColor: string;
  backgroundImage: string;
  
  // Safety
  sanitizeHTML: boolean;
}

export const CustomHTML: ComponentConfig<CustomHTMLProps> = {
  label: "Custom HTML",
  
  fields: {
    // Content
    htmlContent: {
      type: "textarea",
      label: "HTML Content",
    },
    cssContent: {
      type: "textarea",
      label: "Custom CSS (optional)",
    },
    
    // Container
    useContainer: {
      type: "radio",
      label: "Use Container",
      options: [
        { label: "Yes", value: true },
        { label: "No (Full Width)", value: false },
      ],
    },
    maxWidth: {
      type: "select",
      label: "Max Width",
      options: [
        { label: "Small (640px)", value: "sm" },
        { label: "Medium (768px)", value: "md" },
        { label: "Large (1024px)", value: "lg" },
        { label: "Extra Large (1280px)", value: "xl" },
        { label: "2X Large (1536px)", value: "2xl" },
        { label: "Full Width", value: "full" },
      ],
    },
    
    // Spacing
    paddingTop: {
      type: "number",
      label: "Padding Top (px)",
      min: 0,
      max: 200,
    },
    paddingBottom: {
      type: "number",
      label: "Padding Bottom (px)",
      min: 0,
      max: 200,
    },
    paddingLeft: {
      type: "number",
      label: "Padding Left (px)",
      min: 0,
      max: 200,
    },
    paddingRight: {
      type: "number",
      label: "Padding Right (px)",
      min: 0,
      max: 200,
    },
    
    // Background
    backgroundColor: {
      type: "text",
      label: "Background Color (hex)",
    },
    backgroundImage: {
      type: "text",
      label: "Background Image URL",
    },
    
    // Safety
    sanitizeHTML: {
      type: "radio",
      label: "Sanitize HTML (recommended)",
      options: [
        { label: "Yes (Safe)", value: true },
        { label: "No (Trust Content)", value: false },
      ],
    },
  },
  
  defaultProps: {
    htmlContent: `<div class="custom-section">
  <h2>Custom HTML Section</h2>
  <p>Add your custom HTML content here. You can include any HTML tags, inline styles, and even JavaScript.</p>
  <button class="custom-btn">Click Me</button>
</div>`,
    cssContent: `.custom-section {
  text-align: center;
}

.custom-btn {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.custom-btn:hover {
  background-color: #2563eb;
}`,
    useContainer: true,
    maxWidth: "lg",
    paddingTop: 64,
    paddingBottom: 64,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#ffffff",
    backgroundImage: "",
    sanitizeHTML: true,
  },
  
  render: (props) => {
    const maxWidthClasses = {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      full: "max-w-full",
    };
    
    // Basic HTML sanitization (in production, use DOMPurify or similar)
    const sanitizeHTML = (html: string) => {
      if (!props.sanitizeHTML) return html;
      
      // Remove script tags and event handlers
      return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/javascript:/gi, '');
    };
    
    const containerClass = props.useContainer
      ? `${maxWidthClasses[props.maxWidth]} mx-auto px-4`
      : "w-full";
    
    const backgroundStyle = {
      backgroundColor: props.backgroundColor,
      backgroundImage: props.backgroundImage ? `url(${props.backgroundImage})` : undefined,
      backgroundSize: "cover",
      backgroundPosition: "center",
      paddingTop: `${props.paddingTop}px`,
      paddingBottom: `${props.paddingBottom}px`,
      paddingLeft: `${props.paddingLeft}px`,
      paddingRight: `${props.paddingRight}px`,
    };
    
    return (
      <div className="custom-html-section" style={backgroundStyle}>
        <div className={containerClass}>
          {/* Custom CSS */}
          {props.cssContent && (
            <style dangerouslySetInnerHTML={{ __html: props.cssContent }} />
          )}
          
          {/* Custom HTML */}
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHTML(props.htmlContent),
            }}
          />
        </div>
      </div>
    );
  },
};

export default CustomHTML;
