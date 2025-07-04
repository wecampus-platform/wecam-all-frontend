// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-1": "#f9fafb",
        "gray-2": "#f3f4f6",
        "gray-5": "#9ca3af",
        "gray-11": "#e5e7eb",
        "sub-1": "#f1f5ff",
        "sub-3": "#c3dafe",
        "point": "#1f2937",
        red: {
          DEFAULT: "#ef4444",
          200: "#fecaca",
          50: "#fef2f2",
        },
        orange: {
          50: "#fff7ed",
          600: "#ea580c",
          200: "#fed7aa",
        },
        green: {
          50: "#ecfdf5",
          600: "#059669",
          200: "#bbf7d0",
        },
      },
    },
  },
  plugins: [],
};
export default config;
