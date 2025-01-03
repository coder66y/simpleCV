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
  metas: [
    { name: 'keywords', content: 'resume, simpleCV, cv, 简历, 免费, 免费简历生成, 简历模板, 简历生成, 简历编辑, 简历制作, 简历设计' },
    { name: 'description', content: '在线简历编辑平台' },
  ],
  title: '在线简历编辑平台',
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
