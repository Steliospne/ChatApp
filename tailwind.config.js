/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js,ejs}", "./*.{html,js,ejs}"],
  theme: {
    extend: {
      boxShadow: {
        btnPressed:
          "inset -2px -2px 3px rgba(255, 255, 255, 0.6), inset 2px 2px 3px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};
