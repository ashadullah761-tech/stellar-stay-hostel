import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B1B3A',
          800: '#11254B',
          700: '#193366',
          600: '#234485',
        },
        gold: {
          500: '#D4A72C',
          600: '#B88E1F',
          400: '#E6C258',
          300: '#F5DC88',
        },
        ivory: {
          50: '#FAF7F0',
          100: '#F5F0E6',
        },
        accentTeal: {
          500: '#14B8A6',
          600: '#0D9488',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
};
export default config;
