import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Toaster} from 'react-hot-toast'
import App from './App.jsx'
import StoreProvider from './context/StoreProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StoreProvider>
    <>
    <App />
    <Toaster/>
    </>
  </StoreProvider>,
)
