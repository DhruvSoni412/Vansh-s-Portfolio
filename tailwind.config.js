/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "rgb(var(--bg-rgb) / <alpha-value>)",
        "dark-card": "rgb(var(--surface-rgb) / <alpha-value>)",
        "dark-border": "rgba(255, 255, 255, 0.08)",
        light: "rgb(var(--text-rgb) / <alpha-value>)",
        "light-muted": "rgb(var(--muted-rgb) / <alpha-value>)",
        accent: "#C8FF4D",
        "accent-glow": "rgba(200, 255, 77, 0.25)",
        cosmic: "rgb(var(--bg-rgb) / <alpha-value>)",
        "cosmic-card": "rgb(var(--surface-rgb) / <alpha-value>)",
        gold: "#C8FF4D",
        "gold-light": "#e2ff88",
        "hud-text": "rgb(var(--text-rgb) / <alpha-value>)",
        "hud-muted": "rgb(var(--muted-rgb) / <alpha-value>)",
        ink: "#111214",
        coal: "#181a1d",
        paper: "#EDEDED",
        ash: "#1c1e22",
        smoke: "#9ca3af",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
      },
    },
  },
  plugins: [],
};
