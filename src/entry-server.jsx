import renderToString from 'preact-render-to-string'
import App from './App'

export function renderApp() {
  return renderToString(<App />)
}
