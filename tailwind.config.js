/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        white: "white",
        none: "none",
        open:"#62b9e5",
        high:"#62e5df",
        low:"#d282f0",
        close: "#6462e5",
        volume: "#b9e17d"
      },
      borderWidth:{
        1: "1px",
      },
      fontFamily:{
        quicksand:["Quicksand", "sans-serif"],
      },
      gridTemplateRows:{
        7: "repeat(7, minmac(0,1fr))",
        8: "repeat(8, minmac(0,1fr))"
      }
    },
  },
  plugins: [],
}