import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'purple': '#4126b2',
      'gray-dark': '#15171a',
      'gray': '#979797',
      'gray-light': '#979797',
      'gray-lighter': '#fcfcfc',
      'white': '#ffffff',
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    }
    // extend: {
    //   backgroundImage: {
    //     'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    //     'gradient-conic':
    //       'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    //   },
    // },
  },
  plugins: [],
}
export default config
