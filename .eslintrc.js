/*
 * @Date: 2020-07-23 15:24:24
 * @Author: goEval
 * @LastEditors: goEval
 * @LastEditTime: 2020-07-23 15:53:29
 * @FilePath: \HomeworkCLI\.eslintrc.js
 * @Github: https://github.com/heqyou_free
 */
module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'google',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'max-len': 0,
  },
};
