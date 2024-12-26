import type { Config } from "tailwindcss"

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      delius: ['var(--font-delius)'],
    },
    screens: {
      // => @media (min-width: 640px) { ... }
      usm: "400px",
      sm: "640px",
      md: "825px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        background: "#0c0c0c",
        ashes: "#18181b",
        border: "#101010",
        tag: "#1B1C1C",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
} satisfies Config
