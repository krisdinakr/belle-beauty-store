import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import App from '@/App'
import { AuthProvider } from '@/context/AuthContext'
import { NavigationProvider } from '@/context/NavigationContext'
import '@/styles/main.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <NavigationProvider>
          <Routes>
            <Route
              path="/*"
              element={<App />}
            />
          </Routes>
        </NavigationProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
)
