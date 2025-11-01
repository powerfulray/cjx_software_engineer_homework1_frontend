# codestyle.md — Vue (Google JavaScript Style Guide + Vue 官方指南)

主要参考来源:Google JavaScript Style Guide ，Vue 官方指南

---

## 1. 总体原则
- JS/TS 部分遵循 Google JavaScript Style Guide（命名、缩进、注释、模块导入等）。
- Vue 特有的组件命名、props、事件、SFC 文件组织则遵循 Vue 官方 Style Guide 的推荐（组件多词命名、props 验证、文件名规则等）。
- 使用自动化工具（ESLint + Prettier 或 ESLint + eslint --fix）在提交/CI 中强制执行规则，以避免风格争议。

---

## 2. 项目/目录结构（建议）
```
src/
├── assets/
├── components/      // 可重用通用组件（Base、UI）
├── layouts/
├── pages/           // 路由页面组件
├── composables/     // 可复用逻辑（Vue 3 composition）
├── store/           // Pinia / Vuex
├── services/        // API 封装
├── router/
└── utils/
```

---

## 3. Single File Component (SFC) 约定
- 文件扩展名使用 `.vue`。
- 文件名可统一为 **PascalCase**（例如 `UserCard.vue`）或 **kebab-case**（例如 `user-card.vue`），团队选一种并保持一致。官方推荐 PascalCase 有利于编辑器自动完成。  
- 组件 `name` 推荐使用 `PascalCase` 并为多词（非根 App 组件）。
- SFC 的代码块顺序（推荐）：
  1. `<script setup>` / `<script>`
  2. `<template>`
  3. `<style>`

- 对于 Vue 3，推荐使用 `<script setup>` 语法糖（更简洁且性能更好），但若项目需兼容旧写法，可使用标准 `<script>` + `export default`。  
- 不在模板中编写复杂表达式 —— 将复杂逻辑放入 `computed` / `setup`。  

---

## 4. 命名约定
- 组件名：`PascalCase`（`MyButton`）或 `kebab-case` 文件名配合 `PascalCase` 导出/引用。  
- 事件名（$emit）：**kebab-case**（`'user-logged-in'`），在 JS 中使用 camelCase 触发/监听根据团队约定，但模板中使用 kebab-case。  
- Props：在组件 JS/TS 中使用 `camelCase` 定义（`userName`），模板中以 `kebab-case` 传递（`user-name="..."`）。  
- 变量/函数：遵循 Google JS 的 `lowerCamelCase`。  
- 文件：按功能夹或组件命名，页面组件可放 `pages/`。  

---

## 5. 缩进与格式化
- **缩进：2 个空格**（与 Google JS 风格一致）。  
- 推荐使用 Prettier 或 google-style/ESLint 配置做自动格式化；在 CI 中加入格式检查。  
- 每行长度建议不超过 100 个字符。  

---

## 6. JavaScript / TypeScript 细则（Google JS 风格要点）
- 使用 `const` / `let`（优先使用 `const`）。  
- 使用 ES6+ 语法（模块 `import` / `export`，箭头函数，解构等）。  
- 使用分号（`;`）。
- 避免在不同地方改变模块导出风格（始终使用 `export default` 或命名导出，视团队约定）。

---

## 7. Vue 组件最佳实践
- 组件职责单一（单一职责）。  
- 将可复用逻辑提取到 `composables/`（Vue 3 composition API）。  
- 使用 `emits` 明确声明触发的事件；使用 `props` 验证类型与必填性（或使用 TypeScript）。  
- 避免直接修改父组件传入的 props（创建本地副本或使用 v-model / emit）。

---

## 8. 模板与 JSX
- 模板内尽量避免三元嵌套与复杂表达式；使用计算属性或方法。  
- 如果使用 JSX/TSX，遵循 Google 的 JS 风格与项目的 React/TSX 约定（如有）。

---

## 9. 样式（CSS / Preprocessor）
- 样式放在 SFC 的 `<style>` 中或使用全局样式/utility-first（如 Tailwind）；团队须统一方式。  
- 推荐 `scoped` CSS 以避免样式泄漏，或使用 CSS Modules / BEM 命名空间策略。  
- 尽量避免内联样式（style="...")，使用 class 绑定与 computed class。  

---

## 10. Imports 顺序与组织
- 模块导入顺序建议：外部依赖 → 绝对路径（src/）→ 相对路径（父/同级/子），每组之间空一行；使用具体导入避免 `*`。  
- 对于大型项目，建议在 `tsconfig.json` 中配置 `paths`（或 vite/webpack alias）并在 ESLint 中保持解析一致。

---

## 11. ESLint / Lint 规则（推荐）
- 使用 `eslint`，并选用：
  - `eslint:recommended` 基础规则
  - `plugin:vue/vue3-recommended`（或 `plugin:vue/recommended` 根据版本）
  - `google` 或 `airbnb-base`（JS 通用规则，团队选其一）
  - `prettier` 与 `eslint-config-prettier` 以解决格式化冲突

- 启用规则示例：强制 `component-name-in-template-casing`、`no-duplicate-attributes`、`vue/require-prop-types`（如未使用 TypeScript）。

---

## 12. 测试与类型检查
- 单元测试使用 Vitest / Jest；UI 组件可使用 @vue/test-utils。  
- 若项目使用 TypeScript，启用 `strict` 模式并在 CI 中运行 `tsc --noEmit` 做类型检查。

---

## 13. 日志与错误处理
- 在前端避免打印敏感信息。使用统一的错误展示/Toast 服务，后端错误转换为用户友好的消息。  

---

## 14. 代码审查要点
- 命名是否清晰，组件是否过大、是否可复用？  
- 是否有单元测试/样式影响？是否遵循 ESLint/Prettier？  

---

## 15. 工具链示例（快速放入 package.json 的脚本）
```json
{
  "scripts": {
    "lint": "eslint --ext .js,.ts,.vue src",
    "lint:fix": "eslint --fix --ext .js,.ts,.vue src",
    "format": "prettier --write \"src/**/*.{js,ts,vue,json,md}\""
  }
}
```

---

## 16. 可选团队约定（可选，建议项目讨论决定）
- 是否强制使用 `script setup`？
- 组件文件名 PascalCase or kebab-case？
- 是否使用 TypeScript？
- 是否采用 Tailwind vs 传统 CSS？

---

## 17. 参考资料（建议阅读）
- Google JavaScript Style Guide
- Vue.js Official Style Guide
- Airbnb JavaScript Style Guide



