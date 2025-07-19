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
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 2s",
        "float-slow": "float 8s ease-in-out infinite",
        "bounce-soft": "bounce-soft 4s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
};

export default config;
