/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        PPNeueMontreal400: ["PPNeueMontreal400", "sans-serif"],
        PPNeueMontreal500: ["PPNeueMontreal500", "sans-serif"],
        PPNeueMontreal700: ["PPNeueMontreal700", "sans-serif"],
        Cambon400: ["Cambon400", "sans-serif"],
        Cambon500: ["Cambon500", "sans-serif"],

        Cambon600: ["Cambon600", "sans-serif"],
        Cambon700: ["Cambon700", "sans-serif"],
      },
      backgroundImage: {
        suggestionBG: "url('./src/assets/icons/suggestionBG.svg')",
        footerMobileBG: "url('./src/assets/bg/bg-mobile-footer.png')",
        footerDesktopBG: "url('./src/assets/bg/bg-footer.png')",
        "custom-gradient":
          "linear-gradient(90deg, #9873DB 0%, #C67ECA 33%, #FD6755 75%, #FE634C 100%)",
      },
      screens: {
        "2k": "2500px",
        "4k": "3800px",
      },
    },
  },
  plugins: [],
};
