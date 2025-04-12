import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { DataProvider } from "./data-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Make My Team",
  description: "AI assistant for HR to form teams based on available resources",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Make My Team",
  },
  themeColor: "#0c0f2c",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="application-name" content="Make My Team" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Make My Team" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#0c0f2c" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={inter.className}>
      <DataProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
         
          {children}
        
        </ThemeProvider>
        </DataProvider>
      </body>
    </html>
  )
}


import './globals.css'


