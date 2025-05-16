import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxHeight: {
        "2/3screen": "66.67vh",
      },
    },
  },
  plugins: [],
} satisfies Config;
