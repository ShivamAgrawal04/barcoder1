/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        float: "float 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fontFamily: {
          sans: ["Montserrat", "sans-serif"],
          poppins: ["Poppins", "sans-serif"],
          dancing: ["Dancing Script", "cursive"], // fallback bhi dena best practice hai
        },
      },
    },
  },
  // plugins: [require("@tailwindcss/line-clamp")],
  // plugins: [require('tailwind-scrollbar-hide')],
  
};
