import type { Config } from "tailwindcss"

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
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
        background: "#09090b",
        button: "#393939",
        border: "#27272a80",
        tag: "#1B1C1C",
        white: '#fafafa',
        title: "#E8E8E8",
        ashes: "#0a0a0a",
      },
    },
  },
  plugins: [],
} satisfies Config
