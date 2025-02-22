import type { Config } from "tailwindcss"

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      delius: ["var(--font-delius)"],
      roboto: ['var(--font-roboto-condensed)'],
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
        background: "#090909",
        ashes: "#0c0c0c",
        border: "#101010",
        tag: "#1B1C1C",
        white: "#FFFFFF",
        button: "#1F1F1F",
      },
    },
  },
  plugins: [],
} satisfies Config
