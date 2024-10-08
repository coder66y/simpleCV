import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "@/pages/edit-resume" },
  ],
  locale: {
    // 默认使用 src/locales/zh-CN.ts 作为多语言文件
    default: 'zh-CN',
    baseSeparator: '-',
  },
  theme: { 
    '@primary-color': '#44a6d7',
    "@grey-2": '#616161',
    "@grey-1": "#f5f7f9",
    "@grey-3": "#0003"
  },
  npmClient: 'pnpm',
  mfsu: {
    shared: {
      react: {
        singleton: true,
      },
    },
  },
});
