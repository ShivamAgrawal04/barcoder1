/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        dancing: ["Dancing Script", "cursive"],
        sans: ["Montserrat", "sans-serif"],
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "fade-in": "fadeIn 1s ease-in-out",
        shine: "shine 2s ease-in-out infinite",
        "gradient-x": "gradient-x 3s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        shine: {
          "0%": { left: "-75%" },
          "100%": { left: "125%" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% center" },
          "50%": { backgroundPosition: "100% center" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
