module.exports = {
  theme: {
    extend: {
      keyframes: {
        lower: {
          from: { 'z-index': -1 },
          to: { 'z-index': 1000 },
        },
      },
    },
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
      serif: ['Open Sans', 'sans-serif'],
    },
  },
  plugins: [],
  presets: [require('tailwindcss/stubs/defaultConfig.stub')],
};
