import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { ThemeProvider } from "@lib/theme/ThemeProvider"
import { ToastProvider } from "@modules/common/components/toast"
import FacebookPixel from "@lib/pixel/FacebookPixel"
import { ThemeInjector } from "@/components/theme/ThemeInjector"
import { generateThemeStyleTag } from "@lib/theme/generate-theme-css"
import { fetchTheme } from "@lib/theme/api"
import "../styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  // Get store ID from environment or subdomain
  const storeId = process.env.STORE_ID || ""

  // Fetch theme for SSR CSS injection
  const theme = await fetchTheme().catch((error) => {
    console.error('[RootLayout] Failed to fetch theme:', error)
    return null
  })

  // Generate theme CSS for SSR (prevents FOUC)
  const themeCSS = theme ? generateThemeStyleTag(theme) : ''

  return (
    <html lang="en" data-mode="light" suppressHydrationWarning>
      <head suppressHydrationWarning>
        {/* Inject theme CSS variables for SSR */}
        {themeCSS && (
          <style
            id="theme-tokens-ssr"
            dangerouslySetInnerHTML={{ __html: themeCSS }}
          />
        )}
      </head>
      <body suppressHydrationWarning className="flex flex-col min-h-screen">
        <ThemeProvider>
          <ToastProvider>
            <FacebookPixel storeId={storeId} />
            {/* Client-side theme injector for dynamic updates */}
            <ThemeInjector theme={theme} />
            <div className="flex flex-col min-h-screen">
              {props.children}
            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
