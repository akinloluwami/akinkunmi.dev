/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Newsreader", "Georgia", "ui-serif", "serif"],
      },
      colors: {
        "black-001": "#0c0b09",
        "off-white": "#f5f2eb",
        muted: "#9a958c",
        "muted-faint": "#6b6560",
        hairline: "rgba(245, 242, 235, 0.09)",
        accent: "#c4b59d",
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1.4" }],
      },
    },
  },
  plugins: [],
};
