import type { Metadata } from 'next'
import './globals.css'
import { roboto, notosansjp, lobstertwo } from '../atoms/fonts'
import DesktopMenu from '../components/navbar/DesktopMenu'
import MobileMenu from '../components/navbar/MobileMenu'
import RightPanel from '../components/rightpanel/RightPanel'
import CategoriesContainer from '../components/rightpanel/CategoriesContainer'

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
            <DesktopMenu />
            <MobileMenu />
          </section>
          <section className="w-full min-h-[95vh] lg:min-h-[85vh] lg:w-7/12 bg-section-bg">
            <div className="block lg:hidden">
              <CategoriesContainer />
            </div>

            {children}
          </section>
          <section className="w-full lg:w-3/12 lg:block hidden">
            <RightPanel />
          </section>
        </div>
      </body>
    </html>
  )
}
