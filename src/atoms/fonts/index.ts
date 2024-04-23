import {
  Roboto_Condensed,
  Noto_Sans_JP,
  Lobster_Two,
  Nunito,
} from 'next/font/google'

export const notosansjp = Noto_Sans_JP({
  variable: '--var-notosansjp',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

export const lobstertwo = Lobster_Two({
  variable: '--var-lobstertwo',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const roboto = Roboto_Condensed({
  variable: '--var-roboto',
  subsets: ['latin'],
})

export const nunito = Nunito({
  variable: '--var-nunito',
  subsets: ['latin'],
})
