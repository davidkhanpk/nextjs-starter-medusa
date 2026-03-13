import { ComponentConfig } from "@measured/puck";
import React from "react";

export interface NewsletterProps {
  // Content
  title: string;
  subtitle: string;
  description: string;
  placeholderText: string;
  buttonText: string;
  
  // Privacy
  showPrivacyText: boolean;
  privacyText: string;
  
  // Layout
  layout: "centered" | "split" | "inline";
  showImage: boolean;
  imageUrl: string;
  
  // Form Fields
  collectName: boolean;
  nameRequired: boolean;
  
  // Success Message
  successMessage: string;
  
  // Styling
  backgroundColor: string;
  textColor: string;
  inputBackground: string;
  inputBorder: string;
  buttonBackground: string;
  buttonTextColor: string;
  borderRadius: "none" | "sm" | "md" | "lg" | "full";
}

export const Newsletter: ComponentConfig<NewsletterProps> = {
  label: "Newsletter",
  
  fields: {
    // Content
    title: {
      type: "text",
      label: "Title",
    },
    subtitle: {
      type: "text",
      label: "Subtitle",
    },
    description: {
      type: "textarea",
      label: "Description",
    },
    placeholderText: {
      type: "text",
      label: "Email Placeholder",
    },
    buttonText: {
      type: "text",
      label: "Button Text",
    },
    
    // Privacy
    showPrivacyText: {
      type: "radio",
      label: "Show Privacy Text",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    privacyText: {
      type: "textarea",
      label: "Privacy Text",
    },
    
    // Layout
    layout: {
      type: "select",
      label: "Layout Style",
      options: [
        { label: "Centered", value: "centered" },
        { label: "Split (Text + Image)", value: "split" },
        { label: "Inline", value: "inline" },
      ],
    },
    showImage: {
      type: "radio",
      label: "Show Image (for split layout)",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    imageUrl: {
      type: "text",
      label: "Image URL",
    },
    
    // Form Fields
    collectName: {
      type: "radio",
      label: "Collect Name",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    nameRequired: {
      type: "radio",
      label: "Name Required",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    
    // Success Message
    successMessage: {
      type: "text",
      label: "Success Message",
    },
    
    // Styling
    backgroundColor: {
      type: "text",
      label: "Background Color (hex)",
    },
    textColor: {
      type: "text",
      label: "Text Color (hex)",
    },
    inputBackground: {
      type: "text",
      label: "Input Background (hex)",
    },
    inputBorder: {
      type: "text",
      label: "Input Border (hex)",
    },
    buttonBackground: {
      type: "text",
      label: "Button Background (hex)",
    },
    buttonTextColor: {
      type: "text",
      label: "Button Text Color (hex)",
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Full (Pills)", value: "full" },
      ],
    },
  },
  
  defaultProps: {
    title: "Join Our Newsletter",
    subtitle: "Stay Updated",
    description: "Get the latest updates on new products, exclusive deals, and special offers delivered straight to your inbox.",
    placeholderText: "Enter your email address",
    buttonText: "Subscribe",
    showPrivacyText: true,
    privacyText: "We respect your privacy. Unsubscribe at any time.",
    layout: "centered",
    showImage: true,
    imageUrl: "https://via.placeholder.com/600x400?text=Newsletter+Image",
    collectName: false,
    nameRequired: false,
    successMessage: "Thanks for subscribing! Check your email to confirm.",
    backgroundColor: "#000000",
    textColor: "#ffffff",
    inputBackground: "#ffffff",
    inputBorder: "#e5e5e5",
    buttonBackground: "#3b82f6",
    buttonTextColor: "#ffffff",
    borderRadius: "md",
  },
  
  render: (props) => {
    const radiusClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };
    
    const layoutClasses = {
      centered: "text-center max-w-2xl mx-auto",
      split: "flex items-center gap-12",
      inline: "flex items-center justify-between",
    };
    
    return (
      <div
        className="newsletter-section py-16"
        style={{ backgroundColor: props.backgroundColor }}
      >
        <div className="container mx-auto px-4">
          <div className={layoutClasses[props.layout]}>
            {/* Image (for split layout) */}
            {props.layout === "split" && props.showImage && (
              <div className="w-1/2">
                <img
                  src={props.imageUrl}
                  alt="Newsletter"
                  className={`w-full h-auto ${radiusClasses[props.borderRadius]}`}
                />
              </div>
            )}
            
            {/* Content */}
            <div className={props.layout === "split" ? "w-1/2" : "w-full"}>
              {/* Header */}
              {props.subtitle && (
                <p
                  className="text-sm font-semibold uppercase tracking-wide mb-2"
                  style={{ color: props.textColor, opacity: 0.8 }}
                >
                  {props.subtitle}
                </p>
              )}
              
              <h2
                className="text-4xl font-bold mb-4"
                style={{ color: props.textColor }}
              >
                {props.title}
              </h2>
              
              {props.description && (
                <p
                  className="text-lg mb-6"
                  style={{ color: props.textColor, opacity: 0.9 }}
                >
                  {props.description}
                </p>
              )}
              
              {/* Newsletter Form */}
              <form className="space-y-4">
                {/* Name Input (optional) */}
                {props.collectName && (
                  <input
                    type="text"
                    placeholder="Your name"
                    required={props.nameRequired}
                    className={`w-full px-4 py-3 ${radiusClasses[props.borderRadius]} border-2`}
                    style={{
                      backgroundColor: props.inputBackground,
                      borderColor: props.inputBorder,
                    }}
                  />
                )}
                
                {/* Email Input */}
                <div className={props.layout === "inline" ? "flex gap-2" : ""}>
                  <input
                    type="email"
                    placeholder={props.placeholderText}
                    required
                    className={`${props.layout === "inline" ? "flex-1" : "w-full"} px-4 py-3 ${radiusClasses[props.borderRadius]} border-2`}
                    style={{
                      backgroundColor: props.inputBackground,
                      borderColor: props.inputBorder,
                    }}
                  />
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`${props.layout === "inline" ? "" : "w-full"} px-8 py-3 font-semibold ${radiusClasses[props.borderRadius]} hover:opacity-90 transition`}
                    style={{
                      backgroundColor: props.buttonBackground,
                      color: props.buttonTextColor,
                    }}
                  >
                    {props.buttonText}
                  </button>
                </div>
                
                {/* Privacy Text */}
                {props.showPrivacyText && (
                  <p
                    className="text-xs"
                    style={{ color: props.textColor, opacity: 0.7 }}
                  >
                    {props.privacyText}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export default Newsletter;
