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
      }
    }
  },
  plugins: []
};

export default config;
