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
      keyframes: {
        borderflash: {
          '0%': { 'border-color': '#dbeafe' },
          '50%': { 'border-color': '#60a5fa' },
          '100%': { 'border-color': '#dbeafe' },
        },
        grow: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02)' },
        },
        fadeIn: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
      },
      animation: {
        fadein: 'fadeIn 1s linear',
        grow: 'grow 1s ease-in-out infinite',
        'border-flash': 'borderflash 500ms ease-in-out 2',
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
        secondary: '#287dfd',
      },
    },
  },
  plugins: [],
}
export default config
