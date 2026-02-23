import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import authService from './utils/authService'
import './styles/global.css'

// Páginas
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Dashboard from './pages/Dashboard'
import Simulacao from './pages/Simulacao'
import Contratos from './pages/Contratos'
import Documentos from './pages/Documentos'
import Seguro from './pages/Seguro'
import Admin from './pages/Admin'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const handleLogout = async () => {
    await authService.logout()
    setUser(null)
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '16px',
        color: 'var(--text-light)',
        flexDirection: 'column',
        gap: '15px',
        background: 'var(--primary-light)'
      }}>
        <div style={{ fontSize: '32px' }}>⏳</div>
        <div>Carregando...</div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        {/* PAINEL ADMIN - ROTA SECRETA */}
        <Route path="/admin" element={<Admin />} />

        {!user ? (
          <>
            {/* PÁGINA INICIAL: CADASTRO */}
            <Route path="/" element={<Cadastro setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
            <Route path="/simulacao" element={<Simulacao user={user} onLogout={handleLogout} />} />
            <Route path="/contratos" element={<Contratos user={user} onLogout={handleLogout} />} />
            <Route path="/documentos" element={<Documentos user={user} onLogout={handleLogout} />} />
            <Route path="/seguro" element={<Seguro user={user} onLogout={handleLogout} />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </Router>
  )
}

export default App
