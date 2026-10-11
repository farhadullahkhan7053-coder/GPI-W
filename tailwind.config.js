/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#e0f0fe",
          200: "#bae3fd",
          300: "#7dd1fc",
          350: "#38bdf8",
          400: "#0ea5e9",
          500: "#0284c7",
          600: "#0369a1",
          700: "#0c5a94",
          800: "#083e6b",
          850: "#072f52",
          900: "#0a2540",
          950: "#051329"
        },
        gold: {
          DEFAULT: "#f59e0b",
          light: "#fbbf24",
          dark: "#d97706"
        },
        teal: {
          studio: "#0d9488",
          mat: "#137a77"
        }
      },
      boxShadow: {
        soft: "0 20px 45px -15px rgba(10, 37, 64, 0.08)",
        glass: "0 8px 32px 0 rgba(10, 37, 64, 0.12)",
        glow: "0 0 25px -5px rgba(245, 158, 11, 0.3)"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"]
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
