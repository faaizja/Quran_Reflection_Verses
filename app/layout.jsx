import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Quranic Verses - Beautiful Quran Display",
  description:
    "Explore and reflect on verses from the Holy Quran with beautiful Arabic calligraphy and English translations",
    generator: 'v0.app'
}

export const viewport = {
  themeColor: "#0c4a6e",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
