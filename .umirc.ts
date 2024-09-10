import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "@/pages/edit-resume" },
  ],
  npmClient: 'pnpm',
  mfsu: {
    shared: {
      react: {
        singleton: true,
      },
    },
  },
});
