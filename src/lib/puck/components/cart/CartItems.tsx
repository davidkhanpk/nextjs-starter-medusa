'use client';

import { ComponentConfig } from "@measured/puck";
import { useCart } from "@lib/hooks/useCart";
import { Table, Heading } from "@medusajs/ui";
import Item from "@modules/cart/components/item";
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item";
import repeat from "@lib/util/repeat";

export interface CartItemsProps {
  title: string;
  showTitle: boolean;
  showTableHeaders: boolean;
}

export const CartItems: ComponentConfig<CartItemsProps> = {
  label: "Cart Items List",

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
    showTableHeaders: {
      type: "radio",
      label: "Show Table Headers",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    title: "Cart",
    showTitle: true,
    showTableHeaders: true,
  },

  render: ({ title, showTitle, showTableHeaders }) => {
    const { cart, isLoading } = useCart();

    if (isLoading) {
      return (
        <div>
          {showTitle && (
            <div className="pb-3 flex items-center">
              <Heading className="text-[2rem] leading-[2.75rem]">{title}</Heading>
            </div>
          )}
          <Table>
            {showTableHeaders && (
              <Table.Header className="border-t-0">
                <Table.Row className="text-ui-fg-subtle txt-medium-plus">
                  <Table.HeaderCell className="!pl-0">Item</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell className="hidden small:table-cell">
                    Price
                  </Table.HeaderCell>
                  <Table.HeaderCell className="!pr-0 text-right">
                    Total
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
            )}
            <Table.Body>
              {repeat(3).map((i) => (
                <SkeletonLineItem key={i} />
              ))}
            </Table.Body>
          </Table>
        </div>
      );
    }

    const items = cart?.items || [];

    // Don't show anything if cart is empty - let EmptyCart component handle it
    if (items.length === 0) {
      return null;
    }

    return (
      <div>
        {showTitle && (
          <div className="pb-3 flex items-center">
            <Heading className="text-[2rem] leading-[2.75rem]">{title}</Heading>
          </div>
        )}
        <Table>
          {showTableHeaders && (
            <Table.Header className="border-t-0">
              <Table.Row className="text-ui-fg-subtle txt-medium-plus">
                <Table.HeaderCell className="!pl-0">Item</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell className="hidden small:table-cell">
                  Price
                </Table.HeaderCell>
                <Table.HeaderCell className="!pr-0 text-right">
                  Total
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          )}
          <Table.Body>
            {items
              .sort((a, b) => {
                return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1;
              })
              .map((item) => (
                <Item
                  key={item.id}
                  item={item}
                  currencyCode={cart?.currency_code}
                />
              ))}
          </Table.Body>
        </Table>
      </div>
    );
  },
};
