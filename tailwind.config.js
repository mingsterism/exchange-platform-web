module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        xs: "18rem",
        sm: "24rem",
        md: "30rem",
      },
      maxWidth: {
        xxs: "15rem",
        xs: "18rem",
        sm: "24rem",
        md: "30rem",
        lg: "48rem",
        xl: "54rem",
        "screen-xl": "1280px",
      },
      minHeight: {
        30: "7rem",
        36: "9rem",
        full: "100vh",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
