import { hydrate, render } from 'preact'
import './index.css'
import App from './App'

const root = document.getElementById('root')
if (root.hasChildNodes()) {
  hydrate(<App />, root)
} else {
  render(<App />, root)
}
