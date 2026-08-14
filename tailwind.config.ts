import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paw: {
          cream: '#FFFBF5',
          warm: '#FFF5EB',
          orange: '#E76F51',
          amber: '#F4A261',
          yellow: '#E9C46A',
          green: '#2A9D8F',
          teal: '#264653',
          brown: '#8B7355',
          sand: '#A0937D',
          border: '#EDE4D9',
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
export default config