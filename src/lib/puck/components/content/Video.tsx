import { ComponentConfig } from "@measured/puck";

export interface VideoProps {
  // Video Source
  sourceType: "youtube" | "vimeo" | "direct";
  youtubeId: string;
  vimeoId: string;
  videoUrl: string;
  
  // Layout
  aspectRatio: "16/9" | "4/3" | "1/1" | "21/9";
  width: "full" | "custom";
  customWidth: string;
  
  // Controls
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  controls: boolean;
  
  // Styling
  borderRadius: "none" | "sm" | "md" | "lg" | "xl";
  shadow: "none" | "sm" | "md" | "lg" | "xl";
  
  // Alignment
  alignment: "left" | "center" | "right";
  
  // Spacing
  marginTop: number;
  marginBottom: number;
}

export const Video: ComponentConfig<VideoProps> = {
  label: "Video",
  
  fields: {
    // Video Source
    sourceType: {
      type: "select",
      label: "Video Source",
      options: [
        { label: "YouTube", value: "youtube" },
        { label: "Vimeo", value: "vimeo" },
        { label: "Direct URL", value: "direct" },
      ],
    },
    youtubeId: {
      type: "text",
      label: "YouTube Video ID",
    },
    vimeoId: {
      type: "text",
      label: "Vimeo Video ID",
    },
    videoUrl: {
      type: "text",
      label: "Direct Video URL",
    },
    
    // Layout
    aspectRatio: {
      type: "select",
      label: "Aspect Ratio",
      options: [
        { label: "16:9 (Standard)", value: "16/9" },
        { label: "4:3 (Classic)", value: "4/3" },
        { label: "1:1 (Square)", value: "1/1" },
        { label: "21:9 (Cinematic)", value: "21/9" },
      ],
    },
    width: {
      type: "select",
      label: "Width",
      options: [
        { label: "Full Width", value: "full" },
        { label: "Custom", value: "custom" },
      ],
    },
    customWidth: {
      type: "text",
      label: "Custom Width (e.g., 800px, 80%)",
    },
    
    // Controls
    autoplay: {
      type: "radio",
      label: "Autoplay",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    loop: {
      type: "radio",
      label: "Loop",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    muted: {
      type: "radio",
      label: "Muted",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    controls: {
      type: "radio",
      label: "Show Controls",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
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
        { label: "Extra Large", value: "xl" },
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
    sourceType: "youtube",
    youtubeId: "dQw4w9WgXcQ",
    vimeoId: "",
    videoUrl: "",
    aspectRatio: "16/9",
    width: "full",
    customWidth: "800px",
    autoplay: false,
    loop: false,
    muted: false,
    controls: true,
    borderRadius: "md",
    shadow: "lg",
    alignment: "center",
    marginTop: 0,
    marginBottom: 16,
  },
  
  render: (props) => {
    const radiusClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    };
    
    const shadowClasses = {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    };
    
    const alignmentClasses = {
      left: "mr-auto",
      center: "mx-auto",
      right: "ml-auto",
    };
    
    const getYouTubeEmbed = () => {
      const params = new URLSearchParams({
        autoplay: props.autoplay ? "1" : "0",
        loop: props.loop ? "1" : "0",
        mute: props.muted ? "1" : "0",
        controls: props.controls ? "1" : "0",
        rel: "0",
      });
      
      return `https://www.youtube.com/embed/${props.youtubeId}?${params.toString()}`;
    };
    
    const getVimeoEmbed = () => {
      const params = new URLSearchParams({
        autoplay: props.autoplay ? "1" : "0",
        loop: props.loop ? "1" : "0",
        muted: props.muted ? "1" : "0",
        controls: props.controls ? "1" : "0",
      });
      
      return `https://player.vimeo.com/video/${props.vimeoId}?${params.toString()}`;
    };
    
    return (
      <div
        className={`video-component ${alignmentClasses[props.alignment] || 'mx-auto'}`}
        style={{
          width: props.width === "custom" ? props.customWidth : "100%",
          marginTop: `${props.marginTop}px`,
          marginBottom: `${props.marginBottom}px`,
        }}
      >
        <div
          className={`video-wrapper relative overflow-hidden ${radiusClasses[props.borderRadius] || 'rounded-md'} ${shadowClasses[props.shadow] || 'shadow-none'}`}
          style={{
            aspectRatio: props.aspectRatio,
          }}
        >
          {props.sourceType === "youtube" && props.youtubeId && (
            <iframe
              src={getYouTubeEmbed()}
              title="YouTube video"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          
          {props.sourceType === "vimeo" && props.vimeoId && (
            <iframe
              src={getVimeoEmbed()}
              title="Vimeo video"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )}
          
          {props.sourceType === "direct" && props.videoUrl && (
            <video
              src={props.videoUrl}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay={props.autoplay}
              loop={props.loop}
              muted={props.muted}
              controls={props.controls}
            />
          )}
        </div>
      </div>
    );
  },
};

export default Video;
