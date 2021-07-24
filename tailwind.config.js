module.exports = {
  purge: ['**/layouts/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
