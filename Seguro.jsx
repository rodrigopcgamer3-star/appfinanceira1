import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import SupportButton from '../components/SupportButton'
import pixService from '../utils/pixService'
import './Pages.css'

function Seguro({ user, onLogout }) {
  const [contratando, setContratando] = useState(false)
  const [pagando, setPagando] = useState(false)
  const [aceito, setAceito] = useState(false)
  const [copied, setCopied] = useState(false)
  const [pixGerado, setPixGerado] = useState(null)

  const VALOR = 199.00

  const handleContratar = (e) => {
    e.preventDefault()
    if (!aceito) {
      alert('Você deve aceitar os termos e condições')
      return
    }
    setContratando(true)
    
    // Gerar PIX
    const pix = pixService.generatePixCopyPaste(VALOR, 'Seguro Prestamista Alfa Financeira')
    setPixGerado(pix)
    
    setPagando(true)
  }

  const handleCopyPix = () => {
    if (pixGerado) {
      navigator.clipboard.writeText(pixGerado.pixCopyPaste).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }).catch(() => {
        alert('Erro ao copiar código')
      })
    }
  }

  const handleConfirmPagamento = () => {
    setPagando(false)
    alert('✅ Pagamento confirmado! Seu seguro estará ativo em breve.')
    setAceito(false)
    setPixGerado(null)
  }

  if (pagando && pixGerado) {
    return (
      <div className="page">
        <Navbar user={user} onLogout={onLogout} />
        <div className="page-container">
          <div className="success-message">
            <div className="success-icon">💳</div>
            <h1>Pagamento com Pix</h1>
            <p style={{ fontSize: '18px', marginBottom: '20px' }}>
              <strong>Valor: R$ {VALOR.toFixed(2)}</strong>
            </p>

            <div style={{
              backgroundColor: '#f0f7ff',
              padding: '30px',
              borderRadius: '12px',
              marginBottom: '30px',
              border: '2px solid #10B981'
            }}>
              <h3 style={{ marginBottom: '20px', color: "#0f3460" }}>
                📋 Pix Cópia e Cola:
              </h3>

              <div style={{
                backgroundColor: '#ffffff',
                padding: '15px',
                borderRadius: '8px',
                wordBreak: 'break-all',
                fontFamily: 'monospace',
                fontSize: '12px',
                marginBottom: '15px',
                border: '1px solid #10B981',
                color: '#333',
                maxHeight: '150px',
                overflowY: 'auto'
              }}>
                {pixGerado.pixCopyPaste}
              </div>

              <button
                onClick={handleCopyPix}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: "#10b981",
                  color: '#000',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {copied ? '✅ Código copiado!' : '📋 Copiar Código'}
              </button>

              <p style={{ fontSize: '13px', color: '#666', marginTop: '15px', textAlign: 'center' }}>
                Cole o código acima no seu App de Pix
              </p>
            </div>

            <div style={{
              backgroundColor: '#fff3cd',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '30px',
              borderLeft: '4px solid #ffc107'
            }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#856404' }}>
                <strong>ℹ️ Instruções:</strong><br/>
                1. Copie o código acima<br/>
                2. Abra seu App de banco<br/>
                3. Escolha opção "Pagar com Pix"<br/>
                4. Cole o código copiado<br/>
                5. Confirme o pagamento<br/>
                6. Seu seguro estará ativo imediatamente
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleConfirmPagamento}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: "#0f3460",
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                ✅ Já Paguei
              </button>
              <button
                onClick={() => setPagando(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#e0e0e0',
                  color: '#333',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                ← Voltar
              </button>
            </div>
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
        {/* AVISO OBRIGATÓRIO EM DESTAQUE */}
        <div style={{
          background: 'linear-gradient(135deg, #fff3cd 0%, #ffe8b6 100%)',
          border: '3px solid #ffc107',
          borderRadius: '12px',
          padding: '25px',
          marginBottom: '30px',
          boxShadow: '0 4px 12px rgba(255, 193, 7, 0.3)'
        }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '32px' }}>⚠️</div>
            <div>
              <h2 style={{ margin: '0 0 10px 0', color: '#856404', fontSize: '20px' }}>
                AVISO IMPORTANTE
              </h2>
              <p style={{ margin: 0, color: '#856404', fontSize: '15px', fontWeight: '600', lineHeight: '1.6' }}>
                O <strong>SEGURO PRESTAMISTA É OBRIGATÓRIO</strong> na sua contratação.<br/>
                Este seguro protege você e sua família em caso de imprevistos financeiros.
              </p>
            </div>
          </div>
        </div>

        <div className="page-header">
          <h1>🛡️ Seguro Prestamista</h1>
          <p>Proteção para você e sua família</p>
        </div>

        <section className="section">
          <h2>✨ Características do Seguro</h2>
          <div className="cards-grid">
            <div className="card">
              <h3>💪 Cobertura Completa</h3>
              <p>100% do saldo devedor do empréstimo</p>
            </div>
            <div className="card">
              <h3>⚡ Ativação Imediata</h3>
              <p>Válido desde o momento da aprovação</p>
            </div>
            <div className="card">
              <h3>💰 Taxa Única</h3>
              <p>R$ {VALOR.toFixed(2)} • Pagamento único</p>
            </div>
            <div className="card">
              <h3>📋 Sem Burocracia</h3>
              <p>Contratação rápida e simples</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>📋 O que o Seguro Cobre</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            <div className="coverage-item">
              <h4>👤 Morte Natural ou Acidental</h4>
              <p>Cobertura integral do saldo devedor em caso de falecimento</p>
            </div>
            <div className="coverage-item">
              <h4>🏥 Invalidez Permanente</h4>
              <p>Cobertura total se o segurado ficar permanentemente inválido</p>
            </div>
            <div className="coverage-item">
              <h4>🏠 Cobertura Durante Todo Período</h4>
              <p>Válido enquanto houver saldo devedor do empréstimo</p>
            </div>
            <div className="coverage-item">
              <h4>👨‍👩‍👧‍👦 Beneficiários</h4>
              <p>Proteção que se estende aos seus beneficiários designados</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Contratar Agora</h2>

          <div style={{
            backgroundColor: '#f0f7ff',
            padding: '25px',
            borderRadius: '8px',
            marginBottom: '25px',
            border: '2px solid #10B981',
            textAlign: 'center'
          }}>
            <h3 style={{ color: "#0f3460", marginBottom: '10px' }}>
              💰 Valor do Seguro
            </h3>
            <p style={{ fontSize: '32px', color: "#10b981", margin: 0, fontWeight: 'bold' }}>
              R$ {VALOR.toFixed(2)}
            </p>
            <p style={{ color: '#666', marginTop: '10px' }}>
              Pagamento único via Pix • Cobertura permanente
            </p>
          </div>

          <form onSubmit={handleContratar} className="form">
            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="termos"
                checked={aceito}
                onChange={(e) => setAceito(e.target.checked)}
              />
              <label htmlFor="termos">
                Declaro que li e aceito os termos e condições do Seguro Prestamista. Compreendo que este seguro é obrigatório para a contratação do empréstimo.
              </label>
            </div>

            <button
              type="submit"
              disabled={!aceito || contratando}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: aceito && !contratando ? "#10b981" : '#ccc',
                color: aceito && !contratando ? '#000' : '#999',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: aceito && !contratando ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s'
              }}
            >
              {contratando ? '⏳ Processando...' : '💳 Contratar Seguro (Pix)'}
            </button>
          </form>

          <div style={{
            marginTop: '25px',
            padding: '20px',
            backgroundColor: '#fff3cd',
            borderRadius: '8px',
            borderLeft: '4px solid #ffc107'
          }}>
            <p style={{ margin: 0, fontSize: '13px', color: '#856404' }}>
              <strong>ℹ️ Importante:</strong> Você só poderá continuar se aceitar os termos. 
              A contratação é rápida e segura.
            </p>
          </div>
        </section>

        <section className="section">
          <h2>❓ Dúvidas Frequentes</h2>
          <div style={{ display: 'grid', gap: '15px' }}>
            <div>
              <h4 style={{ color: "#0f3460", marginBottom: '8px' }}>
                Quando o seguro entra em vigor?
              </h4>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                O seguro entra em vigor assim que o pagamento é confirmado.
              </p>
            </div>
            <div>
              <h4 style={{ color: "#0f3460", marginBottom: '8px' }}>
                Qual é o valor máximo coberto?
              </h4>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                O valor coberto é o saldo devedor total do seu empréstimo.
              </p>
            </div>
            <div>
              <h4 style={{ color: "#0f3460", marginBottom: '8px' }}>
                Posso cancelar o seguro?
              </h4>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                Sim, você pode solicitar o cancelamento a qualquer momento entrando em contato conosco.
              </p>
            </div>
          </div>
        </section>
      </div>

      <SupportButton />
    </div>
  )
}

export default Seguro
