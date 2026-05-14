import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#0F172A',
        'dark-secondary': '#1E293B',
        'dark-tertiary': '#334155',
        'accent': '#3B82F6',
        'accent-secondary': '#1E40AF',
        'success': '#10B981',
        'warning': '#F59E0B',
        'danger': '#EF4444',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      },
    },
  },
  plugins: [],
}
export default config
