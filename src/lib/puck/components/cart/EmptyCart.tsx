'use client';

import { ComponentConfig } from "@measured/puck";
import { useCart } from "@lib/hooks/useCart";
import { Heading, Text } from "@medusajs/ui";
import InteractiveLink from "@modules/common/components/interactive-link";

export interface EmptyCartProps {
  title: string;
  message: string;
  linkText: string;
  linkUrl: string;
  showOnlyWhenEmpty: boolean;
}

export const EmptyCart: ComponentConfig<EmptyCartProps> = {
  label: "Empty Cart Message",

  fields: {
    title: {
      type: "text",
      label: "Title",
    },
    message: {
      type: "textarea",
      label: "Message",
    },
    linkText: {
      type: "text",
      label: "Link Text",
    },
    linkUrl: {
      type: "text",
      label: "Link URL",
    },
    showOnlyWhenEmpty: {
      type: "radio",
      label: "Show Only When Cart is Empty",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    title: "Cart",
    message: "You don't have anything in your cart. Let's change that, use the link below to start browsing our products.",
    linkText: "Explore products",
    linkUrl: "/store",
    showOnlyWhenEmpty: true,
  },

  render: ({ title, message, linkText, linkUrl, showOnlyWhenEmpty }) => {
    const { cart, isLoading } = useCart();

    // If loading, show nothing
    if (isLoading) {
      return null;
    }

    // Check if cart has items
    const hasItems = cart?.items && cart.items.length > 0;

    // If showOnlyWhenEmpty is true and cart has items, don't show
    if (showOnlyWhenEmpty && hasItems) {
      return null;
    }

    // If showOnlyWhenEmpty is false and cart has items, show
    // If cart is empty, always show
    return (
      <div className="py-48 px-2 flex flex-col justify-center items-center text-center" data-testid="empty-cart-message">
        <Heading
          level="h1"
          className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
        >
          {title}
        </Heading>
        <Text className="text-base-regular mt-4 mb-6 max-w-[32rem]">
          {message}
        </Text>
        <div>
          <InteractiveLink href={linkUrl}>{linkText}</InteractiveLink>
        </div>
      </div>
    );
  },
};
