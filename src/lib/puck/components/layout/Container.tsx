import { ComponentConfig, DropZone } from "@measured/puck";

export interface ContainerProps {
  maxWidth: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding: "none" | "sm" | "md" | "lg";
}

export const Container: ComponentConfig<ContainerProps> = {
  label: "Container",
  
  fields: {
    maxWidth: {
      type: "select",
      label: "Max Width",
      options: [
        { label: "Small (640px)", value: "sm" },
        { label: "Medium (768px)", value: "md" },
        { label: "Large (1024px)", value: "lg" },
        { label: "X-Large (1280px)", value: "xl" },
        { label: "2X-Large (1536px)", value: "2xl" },
        { label: "Full Width", value: "full" },
      ],
    },
    padding: {
      type: "select",
      label: "Padding",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
  },

  defaultProps: {
    maxWidth: "xl",
    padding: "md",
  },

  render: ({ maxWidth, padding }) => {
    console.log('[Container] Rendering with props:', { maxWidth, padding });
    const maxWidthClasses = {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      full: "max-w-full",
    };

    const paddingClasses = {
      none: "px-0",
      sm: "px-4",
      md: "px-6",
      lg: "px-8",
    };

    return (
      <div
        className={`mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]}`}
        style={{ minHeight: '80px' }}
      >
        <DropZone zone="content" />
      </div>
    );
  },
};
