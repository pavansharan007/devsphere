 /** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   theme: {
     extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        vercel: {
          bg: '#000',             // your default
          color1: '#111',         // component default
          color2: '#222',         // hover background
          color3: '#333',         // active/state background
        },
      },
     },
   },
   plugins: [],
 } 