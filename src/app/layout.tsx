import type { Metadata } from 'next'
import './globals.css'
import { roboto, notosansjp, lobstertwo } from '../atoms/fonts'
import DesktopMenu from '../components/navbar/DesktopMenu'
import MobileMenu from '../components/navbar/MobileMenu'

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
      <body className="font-notosansjp flex flex-col items-center justify-center bg-body-bg min-h-screen text-primary-text">
        <div className="max-w-[1280px] lg:rounded-3xl w-full min-h-[100vh] xl:min-h-[85vh] bg-white flex flex-col lg:flex-row shadow-lg shadow-slate-300">
          <section className="w-full lg:w-2/12">
            <DesktopMenu />
            <MobileMenu />
          </section>
          <section className="w-full lg:w-7/12 bg-section-bg">
            {children}
          </section>
          <section className="w-full lg:w-3/12"></section>
        </div>
      </body>
    </html>
  )
}
