import { Metadata } from "next"
import { notFound } from "next/navigation"

import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import TemplateBasedCheckout from "@modules/checkout/templates/template-based-checkout"

export const metadata: Metadata = {
  title: "Checkout",
}

export default async function Checkout() {
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  return <TemplateBasedCheckout cart={cart} customer={customer} />
}
