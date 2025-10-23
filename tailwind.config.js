/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        accent: '#06B6D4',
      },
      boxShadow: {
        soft: '0 10px 40px rgba(124,58,237,.15)',
      },
    },
  },
  plugins: [],
}