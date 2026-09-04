import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/literata/400.css'
import '@fontsource/literata/500.css'
import '@fontsource/literata/600.css'
import '@fontsource/atkinson-hyperlegible/400.css'
import '@fontsource/atkinson-hyperlegible/700.css'
import App from './App.jsx'
import './styles.css'
import './refinement.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
