// ESLint 9 flat config (replaces .eslintrc). Next 16 removed `next lint`;
// run `npm run lint`, which calls the ESLint CLI directly.
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextCoreWebVitals,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "output/**",
      "analyze/**",
      "src/components/Calculator/Dinkytown/**/*.js",
    ],
  },
  {
    rules: {
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/rules-of-hooks": "off",
      // New React Compiler rules in eslint-plugin-react-hooks v7. Existing code
      // predates them (54 findings at upgrade time); surfaced as warnings and
      // tracked as follow-up work rather than blocking lint.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/static-components": "warn",
    },
  },
];

export default config;
