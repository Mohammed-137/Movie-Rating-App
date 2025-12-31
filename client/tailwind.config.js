/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00F2FF', // Neon Cyan
          hover: '#00D1DB',
          magenta: '#FF00E5',
          yellow: '#F5C518',
        },
        secondary: {
          DEFAULT: '#0A0A0F', // Cinematic Dark
        },
        dark: {
          DEFAULT: '#0A0A0F',
          card: '#12121A',
          lighter: '#1C1C26',
          panel: 'rgba(18, 18, 26, 0.7)',
        },
        neon: {
          cyan: '#00F2FF',
          magenta: '#FF00E5',
          yellow: '#F5C518',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

