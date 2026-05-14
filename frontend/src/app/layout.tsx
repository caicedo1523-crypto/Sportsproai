// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SportsPro AI - Professional Sports Predictions',
  description: 'Real-time sports statistics and AI-powered predictions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-dark text-gray-100 antialiased">
        {children}
      </body>
    </html>
  )
}
