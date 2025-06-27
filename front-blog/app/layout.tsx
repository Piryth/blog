import type React from "react"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"
import {ThemeProvider} from "@/components/theme-provider"
import {Navigation} from "@/components/navigation"
import {Footer} from "@/components/footer"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Arnaud Endignous - Software Engineer & Web Artisan",
  description:
    "Passionate software engineer and web artisan. Scalability and performance",
  generator: 'v0.dev'
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={inter.className}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Navigation/>
      <main>{children}</main>
      <Footer/>
    </ThemeProvider>
    </body>
    </html>
  )
}
