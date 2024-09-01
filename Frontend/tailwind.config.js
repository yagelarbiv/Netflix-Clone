/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      scale: {
        '200': '2',    // Custom scale value for 200%
        '300': '3', 
      },
      
    },
  },
  plugins: [
  require('tailwind-scrollbar-hide')
  ],
}

