import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import './Navbar.css'

function Navbar({ user, onLogout }) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = React.useState(false)

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <img src={logo} alt="Alfa Financeira" className="navbar-logo-img" />
          <span className="navbar-logo-text">Alfa Financeira</span>
        </div>

        <ul className="nav-menu" style={menuOpen ? { display: 'flex' } : {}}>
          <li><a href="/dashboard" className="nav-link">📊 Dashboard</a></li>
          <li><a href="/simulacao" className="nav-link">💰 Simulação</a></li>
          <li><a href="/contratos" className="nav-link">✅ Contratos</a></li>
          <li><a href="/documentos" className="nav-link">📄 Documentos</a></li>
          <li><a href="/seguro" className="nav-link">🛡️ Seguro</a></li>
        </ul>

        <div className="navbar-right">
          <span className="user-name">👤 {user?.nome?.split(' ')[0]}</span>
          <button onClick={handleLogout} className="logout-btn">Sair</button>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
