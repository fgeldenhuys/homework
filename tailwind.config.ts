import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Word column colors - these are dynamically applied from words.ts
    // Column 1 - Purple
    "bg-purple-300", "bg-purple-500", "border-purple-600",
    // Column 2 - Blue
    "bg-blue-300", "bg-blue-500", "border-blue-600",
    // Column 3 - Yellow
    "bg-yellow-300", "bg-yellow-400", "border-yellow-600",
    // Column 4 - Cyan
    "bg-cyan-300", "bg-cyan-500", "border-cyan-600",
    // Column 5 - Pink
    "bg-pink-300", "bg-pink-500", "border-pink-600",
    // Column 6 - Sky
    "bg-sky-200", "bg-sky-400", "border-sky-500",
    // Column 7 - Violet
    "bg-violet-200", "bg-violet-400", "border-violet-500",
    // Column 8 - Orange
    "bg-orange-200", "bg-orange-400", "border-orange-500",
    // Column 9 - Green
    "bg-green-200", "bg-green-400", "border-green-500",
    // Column 10 - Red
    "bg-red-200", "bg-red-400", "border-red-500",
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
