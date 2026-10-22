import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#102B46",
          dark: "#0c2136",
          light: "#1c3b5d",
        },
        gold: {
          DEFAULT: "#C5A45D",
          hover: "#b08f48",
          light: "#e2caa0",
        },
        ivory: {
          DEFAULT: "#F7F3EA",
          dark: "#EFE9DD",
        },
        charcoal: "#252B30",
        whatsapp: {
          DEFAULT: "#18864B",
          hover: "#136e3d",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
