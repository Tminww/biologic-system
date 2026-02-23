import { defineConfig } from "vite";

export default defineConfig({
  server: {
    fs: {
      // разрешить Vite читать файлы выше корня проекта
      allow: [".."],
    },
  },
});