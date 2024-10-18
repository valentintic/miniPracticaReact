import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Jugadores from './components/Jugadores.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Jugadores />
  </StrictMode>,
)
