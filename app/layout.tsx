import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'FinSmart Srbija – Finansijska pismenost za mlade',
  description:
    'Nauči osnove finansija, upravljaj budžetom i koristi kalkulatore za kredit, kamatu i platu. Finansijska pismenost za srpsku omladinu.',
  generator: 'v0.app',
  keywords: ['finansijska pismenost', 'srbija', 'mladi', 'budžet', 'kredit', 'štednja'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sr" className="bg-background">
      <body className={`${plusJakarta.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
