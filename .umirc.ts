import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "@/pages/edit-resume" },
  ],
  history: {type: 'hash'},
  // 思源黑体，楷体, 思源宋体
  styles: ['https://static.zeoseven.com/zsft/288/main/result.css', 'https://static.zeoseven.com/zsft/5/main/result.css', 'https://chinese-fonts-cdn.deno.dev/packages/syst/dist/SourceHanSerifCN/result.css'],
  publicPath: '/simpleCV/',
  favicons: ['/simpleCV/favicon.png'],
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
