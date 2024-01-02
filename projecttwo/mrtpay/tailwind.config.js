/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-dark-green": "#415b5c",
        "custom-light-green": "#e2edec",
        "custom-yellow": "#c69e24",
      }
    },
  },
  plugins: [],
}

