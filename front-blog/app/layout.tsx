import type React from "react"
import type {Metadata} from "next"
import "./globals.css"
import {ThemeProvider} from "@/components/theme-provider"
import {Navigation} from "@/components/navigation"
import {Footer} from "@/components/footer"

export const metadata: Metadata = {
  title: {
    template: '%s | Arnaud Endignous',
    default: 'Arnaud Endignous - Software Engineer & Web Artisan',
  },
  description: 'Passionate software engineer and web artisan. Scalability and performance',
  keywords: ['Next.js', 'React', 'JavaScript', 'TypeScript', 'Software Engineer', 'Web Artisan'],
  authors: [{ name: 'Arnaud Endignous', url: 'https://www.linkedin.com/in/arnaud-endignous/' }],
  openGraph: {
    title: 'Arnaud Endignous - Software Engineer & Web Artisan',
    description: 'Passionate software engineer and web artisan. Scalability and performance',
    url: 'https://arnaud-endignous.com',
    siteName: 'Arnaud Endignous',
    images: [
      {
        url: 'https://arnaud-endignous.com/og-image.png', // To be created
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Navigation/>
      <main>{children}</main>
      <Footer/>
    </ThemeProvider>
    </body>
    </html>
  )
}
