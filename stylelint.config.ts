import type { Config } from "stylelint";

export default {
  extends: [
    "stylelint-config-recommended",
    "stylelint-config-html",
    "stylelint-config-tailwindcss",
  ],
  ignoreFiles: ["dist/**", ".astro/**", "node_modules/**"],
  rules: {
    // Tailwind CSS 4 的指令不在 stylelint 内置列表中。
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "theme",
          "plugin",
          "custom-variant",
          "utility",
          "variant",
          "source",
          "reference",
          "apply",
        ],
      },
    ],
    // Astro 与 Vue 的作用域样式使用 :global 与 :deep。
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["global", "deep"] },
    ],
    // 组件作用域内的选择器顺序由模板结构决定，不按全局级联推断。
    "no-descending-specificity": null,
  },
} satisfies Config;
