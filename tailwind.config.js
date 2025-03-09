/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      animation : {
        shine: "shine 2s linear infinite",
      },
      keyframes : {
        shine: {
          "0%": { transform: "translateX(-100%)", opacity: 0.3 },
          "50%": { opacity: 0.7 },
          "100%": { transform: "translateX(100%)", opacity: 0.3 },
        },
      },
      fontFamily : {
        rajdhani: ["Rajdhani", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
      },
      colors : {
        netflix : {
          red: '#E50914',
        }
      }
    },
  },
  plugins: [],
}