/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('/images/background.png')",
      },
    },
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui'],
      montserrat: ['Montserrat'],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
