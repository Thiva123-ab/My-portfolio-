/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          950: "#020617",
          900: "#0f172a",
          800: "#1e293b",
        },
        brand: {
          DEFAULT: "#4f46e5",
          light: "#818cf8",
        },
        signal: {
          DEFAULT: "#22d3ee",
          green: "#10b981",
        },
        hr: {
          bg: "#0b1410",
          panel: "#121c17",
          green: "#2ebd59",
          green2: "#1ba94c",
          line: "#1f3d2c",
          muted: "#8aa396",
        },
      },
    },
  },
  plugins: [],
};
