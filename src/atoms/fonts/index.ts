import { Chivo, Raleway, Noto_Sans_JP } from 'next/font/google'

export const notosansjp = Noto_Sans_JP({
  variable: '--var-notosansjp',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

export const chivo = Chivo({
  variable: '--var-chivo',
  subsets: ['latin'],
})

export const raleway = Raleway({
  variable: '--var-raleway',
  subsets: ['latin'],
})
