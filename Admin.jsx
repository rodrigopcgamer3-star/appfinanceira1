import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Pages.css'

function Admin() {
  const navigate = useNavigate()
  const [autenticado, setAutenticado] = useState(false)
  const [chave, setChave] = useState('')
  const [erroChave, setErroChave] = useState('')
  
  const [usuarios, setUsuarios] = useState([])
  const [simulacoes, setSimulacoes] = useState([])
  const [abaSelecionada, setAbaSelecionada] = useState('usuarios')
  const [filtro, setFiltro] = useState('')

  const CHAVE_ADMIN = 'ALFA_ADMIN_2024_SECRET_MASTER'

  const handleLoginAdmin = (e) => {
    e.preventDefault()
    
    if (chave === CHAVE_ADMIN) {
      setAutenticado(true)
      setErroChave('')
      carregarDados()
    } else {
      setErroChave('❌ Chave de administrador inválida')
      setChave('')
    }
  }

  const carregarDados = () => {
    // Carregar usuários
    const usuariosList = JSON.parse(localStorage.getItem('usuarios') || '[]')
    setUsuarios(usuariosList)

    // Carregar simulações
    const simulacoesList = JSON.parse(localStorage.getItem('simulacoes') || '[]')
    setSimulacoes(simulacoesList)
  }

  const exportarCSV = (tipo) => {
    let csv = ''
    let filename = ''

    if (tipo === 'usuarios') {
      csv = 'ID,Nome,Email,CPF,Telefone,Data Criação\n'
      usuarios.forEach(u => {
        csv += `"${u.uid}","${u.nome}","${u.email}","${u.cpf}","${u.telefone}","${new Date(u.dataCriacao).toLocaleDateString('pt-BR')}"\n`
      })
      filename = 'usuarios-' + new Date().toISOString().split('T')[0] + '.csv'
    } else if (tipo === 'simulacoes') {
      csv = 'ID,Data,Nome,CPF,Valor Empréstimo,Prazo (meses),Renda Mensal,Email Cliente,Status\n'
      simulacoes.forEach(s => {
        csv += `"${s.id}","${new Date(s.dataSolicitacao).toLocaleDateString('pt-BR')}","${s.nome}","${s.cpf}","${s.valorEmprestimo.toFixed(2)}","${s.prazoMeses}","${s.rendaMensal.toFixed(2)}","${s.usuarioEmail}","${s.status}"\n`
      })
      filename = 'simulacoes-' + new Date().toISOString().split('T')[0] + '.csv'
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
  }

  const usuariosFiltrados = usuarios.filter(u =>
    u.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    u.email.toLowerCase().includes(filtro.toLowerCase()) ||
    u.cpf.includes(filtro)
  )

  const simulacoesFiltradas = simulacoes.filter(s =>
    s.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    s.usuarioEmail.toLowerCase().includes(filtro.toLowerCase()) ||
    s.cpf.includes(filtro)
  )

  if (!autenticado) {
    return (
      <div className="page">
        <div className="page-container" style={{ marginTop: '100px' }}>
          <div style={{
            maxWidth: '400px',
            margin: '0 auto',
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>🔐</div>
              <h1 style={{ margin: '0 0 5px 0', color: "#0f3460" }}>
                Painel Administrativo
              </h1>
              <p style={{ margin: 0, color: '#999', fontSize: '13px' }}>
                Acesso exclusivo para gerentes
              </p>
            </div>

            <form onSubmit={handleLoginAdmin} className="form">
              <div className="form-group">
                <label>🔑 Chave de Acesso</label>
                <input
                  type="password"
                  value={chave}
                  onChange={(e) => setChave(e.target.value)}
                  placeholder="Digite a chave de administrador"
                  required
                />
              </div>

              {erroChave && (
                <div style={{
                  background: '#f8d7da',
                  color: '#721c24',
                  padding: '12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  marginBottom: '15px',
                  borderLeft: '4px solid #dc3545'
                }}>
                  {erroChave}
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                ✅ Acessar Painel
              </button>
            </form>

            <div style={{
              marginTop: '25px',
              padding: '15px',
              background: '#f0f7ff',
              borderRadius: '8px',
              borderLeft: '4px solid #10B981',
              fontSize: '12px',
              color: '#666'
            }}>
              <strong>ℹ️ Aviso:</strong> Este é um painel de acesso restrito. 
              Apenas gerentes autorizados devem acessar.
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div style={{
        background: 'linear-gradient(135deg, #1F2937 0%, #2a3a5a 100%)',
        color: 'white',
        padding: '20px',
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ margin: '0 0 5px 0', fontSize: '28px' }}>
            🔐 Painel Administrativo
          </h1>
          <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>
            Gerenciamento de usuários e simulações
          </p>
        </div>
        <button
          onClick={() => {
            setAutenticado(false)
            navigate('/')
          }}
          style={{
            padding: '10px 20px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Sair
        </button>
      </div>

      <div className="page-container">
        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px',
          borderBottom: '2px solid #e0e0e0',
          paddingBottom: '10px'
        }}>
          <button
            onClick={() => setAbaSelecionada('usuarios')}
            style={{
              padding: '10px 20px',
              background: abaSelecionada === 'usuarios' ? "#10b981" : 'transparent',
              color: abaSelecionada === 'usuarios' ? '#000' : '#666',
              border: 'none',
              borderRadius: '6px 6px 0 0',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            👥 Usuários ({usuarios.length})
          </button>
          <button
            onClick={() => setAbaSelecionada('simulacoes')}
            style={{
              padding: '10px 20px',
              background: abaSelecionada === 'simulacoes' ? "#10b981" : 'transparent',
              color: abaSelecionada === 'simulacoes' ? '#000' : '#666',
              border: 'none',
              borderRadius: '6px 6px 0 0',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            💰 Simulações ({simulacoes.length})
          </button>
        </div>

        {/* Filtro */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="🔍 Pesquisar por nome, email ou CPF..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '2px solid #10B981',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
        </div>

        {/* ABA: USUÁRIOS */}
        {abaSelecionada === 'usuarios' && (
          <section className="section">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2>Usuários Cadastrados</h2>
              <button
                onClick={() => exportarCSV('usuarios')}
                style={{
                  padding: '8px 16px',
                  background: "#10b981",
                  color: '#000',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}
              >
                📥 Exportar CSV
              </button>
            </div>

            {usuariosFiltrados.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '13px'
                }}>
                  <thead>
                    <tr style={{ background: '#f9f9f9', borderBottom: '2px solid #e0e0e0' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Nome</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Email</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>CPF</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Telefone</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Data Cadastro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuariosFiltrados.map((usuario, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '12px' }}>{usuario.nome}</td>
                        <td style={{ padding: '12px' }}>{usuario.email}</td>
                        <td style={{ padding: '12px', fontFamily: 'monospace' }}>{usuario.cpf}</td>
                        <td style={{ padding: '12px' }}>{usuario.telefone || '-'}</td>
                        <td style={{ padding: '12px' }}>
                          {new Date(usuario.dataCriacao).toLocaleDateString('pt-BR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: '#999', padding: '30px' }}>
                Nenhum usuário encontrado
              </p>
            )}
          </section>
        )}

        {/* ABA: SIMULAÇÕES */}
        {abaSelecionada === 'simulacoes' && (
          <section className="section">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2>Simulações Cadastradas</h2>
              <button
                onClick={() => exportarCSV('simulacoes')}
                style={{
                  padding: '8px 16px',
                  background: "#10b981",
                  color: '#000',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}
              >
                📥 Exportar CSV
              </button>
            </div>

            {simulacoesFiltradas.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '13px'
                }}>
                  <thead>
                    <tr style={{ background: '#f9f9f9', borderBottom: '2px solid #e0e0e0' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Data</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Nome</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>CPF</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Valor</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Prazo</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Renda</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Email</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {simulacoesFiltradas.map((sim, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '12px' }}>
                          {new Date(sim.dataSolicitacao).toLocaleDateString('pt-BR')}
                        </td>
                        <td style={{ padding: '12px' }}>{sim.nome}</td>
                        <td style={{ padding: '12px', fontFamily: 'monospace' }}>{sim.cpf}</td>
                        <td style={{ padding: '12px' }}>
                          R$ {sim.valorEmprestimo.toFixed(2)}
                        </td>
                        <td style={{ padding: '12px' }}>{sim.prazoMeses}m</td>
                        <td style={{ padding: '12px' }}>
                          R$ {sim.rendaMensal.toFixed(2)}
                        </td>
                        <td style={{ padding: '12px', fontSize: '12px' }}>
                          {sim.usuarioEmail}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            background: '#d4edda',
                            color: '#155724',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}>
                            {sim.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: '#999', padding: '30px' }}>
                Nenhuma simulação encontrada
              </p>
            )}
          </section>
        )}

        {/* Resumo */}
        <section className="section" style={{ marginTop: '30px' }}>
          <h2>📊 Resumo Geral</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #10B981 0%, #c59a1a 100%)',
              color: '#000',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                {usuarios.length}
              </div>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>
                Total de Usuários
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              color: 'white',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                {simulacoes.length}
              </div>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>
                Total de Simulações
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
              color: 'white',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                R$ {simulacoes.reduce((sum, s) => sum + s.valorEmprestimo, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>
                Valor Total em Simulações
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Admin
