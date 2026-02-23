/**
 * Serviço de Validação
 * CPF, Email, Telefone, Campos e Dados
 */

const validationService = {
  // Validar CPF
  isValidCPF: (cpf) => {
    if (!cpf) return false
    
    // Remover caracteres especiais
    cpf = cpf.replace(/\D/g, '')
    
    // Validar tamanho
    if (cpf.length !== 11) return false
    
    // Validar se não é sequência repetida
    if (/^(\d)\1{10}$/.test(cpf)) return false
    
    // Validar primeiro dígito
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf[i]) * (10 - i)
    }
    let firstDigit = 11 - (sum % 11)
    if (firstDigit >= 10) firstDigit = 0
    if (parseInt(cpf[9]) !== firstDigit) return false
    
    // Validar segundo dígito
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf[i]) * (11 - i)
    }
    let secondDigit = 11 - (sum % 11)
    if (secondDigit >= 10) secondDigit = 0
    if (parseInt(cpf[10]) !== secondDigit) return false
    
    return true
  },

  // Validar Email
  isValidEmail: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  },

  // Validar Senha (mín 8 caracteres, 1 maiúscula, 1 número)
  isValidPassword: (password) => {
    if (password.length < 8) return false
    if (!/[A-Z]/.test(password)) return false
    if (!/[0-9]/.test(password)) return false
    return true
  },

  // Validar Telefone - 11 DÍGITOS TOTAL (DDD 2 + número 9)
  isValidPhone: (phone) => {
    if (!phone) return false
    // Remove TUDO que não é número
    const phoneClean = phone.replace(/\D/g, '')
    // Validar: exatamente 11 dígitos
    return phoneClean.length === 11
  },

  // Validar CEP
  isValidCEP: (cep) => {
    const regex = /^\d{5}-?\d{3}$/
    return regex.test(cep)
  },

  // Mascarar CPF
  maskCPF: (cpf) => {
    if (!cpf) return ''
    cpf = cpf.replace(/\D/g, '')
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  },

  // Mascarar CPF (6 primeiros dígitos)
  maskCPFPartial: (cpf) => {
    const masked = validationService.maskCPF(cpf)
    return masked.replace(/^(\d{3}\.\d{3})/, '***.$2')
  },

  // Mascarar Telefone - FORMATO: (XX) 9XXXX-XXXX
  maskPhone: (phone) => {
    if (!phone) return ''
    const phoneClean = phone.replace(/\D/g, '')
    
    // Formatar de acordo com a quantidade de números
    if (phoneClean.length <= 2) {
      return phoneClean
    }
    if (phoneClean.length <= 7) {
      return `(${phoneClean.slice(0, 2)}) ${phoneClean.slice(2)}`
    }
    // Formato final: (XX) 9XXXX-XXXX
    return `(${phoneClean.slice(0, 2)}) ${phoneClean.slice(2, 7)}-${phoneClean.slice(7, 11)}`
  },

  // Mascarar CEP
  maskCEP: (cep) => {
    cep = cep.replace(/\D/g, '')
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2')
  },

  // Formatar Moeda
  formatCurrency: (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  },

  // Validar força de senha
  getPasswordStrength: (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++
    
    return ['Muito Fraca', 'Fraca', 'Regular', 'Forte', 'Muito Forte'][strength]
  }
}

export default validationService
