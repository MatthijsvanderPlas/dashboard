/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(230px)' },
        },
        out: {
          '0%': { transform: 'translateX(230px)' },
          '100%': { transform: 'translateX(0px)' },
        },
      },
      animation: {
        slide: 'slide 300ms ease-in-out forwards',
        out: 'out 300ms ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
