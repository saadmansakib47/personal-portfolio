import type React from "react"
import "./globals.css"
import { Oswald } from "next/font/google"

// Configure the Oswald font
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald", // Define a CSS variable for the font
  display: "swap", // Optimize font loading
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // We expose the Oswald font through the CSS variable `--font-oswald`
    <html lang="en" className={oswald.variable}>
      <body>{children}</body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
