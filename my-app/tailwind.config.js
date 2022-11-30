/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      bgimage: {
        "wave-pattern": "url('/src/assets/images/wave-pattern.svg')",
      },
    },
    fontFamily: {
      feather: ["feather"],
    },
  },
  plugins: [],
};
