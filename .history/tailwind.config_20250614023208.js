/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cocosharp: ["Cocosharp", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        regular: "400",
        bold: "700",
      },
    },
  },
  plugins: [],
};
