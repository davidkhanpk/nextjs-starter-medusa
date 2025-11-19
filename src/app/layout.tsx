import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { ThemeProvider } from "@lib/theme/ThemeProvider"
import { ToastProvider } from "@modules/common/components/toast"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <ThemeProvider>
          <ToastProvider>
            <main className="relative">{props.children}</main>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
