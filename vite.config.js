import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

// GitHub Pages serves only real files, so copy the app shell to each
// client-side route (and 404.html as a fallback) to make deep links load
const SPA_ROUTES = ['alliance']

function spaRoutes() {
  return {
    name: 'spa-routes',
    apply: 'build',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      const index = resolve(dist, 'index.html')
      for (const route of SPA_ROUTES) {
        mkdirSync(resolve(dist, route), { recursive: true })
        copyFileSync(index, resolve(dist, route, 'index.html'))
      }
      copyFileSync(index, resolve(dist, '404.html'))
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), spaRoutes()],
})
