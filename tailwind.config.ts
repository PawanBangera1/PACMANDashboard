import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        xl: "1280px",
        "2xl": "1536px"
      },
      fontFamily: {
        'Montserrat': ['Montserrat', 'sans-serif']
      },
      fontSize: {
        xs: "0.55rem",
        sm: "0.675rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem"
      },
      colors: {
        pink: {
          100: "#ffe5f0",
          200: "#ffb3d1",
          300: "#ff80c0",
          400: "#ff4da6",
          500: "#e91e85",
          600: "#d81b60",
          700: "#c2185b",
          800: "#a8174f",
          900: "#8e0d3c"
        }
      },
    }
  },
  plugins: []
};

export default config;
