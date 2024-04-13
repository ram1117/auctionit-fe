import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/atoms/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        notosansjp: 'var(--var-notosansjp)',
        lobstertwo: 'var(--var-lobstertwo)',
        roboto: 'var(--var-roboto)',
      },
      backgroundColor: {
        'body-bg': '#dce0ed',
        'section-bg': '#f8f7fc',
        'button-primary': '#287dfd',
      },
      textColor: {
        'primary-text': '#253262',
        'secondary-text': '#4a6690',
      },
      borderColor: {
        primary: '#253262',
      },
    },
  },
  plugins: [],
}
export default config
