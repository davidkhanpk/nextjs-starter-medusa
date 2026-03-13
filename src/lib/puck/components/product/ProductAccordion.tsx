"use client"

import { ComponentConfig } from "@measured/puck";
import { useProduct } from "@lib/hooks/useProduct";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export interface ProductAccordionProps {
  sections: Array<{
    id: string;
    title: string;
    contentType: "description" | "material" | "dimensions" | "shipping" | "custom";
    customContent?: string;
  }>;
  allowMultiple: boolean;
  defaultOpen?: string;
  borderStyle: "none" | "top" | "full";
}

export const ProductAccordion: ComponentConfig<ProductAccordionProps> = {
  label: "Product Accordion",

  fields: {
    sections: {
      type: "array",
      label: "Accordion Sections",
      arrayFields: {
        id: { type: "text", label: "ID (unique)" },
        title: { type: "text", label: "Section Title" },
        contentType: {
          type: "select",
          label: "Content Type",
          options: [
            { label: "Product Description", value: "description" },
            { label: "Material & Care", value: "material" },
            { label: "Dimensions", value: "dimensions" },
            { label: "Shipping Info", value: "shipping" },
            { label: "Custom HTML", value: "custom" },
          ],
        },
        customContent: { type: "textarea", label: "Custom Content (HTML)" },
      },
      defaultItemProps: {
        id: "section-1",
        title: "Product Details",
        contentType: "description",
        customContent: "",
      },
    },
    allowMultiple: {
      type: "radio",
      label: "Allow Multiple Open",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    defaultOpen: {
      type: "text",
      label: "Default Open (comma-separated IDs)",
    },
    borderStyle: {
      type: "select",
      label: "Border Style",
      options: [
        { label: "No Borders", value: "none" },
        { label: "Top Border Only", value: "top" },
        { label: "Full Borders", value: "full" },
      ],
    },
  },

  defaultProps: {
    sections: [
      {
        id: "description",
        title: "Product Details",
        contentType: "description",
        customContent: "",
      },
      {
        id: "material",
        title: "Material & Care",
        contentType: "material",
        customContent: "",
      },
      {
        id: "shipping",
        title: "Shipping & Returns",
        contentType: "shipping",
        customContent: "<p>Free shipping on orders over $50. Returns accepted within 30 days.</p>",
      },
    ],
    allowMultiple: false,
    defaultOpen: "description",
    borderStyle: "top",
  },

  render: ({ sections, allowMultiple, defaultOpen, borderStyle }) => {
    const { product } = useProduct();

    if (!sections || sections.length === 0) {
      return <div className="text-gray-400 italic">No accordion sections configured</div>;
    }

    const borderClasses = {
      none: "",
      top: "border-t",
      full: "border",
    };

    const getContent = (section: any) => {
      switch (section.contentType) {
        case "description":
          return product?.description ? (
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          ) : (
            <p className="text-gray-500">No description available</p>
          );

        case "material":
          const careInstructions = product?.metadata?.care_instructions;
          const hasCareInstructions = typeof careInstructions === 'string';
          const materialValue = product?.material as string | undefined;
          
          return (
            <div className="space-y-2">
              {materialValue && (
                <p><strong>Material:</strong> {materialValue}</p>
              )}
              {hasCareInstructions && (
                <div>
                  <strong>Care Instructions:</strong>
                  <p className="mt-1">{careInstructions}</p>
                </div>
              )}
              {!materialValue && !hasCareInstructions && (
                <p className="text-gray-500">No material information available</p>
              )}
            </div>
          );

        case "dimensions":
          return (
            <div className="space-y-2">
              {product?.length && (
                <p><strong>Length:</strong> {product.length} cm</p>
              )}
              {product?.width && (
                <p><strong>Width:</strong> {product.width} cm</p>
              )}
              {product?.height && (
                <p><strong>Height:</strong> {product.height} cm</p>
              )}
              {product?.weight && (
                <p><strong>Weight:</strong> {product.weight} g</p>
              )}
              {!product?.length && !product?.width && !product?.height && !product?.weight && (
                <p className="text-gray-500">No dimension information available</p>
              )}
            </div>
          );

        case "shipping":
          return section.customContent ? (
            <div dangerouslySetInnerHTML={{ __html: section.customContent }} />
          ) : (
            <p className="text-gray-500">No shipping information available</p>
          );

        case "custom":
          return section.customContent ? (
            <div dangerouslySetInnerHTML={{ __html: section.customContent }} />
          ) : (
            <p className="text-gray-500">No custom content provided</p>
          );

        default:
          return <p className="text-gray-500">Invalid content type</p>;
      }
    };

    const defaultOpenArray = defaultOpen 
      ? defaultOpen.split(",").map((s: string) => s.trim()).filter(Boolean)
      : [];

    if (allowMultiple) {
      return (
        <AccordionPrimitive.Root
          type="multiple"
          defaultValue={defaultOpenArray}
          className="w-full"
        >
          {sections.map((section) => (
            <AccordionPrimitive.Item
              key={section.id}
              value={section.id}
              className={`${borderClasses[borderStyle]} border-gray-200 py-4`}
            >
              <AccordionPrimitive.Header>
                <AccordionPrimitive.Trigger className="flex w-full items-center justify-between text-left hover:text-gray-600 transition-colors group">
                  <span className="text-base font-medium">{section.title}</span>
                  <ChevronDown className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="pt-4 pb-2 text-sm text-gray-700">
                  {getContent(section)}
                </div>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      );
    }

    return (
      <AccordionPrimitive.Root
        type="single"
        defaultValue={defaultOpenArray[0]}
        collapsible
        className="w-full"
      >
        {sections.map((section) => (
          <AccordionPrimitive.Item
            key={section.id}
            value={section.id}
            className={`${borderClasses[borderStyle]} border-gray-200 py-4`}
          >
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger className="flex w-full items-center justify-between text-left hover:text-gray-600 transition-colors group">
                <span className="text-base font-medium">{section.title}</span>
                <ChevronDown className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="pt-4 pb-2 text-sm text-gray-700">
                {getContent(section)}
              </div>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        ))}
      </AccordionPrimitive.Root>
    );
  },
};
