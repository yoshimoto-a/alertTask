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
        background: "var(--background)",
        foreground: "var(--foreground)",
        calendar_red: "#FF453A",
        calendar_pink: "#FF69B4",
        calendar_blue: "#1E90FF",
        calendar_green: "#32CD32",
        calendar_yellow: "#FFDF00",
        calendar_purple: "#8A2BE2",
      },
    },
  },
  plugins: [],
};
export default config;
