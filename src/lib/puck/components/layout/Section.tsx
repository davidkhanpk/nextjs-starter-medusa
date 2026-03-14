import { ComponentConfig } from "@measured/puck";
import { resolveColor } from "@/lib/theme/token-utils";

export interface SectionProps {
  paddingY: "none" | "sm" | "md" | "lg" | "xl";
  backgroundColor: "transparent" | "white" | "gray" | "primary";
  children: React.ReactNode;
}

export const Section: ComponentConfig<SectionProps> = {
  label: "Section",

  fields: {
    paddingY: {
      type: "select",
      label: "Vertical Padding",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "X-Large", value: "xl" },
      ],
    },
    backgroundColor: {
      type: "select",
      label: "Background Color",
      options: [
        { label: "Transparent", value: "transparent" },
        { label: "White", value: "white" },
        { label: "Gray", value: "gray" },
        { label: "Primary", value: "primary" },
      ],
    },
  },

  defaultProps: {
    paddingY: "md",
    backgroundColor: "transparent",
  },

  render: ({ paddingY, backgroundColor, children }) => {
    const paddingClasses = {
      none: "py-0",
      sm: "py-4",
      md: "py-8",
      lg: "py-12",
      xl: "py-16",
    };

    const bgClasses = {
      transparent: "bg-transparent",
      white: "bg-white",
      gray: "bg-gray-50",
      primary: "bg-brand-primary", // Use Tailwind theme class
    };

    return (
      <section className={`w-full ${paddingClasses[paddingY] || 'py-8'} ${bgClasses[backgroundColor] || 'bg-transparent'}`}>
        {children}
      </section>
    );
  },
};
