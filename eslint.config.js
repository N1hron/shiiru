import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat.recommended,
      reactX.configs["recommended-typescript"],
      reactDom.configs.recommended,
      reactRefresh.configs.vite
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname
      },
      ecmaVersion: 2020,
      globals: globals.browser
    }
  },
  {
    plugins: { "@stylistic": stylistic },
    rules: {
      "@stylistic/array-bracket-newline": ["error", "consistent"],
      "@stylistic/array-bracket-spacing": ["error", "never"],
      "@stylistic/array-element-newline": ["error", "consistent"],
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/arrow-spacing": ["error", { before: true, after: true }],
      "@stylistic/block-spacing": ["error", "always"],
      "@stylistic/brace-style": ["error", "1tbs"],
      "@stylistic/comma-dangle": ["error", "never"],
      "@stylistic/comma-spacing": ["error", { before: false, after: true }],
      "@stylistic/comma-style": ["error", "last"],
      "@stylistic/computed-property-spacing": ["error", "never"],
      "@stylistic/curly-newline": ["error", "always"],
      "@stylistic/dot-location": ["error", "property"],
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/function-call-argument-newline": ["error", "consistent"],
      "@stylistic/function-call-spacing": ["error", "never"],
      "@stylistic/function-paren-newline": ["error", "multiline-arguments"],
      "@stylistic/generator-star-spacing": ["error", "after"],
      "@stylistic/implicit-arrow-linebreak": ["error", "beside"],
      "@stylistic/indent": ["error", 2, { VariableDeclarator: "first" }],
      "@stylistic/indent-binary-ops": ["error", 2],
      "@stylistic/jsx-child-element-spacing": "error",
      "@stylistic/jsx-closing-bracket-location": ["error", "line-aligned"],
      "@stylistic/jsx-closing-tag-location": ["error", "line-aligned"],
      "@stylistic/jsx-curly-brace-presence": ["error", "never"],
      "@stylistic/jsx-curly-newline": ["error", "consistent"],
      "@stylistic/jsx-curly-spacing": ["error", { children: { when: "always" }, attributes: { when: "never" } }],
      "@stylistic/jsx-equals-spacing": ["error", "never"],
      "@stylistic/jsx-first-prop-new-line": ["error", "multiline"],
      "@stylistic/jsx-function-call-newline": ["error", "multiline"],
      "@stylistic/jsx-indent-props": ["error", "first"],
      "@stylistic/jsx-max-props-per-line": ["error", { maximum: 1, when: "multiline" }],
      "@stylistic/jsx-newline": "off",
      "@stylistic/jsx-one-expression-per-line": "off",
      "@stylistic/jsx-pascal-case": "error",
      "@stylistic/jsx-quotes": ["error", "prefer-double"],
      "@stylistic/jsx-self-closing-comp": "error",
      "@stylistic/jsx-tag-spacing": ["error", {
        closingSlash: "never",
        beforeSelfClosing: "always",
        afterOpening: "never",
        beforeClosing: "never"
      }],
      "@stylistic/jsx-wrap-multilines": ["error", {
        declaration: "parens-new-line",
        assignment: "parens-new-line",
        return: "parens-new-line",
        arrow: "parens-new-line",
        condition: "parens-new-line",
        logical: "parens-new-line",
        prop: "parens-new-line",
        propertyValue: "parens-new-line"
      }],
      "@stylistic/key-spacing": ["error", { afterColon: true, mode: "strict" }],
      "@stylistic/keyword-spacing": ["error", { before: true, after: true }],
      "@stylistic/line-comment-position": ["error", { position: "above" }],
      "@stylistic/linebreak-style": "off",
      "@stylistic/lines-around-comment": ["error", {
        beforeBlockComment: true,
        beforeLineComment: true,
        allowBlockStart: true,
        allowClassStart: true,
        allowObjectStart: true,
        allowArrayStart: true
      }],
      "@stylistic/lines-between-class-members": [
        "error",
        { enforce: [{ blankLine: "always", prev: "*", next: "method" }] },
        { exceptAfterOverload: true }
      ],
      "@stylistic/max-len": ["error", { code: 120 }],
      "@stylistic/max-statements-per-line": ["error", { max: 1 }],
      "@stylistic/member-delimiter-style": ["error", {
        multiline: {
          delimiter: "semi",
          requireLast: true
        },
        singleline: {
          delimiter: "semi",
          requireLast: false
        },
        multilineDetection: "brackets"
      }],
      "@stylistic/multiline-comment-style": ["error", "separate-lines"],
      "@stylistic/multiline-ternary": ["error", "always-multiline"],
      "@stylistic/new-parens": ["error", "always"],
      "@stylistic/newline-per-chained-calls": "off",
      "@stylistic/no-confusing-arrow": "error",
      "@stylistic/no-extra-parens": "off",
      "@stylistic/no-extra-semi": "error",
      "@stylistic/no-floating-decimal": "error",
      "@stylistic/no-mixed-operators": "error",
      "@stylistic/no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/no-multiple-empty-lines": ["error", { max: 1 }],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/no-whitespace-before-property": "error",
      "@stylistic/nonblock-statement-body-position": ["error", "beside"],
      "@stylistic/object-curly-newline": ["error", { consistent: true }],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],
      "@stylistic/one-var-declaration-per-line": ["error", "initializations"],
      "@stylistic/operator-linebreak": ["error", "after"],
      "@stylistic/padded-blocks": ["error", "never"],
      "@stylistic/quote-props": ["error", "as-needed"],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/rest-spread-spacing": ["error", "never"],
      "@stylistic/semi": "error",
      "@stylistic/semi-spacing": "error",
      "@stylistic/space-before-blocks": ["error", "always"],
      "@stylistic/space-before-function-paren": ["error", "never"],
      "@stylistic/space-in-parens": ["error", "never"],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/space-unary-ops": ["error", { words: true, nonwords: false }],
      "@stylistic/spaced-comment": ["error", "always"],
      "@stylistic/switch-colon-spacing": ["error", { after: true, before: false }],
      "@stylistic/template-curly-spacing": ["error", "never"],
      "@stylistic/template-tag-spacing": ["error", "never"],
      "@stylistic/type-annotation-spacing": ["error", { overrides: { colon: { before: false, after: true } } }],
      "@stylistic/type-generic-spacing": "error",
      "@stylistic/type-named-tuple-spacing": "error",
      "@stylistic/wrap-iife": ["error", "inside"],
      "@stylistic/wrap-regex": "error",
      "@stylistic/yield-star-spacing": ["error", "after"]
    }
  }
]);
