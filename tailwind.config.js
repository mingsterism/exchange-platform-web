module.exports = {
	purge: [],
   purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'clothes': "url('https://st3.depositphotos.com/17369252/i/600/depositphotos_372536484-stock-photo-fashion-clothes-rack-light-background.jpg')",
       })
    },
    maxWidth: {
      'sm': '18rem',
      'xs': '17rem',
      "screen-xl": '1280px'
    },
    minHeight: {
      '30': '7rem',
      '36': '9rem',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
