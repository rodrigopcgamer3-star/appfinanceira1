import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../utils/authService'
import validationService from '../utils/validationService'
import logo from '../assets/logo.jpg'
import './Auth.css'

function Cadastro({ setUser }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [passwordStrength, setPasswordStrength] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    let maskedValue = value

    // Aplicar máscaras
    if (name === 'cpf') {
      maskedValue = validationService.maskCPF(value)
    } else if (name === 'telefone') {
      maskedValue = validationService.maskPhone(value)
    }

    setFormData(prev => ({ ...prev, [name]: maskedValue }))

    // Calcular força da senha
    if (name === 'password') {
      setPasswordStrength(validationService.getPasswordStrength(value))
    }

    // Limpar erros desse campo
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Validar Nome
    if (formData.nome.length < 5) {
      newErrors.nome = 'Nome deve ter no mínimo 5 caracteres'
    }

    // Validar CPF
    if (!validationService.isValidCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido'
    }

    // Validar Email
    if (!validationService.isValidEmail(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    // Validar Telefone - 11 dígitos obrigatório
    if (!validationService.isValidPhone(formData.telefone)) {
      newErrors.telefone = 'Telefone deve ter 11 dígitos (DDD + número)'
    }

    // Validar Senha
    if (formData.password.length < 8) {
      newErrors.password = 'Senha deve ter no mínimo 8 caracteres'
    }
    if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Senha deve conter uma letra maiúscula'
    }
    if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Senha deve conter um número'
    }

    // Validar Confirmação de Senha
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não conferem'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const user = await authService.register(
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.nome,
        formData.cpf,
        formData.telefone
      )
      setUser(user)
      navigate('/dashboard')
    } catch (err) {
      setErrors({ submit: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box" style={{ maxWidth: '500px' }}>
        <div className="auth-header">
          <img src={logo} alt="Alfa Financeira" className="logo" />
          <h1>Novo Cadastro</h1>
          <p>Crie sua conta na Alfa Financeira</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {errors.submit && <div className="error-message">{errors.submit}</div>}

          <div className="form-group">
            <label>Nome Completo</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Seu nome completo"
              required
            />
            {errors.nome && <span className="field-error">{errors.nome}</span>}
          </div>

          <div className="form-group">
            <label>CPF</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="000.000.000-00"
              required
              maxLength="14"
            />
            {errors.cpf && <span className="field-error">{errors.cpf}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Telefone (obrigatório)</label>
            <input
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
              required
              maxLength="15"
            />
            {errors.telefone && <span className="field-error">{errors.telefone}</span>}
            <small style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>
              11 dígitos: DDD (2) + número (9)
            </small>
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 8 caracteres (letra maiúscula + número)"
              required
            />
            {formData.password && (
              <div style={{ fontSize: '12px', marginTop: '6px', color: '#666' }}>
                Força: <strong style={{ color: passwordStrength === 'Muito Forte' ? '#10b981' : '#f59e0b' }}>
                  {passwordStrength}
                </strong>
              </div>
            )}
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>Confirmar Senha</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repita sua senha"
              required
            />
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? '⏳ Criando conta...' : '✅ Criar Conta'}
          </button>
        </form>

        <div className="auth-footer">
          <p style={{ fontSize: '12px', color: '#666', margin: '0 0 15px 0' }}>
            Ao criar sua conta, você concorda com nossos termos de serviço.
          </p>
          <p style={{ fontSize: '14px', margin: '0' }}>
            Já tem conta? <Link to="/login" style={{ fontWeight: '700', fontSize: '14px' }}>Faça login aqui</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Cadastro
