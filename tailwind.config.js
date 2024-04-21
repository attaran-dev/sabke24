/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        baloo: ["var(--font-baloo-bhaijaan-2)"],
        rubik: ["var(--font-rubik)"],
        noto: ["var(--font-noto-sans-arabic)"],
        lalezar: ["var(--font-lalezar)"]
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        wmspin: {
          "0%": { transform: "rotate(0deg)" },
          "35%": { transform: "rotate(360deg)" },
          "50%": { transform: "rotate(360deg)" },
          "85%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        twiggle: {
          "0%, 100%": { transform: "rotate(0deg)", transformOrigin: "top" },
          "10%": { transform: "rotate(3deg)", transformOrigin: "top" },
          "15%": { transform: "rotate(0deg)", transformOrigin: "top" },
          "20%": { transform: "rotate(2deg)", transformOrigin: "top" },
          "25%": { transform: "rotate(0deg)", transformOrigin: "top" },
          "30%": { transform: "rotate(1deg)", transformOrigin: "top" },
          "35%": { transform: "rotate(0deg)", transformOrigin: "top" },
        },
        bwiggle: {
          "0%, 100%": { transform: "rotate(0deg)", transformOrigin: "bottom" },
          "10%": { transform: "rotate(-6deg)", transformOrigin: "bottom" },
          "15%": { transform: "rotate(0deg)", transformOrigin: "bottom" },
          "20%": { transform: "rotate(-4deg)", transformOrigin: "bottom" },
          "25%": { transform: "rotate(0deg)", transformOrigin: "bottom" },
          "30%": { transform: "rotate(-2deg)", transformOrigin: "bottom" },
          "35%": { transform: "rotate(0deg)", transformOrigin: "bottom" },
        },
        fadein: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeout: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        wmspin: "wmspin 15s ease-in-out infinite",
        twiggle: "twiggle 15s ease-in-out infinite",
        bwiggle: "bwiggle 15s ease-in-out infinite",
        fadein: "fadein 0.3s",
        fadeout: "fadeout 0.3s",
      },
    },
  },
  plugins: [],
};
