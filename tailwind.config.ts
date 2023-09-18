import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  safelist: [
    'bg-white', 
    'mt-3', 
    'hover:bg-amber-500',
    'hover:bg-green-500'
  ]
}
export default config
