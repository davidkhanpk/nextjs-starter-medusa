import { ComponentConfig } from "@measured/puck";

export interface ImageProps {
  // Image
  src: string;
  alt: string;
  
  // Layout
  aspectRatio: "auto" | "square" | "video" | "portrait" | "landscape";
  objectFit: "contain" | "cover" | "fill" | "none";
  width: "auto" | "full" | "custom";
  customWidth: string;
  
  // Caption
  showCaption: boolean;
  caption: string;
  captionPosition: "top" | "bottom";
  captionAlign: "left" | "center" | "right";
  
  // Link
  linkUrl: string;
  openInNewTab: boolean;
  
  // Effects
  borderRadius: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  shadow: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  showBorder: boolean;
  borderColor: string;
  borderWidth: number;
  
  // Hover Effects
  hoverEffect: "none" | "zoom" | "brightness" | "grayscale" | "lift";
  
  // Alignment
  alignment: "left" | "center" | "right";
  
  // Spacing
  marginTop: number;
  marginBottom: number;
}

export const Image: ComponentConfig<ImageProps> = {
  label: "Image",
  
  fields: {
    // Image
    src: {
      type: "text",
      label: "Image URL",
    },
    alt: {
      type: "text",
      label: "Alt Text (for accessibility)",
    },
    
    // Layout
    aspectRatio: {
      type: "select",
      label: "Aspect Ratio",
      options: [
        { label: "Auto (Original)", value: "auto" },
        { label: "Square (1:1)", value: "square" },
        { label: "Video (16:9)", value: "video" },
        { label: "Portrait (3:4)", value: "portrait" },
        { label: "Landscape (4:3)", value: "landscape" },
      ],
    },
    objectFit: {
      type: "select",
      label: "Object Fit",
      options: [
        { label: "Contain", value: "contain" },
        { label: "Cover", value: "cover" },
        { label: "Fill", value: "fill" },
        { label: "None", value: "none" },
      ],
    },
    width: {
      type: "select",
      label: "Width",
      options: [
        { label: "Auto", value: "auto" },
        { label: "Full", value: "full" },
        { label: "Custom", value: "custom" },
      ],
    },
    customWidth: {
      type: "text",
      label: "Custom Width (e.g., 500px, 80%)",
    },
    
    // Caption
    showCaption: {
      type: "radio",
      label: "Show Caption",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    caption: {
      type: "textarea",
      label: "Caption Text",
    },
    captionPosition: {
      type: "select",
      label: "Caption Position",
      options: [
        { label: "Top", value: "top" },
        { label: "Bottom", value: "bottom" },
      ],
    },
    captionAlign: {
      type: "select",
      label: "Caption Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    
    // Link
    linkUrl: {
      type: "text",
      label: "Link URL (optional)",
    },
    openInNewTab: {
      type: "radio",
      label: "Open in New Tab",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    
    // Effects
    borderRadius: {
      type: "select",
      label: "Border Radius",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
        { label: "2XL", value: "2xl" },
        { label: "Full (Circle)", value: "full" },
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
        { label: "2XL", value: "2xl" },
      ],
    },
    showBorder: {
      type: "radio",
      label: "Show Border",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    borderColor: {
      type: "text",
      label: "Border Color (hex)",
    },
    borderWidth: {
      type: "number",
      label: "Border Width (px)",
      min: 1,
      max: 10,
    },
    
    // Hover Effects
    hoverEffect: {
      type: "select",
      label: "Hover Effect",
      options: [
        { label: "None", value: "none" },
        { label: "Zoom", value: "zoom" },
        { label: "Brightness", value: "brightness" },
        { label: "Grayscale to Color", value: "grayscale" },
        { label: "Lift (Shadow)", value: "lift" },
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
    src: "https://via.placeholder.com/800x600",
    alt: "Image description",
    aspectRatio: "auto",
    objectFit: "cover",
    width: "full",
    customWidth: "600px",
    showCaption: false,
    caption: "Image caption goes here",
    captionPosition: "bottom",
    captionAlign: "center",
    linkUrl: "",
    openInNewTab: false,
    borderRadius: "md",
    shadow: "md",
    showBorder: false,
    borderColor: "#e5e5e5",
    borderWidth: 2,
    hoverEffect: "none",
    alignment: "center",
    marginTop: 0,
    marginBottom: 16,
  },
  
  render: (props) => {
    const aspectRatioClasses = {
      auto: "",
      square: "aspect-square",
      video: "aspect-video",
      portrait: "aspect-[3/4]",
      landscape: "aspect-[4/3]",
    };
    
    const objectFitClasses = {
      contain: "object-contain",
      cover: "object-cover",
      fill: "object-fill",
      none: "object-none",
    };
    
    const widthClasses = {
      auto: "w-auto",
      full: "w-full",
      custom: "",
    };
    
    const radiusClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      full: "rounded-full",
    };
    
    const shadowClasses = {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
      "2xl": "shadow-2xl",
    };
    
    const alignmentClasses = {
      left: "mr-auto",
      center: "mx-auto",
      right: "ml-auto",
    };
    
    const hoverEffectClasses = {
      none: "",
      zoom: "hover:scale-110",
      brightness: "hover:brightness-110",
      grayscale: "grayscale hover:grayscale-0",
      lift: "hover:shadow-2xl hover:-translate-y-2",
    };
    
    const captionAlignClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };
    
    const imageElement = (
      <div className="image-wrapper relative overflow-hidden">
        <img
          src={props.src}
          alt={props.alt}
          className={`
            ${aspectRatioClasses[props.aspectRatio]}
            ${objectFitClasses[props.objectFit]}
            ${widthClasses[props.width]}
            ${radiusClasses[props.borderRadius]}
            ${shadowClasses[props.shadow]}
            ${hoverEffectClasses[props.hoverEffect]}
            ${props.showBorder ? "border" : ""}
            transition-all duration-300
          `}
          style={{
            width: props.width === "custom" ? props.customWidth : undefined,
            borderColor: props.showBorder ? props.borderColor : undefined,
            borderWidth: props.showBorder ? `${props.borderWidth}px` : undefined,
          }}
        />
      </div>
    );
    
    return (
      <div
        className={`image-component ${alignmentClasses[props.alignment]}`}
        style={{
          marginTop: `${props.marginTop}px`,
          marginBottom: `${props.marginBottom}px`,
        }}
      >
        <div className="image-inner">
          {props.showCaption && props.captionPosition === "top" && (
            <div className={`caption text-sm text-gray-600 mb-2 ${captionAlignClasses[props.captionAlign]}`}>
              {props.caption}
            </div>
          )}
          
          {props.linkUrl ? (
            <a
              href={props.linkUrl}
              target={props.openInNewTab ? "_blank" : undefined}
              rel={props.openInNewTab ? "noopener noreferrer" : undefined}
              className="block"
            >
              {imageElement}
            </a>
          ) : (
            imageElement
          )}
          
          {props.showCaption && props.captionPosition === "bottom" && (
            <div className={`caption text-sm text-gray-600 mt-2 ${captionAlignClasses[props.captionAlign]}`}>
              {props.caption}
            </div>
          )}
        </div>
      </div>
    );
  },
};

export default Image;
