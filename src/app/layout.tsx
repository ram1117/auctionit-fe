import type { Metadata } from 'next'
import './globals.css'
import { roboto, notosansjp, lobstertwo } from '../atoms/fonts'
import RightPanel from '../components/rightpanel/RightPanel'
import NavPanel from '../components/navbar/NavPanel'

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
      className={`${notosansjp.variable} ${roboto.variable} ${lobstertwo.variable}`}
    >
      <body className="font-notosansjp flex flex-col items-center justify-center min-h-screen text-primary-text">
        <div className="max-w-[1720px] w-full min-h-[100vh] bg-white flex flex-col lg:flex-row shadow-lg shadow-slate-300">
          <section className="w-full lg:w-2/12">
            <NavPanel />
          </section>
          <section className="w-full min-h-[95vh] lg:min-h-[85vh] lg:w-8/12 bg-section-bg">
            {children}
          </section>
          <section className="w-full lg:w-2/12 lg:block hidden">
            <RightPanel />
          </section>
        </div>
      </body>
    </html>
  )
}
