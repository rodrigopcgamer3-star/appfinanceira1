import React from 'react'

function SupportButton() {
  const whatsappNumber = '5527996135985'
  const message = encodeURIComponent('Olá! Gostaria de suporte com minha conta na Alfa Financeira.')

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        backgroundColor: '#25D366',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '30px',
        boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
        transition: 'all 0.3s',
        zIndex: 999,
        textDecoration: 'none',
        color: 'white'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.1)'
        e.target.style.boxShadow = '0 6px 16px rgba(37, 211, 102, 0.5)'
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)'
        e.target.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)'
      }}
      title="Suporte via WhatsApp"
    >
      💬
    </a>
  )
}

export default SupportButton
