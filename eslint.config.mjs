import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  {
    ignores: [".next/**", "node_modules/**", "public/uploads/**"]
  },
  js.configs.recommended,
  {
    plugins: {
      "@next/next": nextPlugin
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        React: "readonly",
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        URL: "readonly",
        TextEncoder: "readonly",
        setInterval: "readonly",
        FormData: "readonly",
        fetch: "readonly",
        location: "readonly",
        confirm: "readonly",
        document: "readonly",
        module: "readonly",
        require: "readonly"
      }
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-undef": "error"
    }
  }
];
