import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const rootDir = process.cwd()
const distDir = path.join(rootDir, 'dist')
const ssrDir = path.join(rootDir, '.ssr-tmp')

async function prerender() {
  const entryPath = path.join(ssrDir, 'entry-server.js')
  const { renderApp } = await import(pathToFileURL(entryPath).href)
  const appHtml = renderApp()

  const htmlPath = path.join(distDir, 'index.html')
  let html = fs.readFileSync(htmlPath, 'utf8')

  // Inject SSR HTML into #root
  if (!html.includes('<div id="root"></div>')) {
    throw new Error('Could not find <div id="root"></div> placeholder in dist/index.html')
  }
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  // Inline built CSS and delete external CSS asset file
  const cssLinkMatch = html.match(/<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']*\/assets\/[^"']+\.css)["'][^>]*>/i)
  if (cssLinkMatch) {
    const cssHref = cssLinkMatch[1]
    const cssFilename = path.basename(cssHref)
    const cssFilePath = path.join(distDir, 'assets', cssFilename)
    if (fs.existsSync(cssFilePath)) {
      const cssContent = fs.readFileSync(cssFilePath, 'utf8').trim()
      html = html.replace(cssLinkMatch[0], `<style>${cssContent}</style>`)
      fs.unlinkSync(cssFilePath)
    }
  }

  fs.writeFileSync(htmlPath, html, 'utf8')
  fs.rmSync(ssrDir, { recursive: true, force: true })
  console.log('Prerendered HTML and inlined CSS into dist/index.html')
}

prerender().catch((err) => {
  console.error(err)
  process.exit(1)
})
