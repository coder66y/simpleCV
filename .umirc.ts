import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "@/pages/edit-resume" },
  ],
  history: {type: 'hash'},
  publicPath: '/simpleCV/',
  theme: { 
    '@primary-color': '#44a6d7',
    "@grey-2": '#616161',
    "@grey-1": "#f5f7f9",
    "@grey-3": "#0003"
  },
  plugins: [
    '@umijs/plugins/dist/dva',
  ],
  dva: {
    immer: {
      enableES5: true,
      enableAllPlugins: true,
    },
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
