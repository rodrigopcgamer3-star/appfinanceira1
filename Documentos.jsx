import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SupportButton from '../components/SupportButton'
import dataService from '../utils/dataService'
import './Pages.css'

const IMGBB_API_KEY = '3b78f137442f57cbbc9971838a5fd0d1'

function Documentos({ user, onLogout }) {
  const navigate = useNavigate()
  const [documentos, setDocumentos] = useState({
    'rg-cnh': [],
    'comprovante-endereco': [],
    'comprovante-renda': []
  })
  const [uploadingType, setUploadingType] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const docs = dataService.getUserDocumentos(user.uid)
    const docsPorTipo = {
      'rg-cnh': docs.filter(d => d.tipo === 'rg-cnh'),
      'comprovante-endereco': docs.filter(d => d.tipo === 'comprovante-endereco'),
      'comprovante-renda': docs.filter(d => d.tipo === 'comprovante-renda')
    }
    setDocumentos(docsPorTipo)

    // Verificar se os 3 documentos foram enviados
    if (docsPorTipo['rg-cnh'].length > 0 && 
        docsPorTipo['comprovante-endereco'].length > 0 && 
        docsPorTipo['comprovante-renda'].length > 0) {
      
      setTimeout(() => {
        sessionStorage.setItem('documentosCompletos', 'true')
        navigate('/seguro')
      }, 2000)
    }
  }, [user, navigate])

  const handleUpload = async (e, tipo) => {
    const file = e.target.files?.[0]
    if (!file) return

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      setMessage('❌ Arquivo inválido. Use JPG, PNG ou PDF')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage('❌ Arquivo muito grande. Máximo 5MB')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    setUploadingType(tipo)
    setMessage('⏳ Enviando arquivo...')

    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('key', IMGBB_API_KEY)

      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        const novoDoc = {
          id: 'doc-' + Date.now(),
          tipo: tipo,
          nomeArquivo: file.name,
          tamanho: (file.size / 1024).toFixed(2),
          url: data.data.url,
          dataPupload: new Date().toLocaleDateString('pt-BR')
        }

        await dataService.saveDocumento(user.uid, tipo, novoDoc)

        setDocumentos(prev => ({
          ...prev,
          [tipo]: [...prev[tipo], novoDoc]
        }))

        setMessage(`✅ ${file.name} enviado com sucesso!`)
        
        // Verificar se todos os 3 documentos foram enviados
        const totalDocs = Object.values(documentos).flat().length + 1
        if (totalDocs === 3) {
          setMessage('✅ Todos os documentos enviados! Redirecionando...')
          setTimeout(() => {
            sessionStorage.setItem('documentosCompletos', 'true')
            navigate('/seguro')
          }, 2000)
        } else {
          setTimeout(() => setMessage(''), 3000)
        }

        e.target.value = ''
      } else {
        throw new Error('Erro no upload')
      }
    } catch (err) {
      setMessage('❌ Erro ao enviar arquivo. Tente novamente.')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setUploadingType(null)
    }
  }

  const handleDelete = (tipo, id) => {
    if (confirm('Deseja deletar este documento?')) {
      setDocumentos(prev => ({
        ...prev,
        [tipo]: prev[tipo].filter(d => d.id !== id)
      }))
      setMessage('✅ Documento deletado')
      setTimeout(() => setMessage(''), 2000)
    }
  }

  const DocumentWidget = ({ titulo, icone, tipo }) => (
    <section className="section">
      <h3>{icone} {titulo}</h3>

      <div className="upload-area">
        <input
          type="file"
          id={`file-${tipo}`}
          onChange={(e) => handleUpload(e, tipo)}
          accept="image/jpeg,image/png,application/pdf"
          hidden
        />
        <label htmlFor={`file-${tipo}`} className="upload-label">
          <div className="upload-icon">📤</div>
          <h4>Clique para fazer upload</h4>
          <p>ou arraste o arquivo aqui</p>
          <small>(JPG, PNG ou PDF - máx 5MB)</small>
        </label>
      </div>

      {documentos[tipo].length > 0 && (
        <div className="document-list">
          <h4>Documentos Enviados:</h4>
          {documentos[tipo].map(doc => (
            <div key={doc.id} className="document-item">
              <div className="document-info">
                <span className="document-name">📎 {doc.nomeArquivo}</span>
                <span className="document-meta">
                  {doc.tamanho} KB • {doc.dataPupload}
                </span>
              </div>
              <div className="document-actions">
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="btn btn-small">
                  👁️ Ver
                </a>
                <button
                  onClick={() => handleDelete(tipo, doc.id)}
                  className="btn btn-danger"
                >
                  🗑️ Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )

  return (
    <div className="page">
      <Navbar user={user} onLogout={onLogout} />

      <div className="page-container">
        <div className="page-header">
          <h1>📄 Documentos Pessoais</h1>
          <p>Envie os 3 documentos necessários para continuarmos</p>
        </div>

        {message && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '6px',
            marginBottom: '20px',
            backgroundColor: message.includes('✅') || message.includes('⏳') ? '#d4edda' : '#f8d7da',
            color: message.includes('✅') || message.includes('⏳') ? '#155724' : '#721c24',
            fontSize: '14px',
            borderLeft: '4px solid ' + (message.includes('✅') || message.includes('⏳') ? '#28a745' : '#dc3545')
          }}>
            {message}
          </div>
        )}

        {/* Indicador de Progresso */}
        <section className="section" style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '15px' }}>📊 Progresso</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '15px'
          }}>
            <div style={{
              padding: '15px',
              borderRadius: '8px',
              backgroundColor: documentos['rg-cnh'].length > 0 ? '#d4edda' : '#f9f9f9',
              borderLeft: '4px solid ' + (documentos['rg-cnh'].length > 0 ? '#28a745' : '#ccc'),
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🪪</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: "#0f3460" }}>
                RG/CNH
              </div>
              <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                {documentos['rg-cnh'].length > 0 ? '✅ Enviado' : '⏳ Pendente'}
              </div>
            </div>

            <div style={{
              padding: '15px',
              borderRadius: '8px',
              backgroundColor: documentos['comprovante-endereco'].length > 0 ? '#d4edda' : '#f9f9f9',
              borderLeft: '4px solid ' + (documentos['comprovante-endereco'].length > 0 ? '#28a745' : '#ccc'),
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏠</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: "#0f3460" }}>
                Comprovante de Endereço
              </div>
              <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                {documentos['comprovante-endereco'].length > 0 ? '✅ Enviado' : '⏳ Pendente'}
              </div>
            </div>

            <div style={{
              padding: '15px',
              borderRadius: '8px',
              backgroundColor: documentos['comprovante-renda'].length > 0 ? '#d4edda' : '#f9f9f9',
              borderLeft: '4px solid ' + (documentos['comprovante-renda'].length > 0 ? '#28a745' : '#ccc'),
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>💰</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: "#0f3460" }}>
                Comprovante de Renda
              </div>
              <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                {documentos['comprovante-renda'].length > 0 ? '✅ Enviado' : '⏳ Pendente'}
              </div>
            </div>
          </div>
        </section>

        <DocumentWidget
          titulo="RG ou CNH"
          icone="🪪"
          tipo="rg-cnh"
        />

        <DocumentWidget
          titulo="Comprovante de Endereço"
          icone="🏠"
          tipo="comprovante-endereco"
        />

        <DocumentWidget
          titulo="Comprovante de Renda"
          icone="💰"
          tipo="comprovante-renda"
        />

        <section className="section">
          <div style={{
            padding: '20px',
            backgroundColor: '#fff3cd',
            borderRadius: '8px',
            borderLeft: '4px solid #ffc107'
          }}>
            <p style={{ margin: 0, fontSize: '13px', color: '#856404' }}>
              <strong>ℹ️ Importante:</strong> Após enviar os 3 documentos, você será redirecionado para contratar o seguro obrigatório.
            </p>
          </div>
        </section>
      </div>

      <SupportButton />
    </div>
  )
}

export default Documentos
