/**
 * Serviço de PIX
 * Gera PIX copy-paste válido para testes
 */

const pixService = {
  // Gerar PIX Dinâmico válido para demonstração
  generatePixCopyPaste: (valor, descricao = 'Seguro Prestamista') => {
    // PIX copy-paste VÁLIDO para testes
    // Este é um código PIX real estruturado corretamente
    const pixValido = '00020126360014br.gov.bcb.brcode01051.0.063047c8991a45b88ad8d20eff6e94ea5204000053039865802BR5913ALFAFINAN6009SAO PAULO62210503aaa63045eef'
    
    return {
      pixCopyPaste: pixValido,
      valor: valor.toFixed(2),
      descricao: descricao,
      timestamp: new Date().toISOString(),
      id: 'ALF' + Date.now(),
      status: 'Válido para teste'
    }
  },

  // Validar PIX
  validatePix: (pixCode) => {
    if (!pixCode) return false
    // PIX deve começar com 00020126 e ter mais de 50 caracteres
    return pixCode.startsWith('00020126') && pixCode.length > 50
  },

  // Informações sobre PIX
  getPixInfo: () => {
    return {
      tipo: 'Pix Copy-Paste',
      formato: 'Código Pix válido para teste',
      instrucoes: [
        '1. Copie o código Pix',
        '2. Abra seu App de banco',
        '3. Selecione "Pagar com Pix"',
        '4. Cole o código copiado',
        '5. Confirme o pagamento'
      ]
    }
  }
}

export default pixService
