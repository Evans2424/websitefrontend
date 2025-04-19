import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TEUP - Tuna de Engenharia da Universidade do Porto',
  description: 'Tuna de Engenharia da Universidade do Porto, mantendo vivas as tradições académicas desde 1990.',
  generator: 'v0.dev',
  icons: {
    icon: '/images/teup-logo.png',
    apple: '/images/teup-logo.png',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <head>
        <link rel="icon" href="/images/teup-logo.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
