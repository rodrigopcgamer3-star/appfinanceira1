import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SupportButton from '../components/SupportButton'
import dataService from '../utils/dataService'
import './Pages.css'

function Simulacao({ user, onLogout }) {
  const navigate = useNavigate()
  const [formEnviado, setFormEnviado] = useState(false)
  const [formData, setFormData] = useState({
    valorEmprestimo: '',
    prazoPagamento: '12',
    rendaMensal: ''
  })

  useEffect(() => {
    if (sessionStorage.getItem('simulacaoEnviada')) {
      setFormEnviado(true)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formEnviado) {
      alert('❌ Você já enviou um formulário nesta sessão!')
      return
    }

    try {
      await dataService.saveSimulacao(user, formData)
      sessionStorage.setItem('simulacaoEnviada', 'true')
      setFormEnviado(true)

      // Redirecionar após 2 segundos
      setTimeout(() => {
        sessionStorage.setItem('simulacaoCompletada', 'true')
        navigate('/dashboard')
      }, 2000)
    } catch (err) {
      alert('❌ Erro ao processar simulação')
    }
  }

  if (formEnviado) {
    return (
      <div className="page">
        <Navbar user={user} onLogout={onLogout} />
        <div className="page-container">
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h1>Simulação Recebida com Sucesso!</h1>
            <p>Sua solicitação foi registrada e analisada.</p>

            <div className="success-details">
              <h3>📋 Próximos Passos:</h3>
              <ol>
                <li>Proposta já foi gerada e está aguardando sua contratação</li>
                <li>Acesse a página <strong>Proposta</strong> para contratar</li>
                <li>Preencha seus dados bancários</li>
                <li>Contrate o seguro obrigatório</li>
                <li>Seu crédito será liberado em até 2 dias úteis</li>
              </ol>
            </div>

            <p style={{ color: '#999', fontSize: '13px', marginTop: '20px' }}>
              Redirecionando para dashboard em alguns segundos...
            </p>
          </div>
        </div>
        <SupportButton />
      </div>
    )
  }

  return (
    <div className="page">
      <Navbar user={user} onLogout={onLogout} />
      <div className="page-container">
        <div className="page-header">
          <h1>💰 Simule seu Empréstimo</h1>
          <p>Preencha os dados para gerar sua proposta</p>
        </div>

        <section className="section" style={{ maxWidth: '600px' }}>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label>💵 Valor do Empréstimo</label>
              <input
                type="number"
                name="valorEmprestimo"
                value={formData.valorEmprestimo}
                onChange={handleChange}
                placeholder="R$ 0,00"
                step="100"
                min="0"
                required
              />
              <small style={{ color: '#999' }}>Valor mínimo: R$ 1.000,00</small>
            </div>

            <div className="form-group">
              <label>⏰ Prazo de Pagamento</label>
              <select
                name="prazoPagamento"
                value={formData.prazoPagamento}
                onChange={handleChange}
                required
              >
                <option value="">Selecione o prazo</option>
                <option value="6">6 meses</option>
                <option value="12">12 meses</option>
                <option value="24">24 meses</option>
                <option value="36">36 meses</option>
                <option value="48">48 meses</option>
                <option value="60">60 meses</option>
              </select>
            </div>

            <div className="form-group">
              <label>💼 Renda Mensal</label>
              <input
                type="number"
                name="rendaMensal"
                value={formData.rendaMensal}
                onChange={handleChange}
                placeholder="R$ 0,00"
                step="100"
                min="0"
                required
              />
              <small style={{ color: '#999' }}>Sua renda mensal aproximada</small>
            </div>

            <button type="submit" className="btn btn-primary">
              📤 Gerar Proposta
            </button>
          </form>

          <div style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#f0f7ff',
            borderRadius: '8px',
            borderLeft: '4px solid #10B981'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#1F2937' }}>📋 Como Funciona:</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#666', fontSize: '14px' }}>
              <li>Preencha seus dados com precisão</li>
              <li>Sua proposta será gerada automaticamente</li>
              <li>Você terá a opção de contratar o empréstimo</li>
              <li>Será necessário fornecer dados bancários</li>
              <li>O seguro é obrigatório na contratação</li>
            </ul>
          </div>
        </section>
      </div>

      <SupportButton />
    </div>
  )
}

export default Simulacao
