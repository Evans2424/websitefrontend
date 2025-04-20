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
          content="default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self' data:;"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet" />
      </head>
      <body>
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
