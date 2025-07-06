import type React from "react"
import type {Metadata} from "next"
import "./globals.css"
import {ThemeProvider} from "@/components/theme-provider"
import {Navigation} from "@/components/navigation"
import {Footer} from "@/components/footer"

export const metadata: Metadata = {
  title: {
    template: '%s | Arnaud Endignous',
    default: 'Arnaud Endignous - Ingénieur logiciel & Artisan du Web',
  },
  description: 'Ingénieur logiciel passioné et artisan du web. Scalabilité et performance',
  keywords: ['Java', 'TypeScript', 'Génie logiciel', 'Web Artisan', 'Scalabilité'],
  authors: [{ name: 'Arnaud Endignous', url: 'https://www.linkedin.com/in/arnaud-endignous/' }],
  openGraph: {
    title: 'Arnaud Endignous - Ingénieur logiciel & Artisan du Web',
    description: 'Ingénieur logiciel passioné et artisan du web. Scalabilité et performance',
    url: 'https://arnaud-endignous.com',
    siteName: 'Arnaud Endignous',
    images: [
      {
        url: 'https://storage.googleapis.com/bucket-blog-app/1749797328343.webp',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
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
