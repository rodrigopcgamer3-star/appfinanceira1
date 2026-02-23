import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SupportButton from '../components/SupportButton'
import './Pages.css'

function Contratos({ user, onLogout }) {
  const navigate = useNavigate()
  const [simulacao, setSimulacao] = useState(null)
  const [showFormulario, setShowFormulario] = useState(false)
  const [formBancario, setFormBancario] = useState({
    banco: '',
    agencia: '',
    conta: '',
    tipoConta: 'corrente'
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Carregar simulação salva
    const simulacoes = JSON.parse(localStorage.getItem('simulacoes') || '[]')
    const userSimulacoes = simulacoes.filter(s => s.usuarioId === user.uid)
    
    if (userSimulacoes.length > 0) {
      // Pegar a mais recente
      const simMaisRecente = userSimulacoes[userSimulacoes.length - 1]
      setSimulacao(simMaisRecente)
    }
  }, [user])

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormBancario(prev => ({ ...prev, [name]: value }))
    
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

    if (!formBancario.banco) newErrors.banco = 'Selecione um banco'
    if (!formBancario.agencia) newErrors.agencia = 'Preencha a agência'
    if (!formBancario.conta) newErrors.conta = 'Preencha a conta'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleReceberProposta = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      // Salvar dados bancários
      const contasBancarias = JSON.parse(localStorage.getItem(`contasBancarias-${user.uid}`) || '[]')
      contasBancarias.push({
        ...formBancario,
        dataSalvamento: new Date().toISOString()
      })
      localStorage.setItem(`contasBancarias-${user.uid}`, JSON.stringify(contasBancarias))

      // Salvar que recebeu proposta
      localStorage.setItem(`proposta-recebida-${user.uid}`, 'true')

      // Redirecionar para Seguro com flag
      sessionStorage.setItem('propostaRecebida', 'true')
      navigate('/seguro')
    } catch (err) {
      setErrors({ submit: 'Erro ao processar proposta' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <Navbar user={user} onLogout={onLogout} />

      <div className="page-container">
        <div className="page-header">
          <h1>📋 Proposta de Empréstimo</h1>
          <p>Finalize sua proposta e receba o crédito</p>
        </div>

        {/* Widget de Contratação de Proposta */}
        {simulacao ? (
          <section className="section">
            <h2>💰 Proposta Disponível</h2>
            
            <div style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(26, 42, 74, 0.1) 100%)',
              border: '2px solid #10B981',
              borderRadius: '12px',
              padding: '30px',
              marginBottom: '30px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '25px',
                marginBottom: '30px'
              }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#999', fontWeight: '600', textTransform: 'uppercase' }}>
                    Nome Completo
                  </span>
                  <p style={{ margin: '8px 0 0 0', fontSize: '16px', color: "#0f3460", fontWeight: '600' }}>
                    {simulacao.nome}
                  </p>
                </div>

                <div>
                  <span style={{ fontSize: '12px', color: '#999', fontWeight: '600', textTransform: 'uppercase' }}>
                    CPF
                  </span>
                  <p style={{ margin: '8px 0 0 0', fontSize: '16px', color: "#0f3460", fontWeight: '600' }}>
                    {simulacao.cpf}
                  </p>
                </div>

                <div>
                  <span style={{ fontSize: '12px', color: '#999', fontWeight: '600', textTransform: 'uppercase' }}>
                    Valor do Empréstimo
                  </span>
                  <p style={{ margin: '8px 0 0 0', fontSize: '16px', color: "#10b981", fontWeight: '700' }}>
                    R$ {simulacao.valorEmprestimo.toFixed(2)}
                  </p>
                </div>

                <div>
                  <span style={{ fontSize: '12px', color: '#999', fontWeight: '600', textTransform: 'uppercase' }}>
                    Prazo
                  </span>
                  <p style={{ margin: '8px 0 0 0', fontSize: '16px', color: "#0f3460", fontWeight: '600' }}>
                    {simulacao.prazoMeses} meses
                  </p>
                </div>

                <div>
                  <span style={{ fontSize: '12px', color: '#999', fontWeight: '600', textTransform: 'uppercase' }}>
                    Renda Mensal
                  </span>
                  <p style={{ margin: '8px 0 0 0', fontSize: '16px', color: "#0f3460", fontWeight: '600' }}>
                    R$ {simulacao.rendaMensal.toFixed(2)}
                  </p>
                </div>

                <div>
                  <span style={{ fontSize: '12px', color: '#999', fontWeight: '600', textTransform: 'uppercase' }}>
                    Status
                  </span>
                  <p style={{ margin: '8px 0 0 0', fontSize: '16px', color: '#28a745', fontWeight: '700' }}>
                    ✅ Aprovada
                  </p>
                </div>
              </div>

              {!showFormulario ? (
                <button
                  onClick={() => setShowFormulario(true)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: "#10b981",
                    color: '#000',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '15px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  📋 Contratar Proposta
                </button>
              ) : (
                <form onSubmit={handleReceberProposta} style={{ marginTop: '20px' }}>
                  <h3 style={{ margin: '0 0 20px 0', color: "#0f3460" }}>
                    📊 Dados Bancários para Recebimento
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                    <div className="form-group">
                      <label>Banco</label>
                      <select
                        name="banco"
                        value={formBancario.banco}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="">Selecione seu banco</option>
                        <option value="001">Banco do Brasil</option>
                        <option value="033">Santander</option>
                        <option value="104">Caixa Econômica</option>
                        <option value="341">Itaú</option>
                        <option value="389">Banco Mercantil</option>
                        <option value="033">Bradesco</option>
                      </select>
                      {errors.banco && <span className="field-error">{errors.banco}</span>}
                    </div>

                    <div className="form-group">
                      <label>Agência</label>
                      <input
                        type="text"
                        name="agencia"
                        value={formBancario.agencia}
                        onChange={handleFormChange}
                        placeholder="0000"
                        maxLength="5"
                        required
                      />
                      {errors.agencia && <span className="field-error">{errors.agencia}</span>}
                    </div>

                    <div className="form-group">
                      <label>Número da Conta</label>
                      <input
                        type="text"
                        name="conta"
                        value={formBancario.conta}
                        onChange={handleFormChange}
                        placeholder="00000-0"
                        required
                      />
                      {errors.conta && <span className="field-error">{errors.conta}</span>}
                    </div>

                    <div className="form-group">
                      <label>Tipo de Conta</label>
                      <select
                        name="tipoConta"
                        value={formBancario.tipoConta}
                        onChange={handleFormChange}
                      >
                        <option value="corrente">Corrente</option>
                        <option value="poupanca">Poupança</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group checkbox">
                    <input type="checkbox" id="termos" required />
                    <label htmlFor="termos">
                      Declaro que os dados bancários estão corretos e aceito os termos da contratação
                    </label>
                  </div>

                  {errors.submit && <div className="error-message">{errors.submit}</div>}

                  <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        flex: 1,
                        padding: '12px',
                        backgroundColor: "#0f3460",
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.6 : 1
                      }}
                    >
                      {loading ? '⏳ Processando...' : '✅ Receber Proposta'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowFormulario(false)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        backgroundColor: '#e0e0e0',
                        color: '#333',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      ❌ Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>
        ) : (
          <section className="section">
            <div style={{
              padding: '40px 20px',
              textAlign: 'center',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px'
            }}>
              <p style={{ color: '#999', fontSize: '15px', margin: 0 }}>
                📊 Nenhuma proposta disponível no momento<br/>
                <small>Complete a simulação primeiro para receber uma proposta</small>
              </p>
            </div>
          </section>
        )}
      </div>

      <SupportButton />
    </div>
  )
}

export default Contratos
