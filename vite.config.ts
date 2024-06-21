import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ks_guard_react',
  // build: {
  //   outDir: '../API/wwwroot'
  // },
  build: {
    outDir: './build'
  },
  plugins: [react()],
})
