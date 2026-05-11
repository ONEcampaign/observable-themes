import React from 'react'
import { createRoot } from 'react-dom/client'
import '@pkg/styles/index.css'
import './preview.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(<App />)
