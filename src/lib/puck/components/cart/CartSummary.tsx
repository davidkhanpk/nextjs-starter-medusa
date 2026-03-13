'use client';

import { ComponentConfig } from "@measured/puck";
import { useCart } from "@lib/hooks/useCart";
import { Button, Heading } from "@medusajs/ui";
import CartTotals from "@modules/common/components/cart-totals";
import Divider from "@modules/common/components/divider";
import DiscountCode from "@modules/checkout/components/discount-code";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

export interface CartSummaryProps {
  title: string;
  showTitle: boolean;
  showDiscountCode: boolean;
  checkoutButtonText: string;
  buttonVariant: "primary" | "secondary";
}

function getCheckoutStep(cart: any) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address";
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery";
  } else {
    return "payment";
  }
}

export const CartSummary: ComponentConfig<CartSummaryProps> = {
  label: "Cart Summary",

  fields: {
    title: {
      type: "text",
      label: "Title",
    },
    showTitle: {
      type: "radio",
      label: "Show Title",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showDiscountCode: {
      type: "radio",
      label: "Show Discount Code Input",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    checkoutButtonText: {
      type: "text",
      label: "Checkout Button Text",
    },
    buttonVariant: {
      type: "select",
      label: "Button Style",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
      ],
    },
  },

  defaultProps: {
    title: "Summary",
    showTitle: true,
    showDiscountCode: true,
    checkoutButtonText: "Go to checkout",
    buttonVariant: "primary",
  },

  render: ({ title, showTitle, showDiscountCode, checkoutButtonText, buttonVariant }) => {
    const { cart, isLoading } = useCart();

    if (isLoading) {
      return (
        <div className="flex flex-col gap-y-4">
          {showTitle && (
            <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
              {title}
            </Heading>
          )}
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      );
    }

    if (!cart || !cart.items?.length) {
      return null;
    }

    const step = getCheckoutStep(cart);

    return (
      <div className="flex flex-col gap-y-4">
        {showTitle && (
          <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
            {title}
          </Heading>
        )}
        {showDiscountCode && <DiscountCode cart={cart as any} />}
        <Divider />
        <CartTotals totals={cart} />
        <LocalizedClientLink
          href={"/checkout?step=" + step}
          data-testid="checkout-button"
        >
          <Button className="w-full h-10" variant={buttonVariant}>
            {checkoutButtonText}
          </Button>
        </LocalizedClientLink>
      </div>
    );
  },
};
