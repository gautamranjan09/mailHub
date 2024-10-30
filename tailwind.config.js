/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        '98':'0.98',
        '99': '0.99',
        '101':"1.01",
        '102':"1.02",
        '103':"1.03",
      }
    },
  },
  plugins: [],
}