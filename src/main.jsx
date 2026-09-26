import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
// import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./contex/ThemeContext.jsx";
import { AuthProvider } from "./contex/AuthContext.jsx";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <ThemeProvider >
        <AuthProvider >
        <App />
         </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
