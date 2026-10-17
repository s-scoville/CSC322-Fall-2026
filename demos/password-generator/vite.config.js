import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  build: {
    outDir: `../../assets/password-generator`,
    emptyOutDir: true,
    lib: {
      entry: `src/main.jsx`,
      formats: ['es'],
      fileName: `password-generator`,
      cssFileName: `password-generator`
    }
  }
})
