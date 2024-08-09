import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        text: "text 3.5s ease both infinite",
        loading: "loading 3.5s ease both infinite",
        loading2: "loading2 3.5s ease both infinite",
      },
      keyframes: {
        text: {
          "0%": { letterSpacing: "1px", transform: "translateX(0px)" },
          "40%": { letterSpacing: "2px", transform: "translateX(26px)" },
          "80%": { letterSpacing: "1px", transform: "translateX(32px)" },
          "90%": { letterSpacing: "2px", transform: "translateX(0px)" },
          "100%": { letterSpacing: "1px", transform: "translateX(0px)" },
        },
        loading: {
          "0%": { width: "16px", transform: "translateX(0px)" },
          "40%": { width: "100%", transform: "translateX(0px)" },
          "80%": { width: "16px", transform: "translateX(64px)" },
          "90%": { width: "100%", transform: "translateX(0px)" },
          "100%": { width: "16px", transform: "translateX(0px)" },
        },
        loading2: {
          "0%": { width: "16px", transform: "translateX(0px)" },
          "40%": { width: "80%", transform: "translateX(0px)" },
          "80%": { width: "100%", transform: "translateX(0px)" },
          "90%": { width: "80%", transform: "translateX(15px)" },
          "100%": { width: "16px", transform: "translateX(0px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
