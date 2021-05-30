module.exports = {
	purge: [],
   purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    maxWidth: {
      'sm': '18rem',
      'xs': '17rem',
      "3xl": '38rem'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
