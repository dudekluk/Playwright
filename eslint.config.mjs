import typescript from "@typescript-eslint/eslint-plugin";
import playwright from "eslint-plugin-playwright";
import typescriptParser from "@typescript-eslint/parser";
import { strict } from "assert";
const { configs: typescriptConfigs } = typescript;

export default [
  {
    
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescript,
      "playwright": playwright
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    rules: {
      ...typescriptConfigs.recommended.rules,
      ...playwright.configs['flat/recommended'].rules,
      "no-console": "warn",
      "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error"
    }
  }
];
