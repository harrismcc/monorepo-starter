import type { Config } from "tailwindcss";

import baseConfig from "@acme/tailwind-config";

export default {
  presets: [baseConfig],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // We need to append the path to the UI package to the content array so that
    // those classes are included correctly.
    "../../packages/ui/src/**/*.{jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
