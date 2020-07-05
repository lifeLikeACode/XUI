module.exports = {
  extends: ["standard"],
  parserOptions: {
    parser: "babel-eslint"
  },
  parser: "vue-eslint-parser",
  rules: {
    "no-tabs": "off",
    "no-mixed-spaces-and-tabs": 0,
    semi: 0,
    "comma-dangle": 0,
    quotes: 0,
    "space-before-function-paren": 0
  },
  globals: {
    document: true,
    localStorage: true,
    window: true
  }
};
