import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'
import './styles.css'
import App from './App.tsx'

// Make sure the root element exists
const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(<App />)
} else {
  console.error('Root element not found. Creating a new one.')
  const newRoot = document.createElement('div')
  newRoot.id = 'root'
  document.body.appendChild(newRoot)
  createRoot(newRoot).render(<App />)
}
