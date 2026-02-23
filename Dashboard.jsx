import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import SupportButton from '../components/SupportButton'
import validationService from '../utils/validationService'
import authService from '../utils/authService'
import './Pages.css'

function Dashboard({ user, onLogout }) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [usuarios, setUsuarios] = useState([])
  const [usuarioAtual, setUsuarioAtual] = useState(null)
  const [editData, setEditData] = useState({
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    telefone: ''
  })
  const [errors, setErrors] = useState({})
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    // Carregar usuários
    const usuariosList = JSON.parse(localStorage.getItem('usuarios') || '[]')
    setUsuarios(usuariosList)

    // Encontrar usuário atual
    const userAtual = usuariosList.find(u => u.uid === user.uid)
    setUsuarioAtual(userAtual)

    if (userAtual && userAtual.dados) {
      setEditData(userAtual.dados)
    }
  }, [user])

  const handleEditChange = (e) => {
    const { name, value } = e.target
    let maskedValue = value

    if (name === 'cep') {
      maskedValue = validationService.maskCEP(value)
    } else if (name === 'telefone') {
      maskedValue = validationService.maskPhone(value)
    }

    setEditData(prev => ({ ...prev, [name]: maskedValue }))

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateEditData = () => {
    const newErrors = {}

    if (editData.cep && !validationService.isValidCEP(editData.cep)) {
      newErrors.cep = 'CEP inválido'
    }

    if (editData.telefone && !validationService.isValidPhone(editData.telefone)) {
      newErrors.telefone = 'Telefone inválido'
    }

    if (!editData.endereco && !editData.cidade) {
      newErrors.endereco = 'Preencha pelo menos o endereço'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveData = async () => {
    if (!validateEditData()) return

    try {
      await authService.updateUserData(user.uid, editData)
      
      // Atualizar lista local
      const usuariosList = JSON.parse(localStorage.getItem('usuarios') || '[]')
      const userAtual = usuariosList.find(u => u.uid === user.uid)
      if (userAtual) {
        userAtual.dados = editData
        setUsuarioAtual(userAtual)
      }

      setSaveMessage('✅ Dados atualizados com sucesso!')
      setTimeout(() => {
        setSaveMessage('')
        setShowEditModal(false)
      }, 2000)
    } catch (err) {
      setSaveMessage('❌ Erro ao salvar dados')
    }
  }

  return (
    <div className="page">
      <Navbar user={user} onLogout={onLogout} />

      <div className="page-container">
        <div className="page-header">
          <h1>📊 Dashboard</h1>
          <p>Bem-vindo, {usuarioAtual?.nome}!</p>
        </div>

        {/* Informações Pessoais */}
        <section className="section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>👤 Informações Pessoais</h2>
            <button onClick={() => setShowEditModal(true)} className="btn btn-edit">
              ✏️ Editar
            </button>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Nome</span>
              <span className="info-value">{usuarioAtual?.nome}</span>
            </div>
            <div className="info-item">
              <span className="info-label">CPF</span>
              <span className="info-value">
                {usuarioAtual?.cpf ? validationService.maskCPFPartial(usuarioAtual.cpf) : '-'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{usuarioAtual?.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Telefone</span>
              <span className="info-value">{usuarioAtual?.telefone || '-'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Endereço</span>
              <span className="info-value">{usuarioAtual?.dados?.endereco || '-'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Cidade</span>
              <span className="info-value">{usuarioAtual?.dados?.cidade || '-'}</span>
            </div>
          </div>
        </section>

        {/* Cards de Resumo */}
        <section className="section">
          <h2>📊 Resumo da Conta</h2>
          <div className="summary-cards">
            <div className="summary-card">
              <div className="card-icon">💳</div>
              <h3>Empréstimos</h3>
              <p className="card-value">0</p>
            </div>
            <div className="summary-card">
              <div className="card-icon">📄</div>
              <h3>Documentos</h3>
              <p className="card-value">0</p>
            </div>
            <div className="summary-card">
              <div className="card-icon">✅</div>
              <h3>Contratos</h3>
              <p className="card-value">0</p>
            </div>
            <div className="summary-card">
              <div className="card-icon">🛡️</div>
              <h3>Seguro</h3>
              <p className="card-value">-</p>
            </div>
          </div>
        </section>
      </div>

      {/* Modal de Edição */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h2>Editar Dados</h2>
              <button onClick={() => setShowEditModal(false)} className="modal-close">✕</button>
            </div>

            <form className="modal-form">
              <div className="form-group">
                <label>Endereço</label>
                <input
                  type="text"
                  name="endereco"
                  value={editData.endereco}
                  onChange={handleEditChange}
                  placeholder="Rua, Av., etc"
                />
                {errors.endereco && <span className="field-error">{errors.endereco}</span>}
              </div>

              <div className="form-group">
                <label>Cidade</label>
                <input
                  type="text"
                  name="cidade"
                  value={editData.cidade}
                  onChange={handleEditChange}
                  placeholder="Sua cidade"
                />
              </div>

              <div className="form-group">
                <label>Estado</label>
                <input
                  type="text"
                  name="estado"
                  value={editData.estado}
                  onChange={handleEditChange}
                  placeholder="SP, RJ, etc"
                  maxLength="2"
                />
              </div>

              <div className="form-group">
                <label>CEP</label>
                <input
                  type="text"
                  name="cep"
                  value={editData.cep}
                  onChange={handleEditChange}
                  placeholder="00000-000"
                  maxLength="9"
                />
                {errors.cep && <span className="field-error">{errors.cep}</span>}
              </div>

              <div className="form-group">
                <label>Telefone</label>
                <input
                  type="text"
                  name="telefone"
                  value={editData.telefone}
                  onChange={handleEditChange}
                  placeholder="(00) 99999-9999"
                  maxLength="15"
                />
                {errors.telefone && <span className="field-error">{errors.telefone}</span>}
              </div>

              {saveMessage && (
                <div style={{
                  padding: '12px',
                  borderRadius: '6px',
                  backgroundColor: saveMessage.includes('✅') ? '#d4edda' : '#f8d7da',
                  color: saveMessage.includes('✅') ? '#155724' : '#721c24',
                  fontSize: '14px'
                }}>
                  {saveMessage}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={handleSaveData} className="btn btn-primary">
                  💾 Salvar
                </button>
                <button type="button" onClick={() => setShowEditModal(false)} className="btn btn-secondary">
                  ❌ Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <SupportButton />
    </div>
  )
}

export default Dashboard
