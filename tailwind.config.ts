import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "simple-print": ["var(--font-simple-print)", "Comic Sans MS", "cursive"],
      },
      colors: {
        cork: {
          50: "#fdf8f3",
          100: "#f9e8d8",
          200: "#f2d0b0",
          300: "#e9b07f",
          400: "#df8d4e",
          500: "#d67030",
          600: "#c85825",
          700: "#a64420",
          800: "#853821",
          900: "#6c301d",
        },
      },
      animation: {
        "bounce-in": "bounceIn 0.5s ease-out",
        shake: "shake 0.4s ease-in-out",
        "star-pop": "starPop 0.3s ease-out forwards",
        "float-up": "floatUp 1s ease-out forwards",
      },
      keyframes: {
        bounceIn: {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-10px)" },
          "75%": { transform: "translateX(10px)" },
        },
        starPop: {
          "0%": { transform: "scale(0) rotate(-45deg)", opacity: "0" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        floatUp: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-50px)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
