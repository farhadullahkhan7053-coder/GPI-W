/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#edf8f1",
          100: "#d5efdd",
          600: "#177245",
          700: "#105c38",
          800: "#0c482d",
          900: "#08351f"
        },
        gold: "#c9a227"
      },
      boxShadow: {
        soft: "0 18px 40px rgba(10, 53, 31, 0.08)"
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"]
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
