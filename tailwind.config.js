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
        slideFromTop: {
          '0%': { transform: 'translateY(-500px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        slideOut: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-500px)' },
        },
      },
      animation: {
        slide: 'slide 300ms ease-in-out forwards',
        out: 'out 300ms ease-in-out forwards',
        slideFromTop: 'slideFromTop 400ms ease-in-out forwards',
        slideOut: 'slideOut 400ms ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
