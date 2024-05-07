// tailwind.config.js
import { nextui } from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*",
    ".{js,ts,jsx,tsx}",
    "./src/**/*",
  ],
  theme: {
    extend: {
      colors: {
        "primary-text": "#417DC1",
        "secondary-text": "#5D9AC2",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
