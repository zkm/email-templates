import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Allow overriding the base public path via env (CLI --base still takes precedence)
const base = process.env.VITE_BASE
  || process.env.BASE
  || process.env.PUBLIC_BASE_PATH
  || '/'

export default defineConfig({
  base,
  plugins: [react()],
})
