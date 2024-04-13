import type { Metadata } from 'next'
import './globals.css'
import { raleway, notosansjp, chivo } from '../atoms/fonts'

export const metadata: Metadata = {
  title: 'AuctionIt',
  description:
    'Signup, add items and sell your items. Bid for items, place winning bids to beat other users',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${notosansjp.variable} ${raleway.variable} ${chivo.variable}`}
    >
      <body className="font-notosansjp font-black">{children}</body>
    </html>
  )
}
