import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/app/components/NavBar'
import { ThemeProvider } from '@/components/theme-provider'

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
    <html lang="pt" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/teup-logo.png" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; frame-src https://open.spotify.com; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://open.spotify.com; style-src 'self' 'unsafe-inline'; font-src 'self' data: https://fonts.gstatic.com;"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-['Inter',sans-serif]">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
