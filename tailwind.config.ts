import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#f0f4f8",
          100: "#dbe4ee",
          200: "#b8c9db",
          300: "#8aa5c2",
          400: "#5c7fa6",
          500: "#3d638a",
          600: "#2d4a6b",
          700: "#1e3552",
          800: "#152840",
          900: "#0f1d2e",
        },
        soft: {
          blue: "#e8eef4",
          gray: "#f6f8fa",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(30, 53, 82, 0.08), 0 10px 20px -2px rgba(30, 53, 82, 0.06)",
        glow: "0 0 40px -10px rgba(45, 74, 107, 0.2)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
