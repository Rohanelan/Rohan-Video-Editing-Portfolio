/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: {
          dark: '#0A0A0E',
          card: '#0F0F14',
          cardHover: '#16161E',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(255, 23, 68, 0.4)',
        },
        cinema: {
          red: '#B00020',
          redGlow: '#FF1744',
          redVivid: '#FF2A40',
          darkRed: '#5C0011',
          charcoal: '#121216',
          muted: '#8E8E9F',
        }
      },
      fontFamily: {
        sans: ['"Manrope"', 'sans-serif'],
        display: ['"Michroma"', 'sans-serif'],
        michroma: ['"Michroma"', 'sans-serif'],
        manrope: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        'glow-red-sm': '0 0 15px rgba(255, 23, 68, 0.35)',
        'glow-red': '0 0 30px rgba(255, 23, 68, 0.45)',
        'glow-red-lg': '0 0 50px rgba(255, 23, 68, 0.65)',
        'glow-red-xl': '0 0 80px rgba(255, 23, 68, 0.8)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'glow-breathe': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '0.9' },
        }
      }
    },
  },
  plugins: [],
}
