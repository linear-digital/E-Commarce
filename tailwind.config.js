/** @type {import('tailwindcss').Config} */
  module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/*.{js,ts,jsx,tsx,mdx}",
  ],
    daisyui: {
      themes: [
        {
          mytheme: {
            primary: "#e30613",
            secondary: "#f6d860",
            accent: "#37cdbe",
            neutral: "#3d4451",
          },
        },
        "light"
      ],
    },
  plugins: [require("daisyui"), require('flowbite/plugin')],
};
