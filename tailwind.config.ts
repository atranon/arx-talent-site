import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0C10',
        surface: '#111318',
        border: '#1E2230',
        accent: '#2563EB',
        'accent-glow': '#3B82F6',
        'text-primary': '#F0F2F8',
        'text-muted': '#6B7280',
        'text-dim': '#374151',
        success: '#10B981',
      },
      fontFamily: {
        serif: ['Instrument Serif', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
