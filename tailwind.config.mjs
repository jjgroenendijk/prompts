/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#88C0D0", // nord8 (Frost)
          foreground: "#2E3440", // nord0
          hover: "#81A1C1", // nord9
        },
        secondary: {
          DEFAULT: "#B48EAD", // nord15 (Aurora Purple)
          foreground: "#ECEFF4",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        border: "var(--border)",
        // Nord Palette
        nord: {
          0: "#2E3440",
          1: "#3B4252",
          2: "#434C5E",
          3: "#4C566A",
          4: "#D8DEE9",
          5: "#E5E9F0",
          6: "#ECEFF4",
          7: "#8FBCBB",
          8: "#88C0D0",
          9: "#81A1C1",
          10: "#5E81AC",
          11: "#BF616A",
          12: "#D08770",
          13: "#EBCB8B",
          14: "#A3BE8C",
          15: "#B48EAD",
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};