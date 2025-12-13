import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { ThemeProvider } from "@lib/theme/ThemeProvider"
import { ToastProvider } from "@modules/common/components/toast"
import FacebookPixel from "@lib/pixel/FacebookPixel"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  // Get store ID from environment or subdomain
  const storeId = process.env.NEXT_PUBLIC_STORE_ID || ""

  return (
    <html lang="en" data-mode="light">
      <body>
        <ThemeProvider>
          <ToastProvider>
            <FacebookPixel storeId={storeId} />
            <main className="relative">{props.children}</main>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
