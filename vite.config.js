import { defineConfig } from 'vite'

export default defineConfig({
  base: '/portifolio/',
  oxc: {
    jsx: {
      runtime: 'automatic',
      importSource: 'preact',
    },
  },
  build: {
    target: 'es2020',
    cssMinify: true,
    modulePreload: {
      polyfill: false,
    },
  },
})
