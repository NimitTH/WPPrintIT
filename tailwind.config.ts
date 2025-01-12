import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sarabun)', 'sans-serif'],
        // sans: ['var(--font-bai_jamjuree)', 'sans-serif'],
      },
      colors: {
        transparent: 'transparent',
        current: "currentColor",
        background: "var(--background)",
        foreground: "var(--foreground)",

      },

      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        'gradient': {
          to: { 'background-position': '200% center' },
        }
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
