import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        cyan: {
          nova: "#43E7FF",
        },
        violet: {
          nova: "#A855F7",
        },
        blue: {
          nova: "#4F8CFF",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(67, 231, 255, 0.22)",
        "glow-violet": "0 0 50px rgba(168, 85, 247, 0.22)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" },
        },
        scan: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.38" },
          "50%": { opacity: "0.82" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        scan: "scan 4s linear infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
