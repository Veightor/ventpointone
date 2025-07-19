import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Dusky Bloom Ritual Theme using CSS variables
        "deep-charcoal": "var(--deep-charcoal)",
        "dusty-mauve": "var(--dusty-mauve)",
        "muted-burgundy": "var(--muted-burgundy)",
        "frosted-lilac": "var(--frosted-lilac)",
        "soft-rose": "var(--soft-rose)",
        "shadowed-plum": "var(--shadowed-plum)",
        "desaturated-white": "var(--desaturated-white)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
    },
  },
};

export default config;
