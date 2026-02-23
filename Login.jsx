import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../utils/authService'
import logo from '../assets/logo.jpg'
import './Auth.css'

function Login({ setUser }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const user = await authService.login(email, password)
      setUser(user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <img src={logo} alt="Alfa Financeira" className="logo" />
          <h1>Alfa Financeira</h1>
          <p>Sistema de Gerenciamento de Empréstimos</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? '⏳ Entrando...' : '🔓 Entrar'}
          </button>
        </form>

        <div className="auth-footer">
          <p style={{ fontSize: '13px', color: '#999', marginTop: '20px' }}>
            Primeira vez? Procure o gerente da Alfa Financeira para criar sua conta.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
