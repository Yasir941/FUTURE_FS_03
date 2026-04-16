import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#FFFFFF",
        brand: {
          yellow: "#FFB800", // Industrial Yellow
          emerald: "#10B981", // For subtle glows
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      animation: {
        "drift-slow": "drift 20s linear infinite",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-2%, 2%) scale(1.05)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
