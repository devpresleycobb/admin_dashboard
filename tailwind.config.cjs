const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'body': ['"Lato"'],
    },
    extend: {
      colors: {
        'component': '#283145',
      }
    },
  },
  plugins: [],
});
