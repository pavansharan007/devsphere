// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '380px',
        'md': '768px',
        'lg': '1000px',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        vercel: {
          bg: '#000',
          color1: '#111',
          color2: '#222',
          color3: '#333',
        },
      },
    },
  },
  plugins: [],
});
