module.exports = {
  "*.js": [
    "eslint --config config/.eslintrc.js --ignore-path config/.eslintignore --fix",
    "git add"
  ],
  "*.emdaer.md": ["emdaer --yes", "git add"]
};
