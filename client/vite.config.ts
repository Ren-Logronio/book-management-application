import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __API: JSON.stringify("http://localhost:5000/api")
  },
  plugins: [react()],
})
