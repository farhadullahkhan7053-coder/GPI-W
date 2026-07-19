/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f5fa",
          100: "#dbeafe",
          200: "#bfdbfe",
          350: "#3b82f6", // fallback or nice hover border
          600: "#0f3d69",
          700: "#0a2d52",
          800: "#002244",
          900: "#02162e",
          950: "#010b1a"
        },
        gold: "#e6b800"
      },
      boxShadow: {
        soft: "0 18px 40px rgba(0, 34, 68, 0.06)"
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"]
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
