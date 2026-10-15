/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#8B1E3F',
          deep: '#54152A',
          light: '#A3294E',
          hover: '#731633',
        },
        blush: {
          DEFAULT: '#F8DDE5',
          light: '#FDF2F5',
          deep: '#EBB9C8',
        },
        warmWhite: '#FFF9F7',
        roseGold: {
          DEFAULT: '#C58B83',
          light: '#D9ABA5',
          dark: '#AC7169',
        },
        gold: {
          DEFAULT: '#C9A15B',
          light: '#DFBD7F',
          dark: '#B08843',
        },
        charcoal: {
          DEFAULT: '#242124',
          light: '#3C383C',
          dark: '#171517',
        },
        mutedText: '#75676B',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(139, 30, 63, 0.08)',
        'premium': '0 10px 30px -4px rgba(84, 21, 42, 0.12)',
        'glow': '0 0 25px rgba(197, 139, 131, 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
