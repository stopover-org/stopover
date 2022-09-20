module.exports = {
  extends: [
    "next/core-web-vitals",
    "airbnb",
    "airbnb-typescript",
    "prettier"
  ],
  "plugins": ["prettier"],
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname
  },
  rules: {
    "prettier/prettier": ["error"],
    "react/react-in-jsx-scope": "off",
    "react/no-array-index-key": "off",
    "react/jsx-props-no-spreading": "off",
    "react/destructuring-assignment": "off",
    "react/require-default-props": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "no-param-reassign": "off",
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/prop-types": "off",
    "padding-line-between-statements": ["error",
      { blankLine: "always", prev: ["const", "let", "var"], next: "*"},
    ],
    "import/no-named-as-default": "off",
  }
}
