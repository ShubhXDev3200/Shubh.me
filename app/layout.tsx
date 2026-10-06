import "./globals.css"
import { Instrument_Serif, Inter } from "next/font/google"
import SmoothScroll from "@/components/SmoothScroll"
import type { Metadata } from "next"

const serif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
})

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://rohifts.me"),

  title: {
    default: "Rohit Singh — Software Engineer",
    template: "%s — Rohit Singh",
  },

  description:
    "Rohit Singh — Software Engineer building thoughtful products, interfaces, and full-stack experiences.",

  openGraph: {
    title: "Rohit Singh — Software Engineer",
    description:
      "Software Engineer building thoughtful products, interfaces, and full-stack experiences.",
    url: "https://rohifts.me",
    siteName: "Rohit Singh",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Rohit Singh — Software Engineer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rohit Singh — Software Engineer",
    description:
      "Software Engineer building thoughtful products, interfaces, and full-stack experiences.",
    images: ["/opengraph-image.png"],
  },
}

const init=`try{var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark')}catch{}`

export default function L({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${serif.variable} ${sans.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: init }} />
      </head>
      <body>  <SmoothScroll />{children}</body>
    </html>
  )
}