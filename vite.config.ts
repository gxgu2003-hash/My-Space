import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
import { defineConfig } from 'vite'
import react from '@vitejs/react' // 或者是 vue，保持你原来的不变

export default defineConfig({
  // ✨ 关键：加入这一行。请把 '你的仓库名' 替换成你 GitHub 上这个仓库的真实名字
  // 例如你的仓库链接是 github.com/gxgu2003-hash/my-web，那就写 '/my-web/'
  base: '/My-Space/', 
  plugins: [react()],
})
