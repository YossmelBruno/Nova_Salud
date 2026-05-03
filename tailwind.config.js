/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm light health theme
        warm: {
          50: '#fffbeb',
          100: '#fef3c7',
          400: '#f59e0b',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
        primary: {
          50: '#fef2f2',
          500: '#f87171',
          600: '#ef4444',
        },
        success: '#eab308', // warm yellow-green
        accent: '#f59e0b', // warm amber
      }
    },
  },
  plugins: [],
}

