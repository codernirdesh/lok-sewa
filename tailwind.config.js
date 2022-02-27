module.exports = {
  mode: "jit",
  purge: ["./**/*.html"],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    // require("tailwindcss-typography"),
    require("@tailwindcss/typography"),
  ],
};
