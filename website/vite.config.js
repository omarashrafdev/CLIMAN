import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const BASE_URL = 'http://localhost:3000/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
})
