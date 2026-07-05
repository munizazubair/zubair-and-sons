import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zubair & Sons',
  description: 'Installment Recovery Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..900&family=JetBrains+Mono:wght@100..800&family=Space+Grotesk:wght@300..700&family=Noto+Nastaliq+Urdu:wght@400..700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}