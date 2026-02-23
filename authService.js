/**
 * Serviço de Autenticação
 * Login + Cadastro + Validações
 */

import validationService from './validationService'

const authService = {
  // Registrar novo usuário com validações
  register: (email, password, confirmPassword, nome, cpf, telefone) => {
    return new Promise((resolve, reject) => {
      try {
        // Validações básicas
        if (!email || !password || !nome || !cpf) {
          reject(new Error('Todos os campos são obrigatórios'))
          return
        }

        // Validar senha
        if (password !== confirmPassword) {
          reject(new Error('As senhas não conferem'))
          return
        }

        if (password.length < 8) {
          reject(new Error('Senha deve ter no mínimo 8 caracteres'))
          return
        }

        // Validar email
        if (!validationService.isValidEmail(email)) {
          reject(new Error('Email inválido'))
          return
        }

        // Validar CPF
        if (!validationService.isValidCPF(cpf)) {
          reject(new Error('CPF inválido'))
          return
        }

        // Validar nome
        if (nome.length < 5) {
          reject(new Error('Nome deve ter no mínimo 5 caracteres'))
          return
        }

        // Validar telefone (se preenchido)
        if (telefone && !validationService.isValidPhone(telefone)) {
          reject(new Error('Telefone inválido'))
          return
        }

        // Buscar usuários existentes
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')

        // Verificar se email já existe
        const emailExists = usuarios.some(u => u.email === email)
        if (emailExists) {
          reject(new Error('Email já cadastrado'))
          return
        }

        // Verificar se CPF já existe
        const cpfClean = cpf.replace(/\D/g, '')
        const cpfExists = usuarios.some(u => {
          const userCpfClean = u.cpf.replace(/\D/g, '')
          return userCpfClean === cpfClean
        })
        if (cpfExists) {
          reject(new Error('CPF já cadastrado'))
          return
        }

        // Criar novo usuário
        const novoUsuario = {
          uid: 'user-' + Date.now(),
          email: email,
          password: password, // Em produção usar hash bcrypt
          nome: nome,
          cpf: cpfClean,
          telefone: telefone || '',
          dataCriacao: new Date().toISOString(),
          dados: {
            endereco: '',
            cidade: '',
            estado: '',
            cep: ''
          }
        }

        // Salvar no localStorage
        usuarios.push(novoUsuario)
        localStorage.setItem('usuarios', JSON.stringify(usuarios))

        // Auto-login após registro
        const user = {
          uid: novoUsuario.uid,
          email: novoUsuario.email,
          nome: novoUsuario.nome,
          cpf: novoUsuario.cpf
        }
        localStorage.setItem('currentUser', JSON.stringify(user))

        console.log('✅ Usuário registrado com sucesso:', email)
        resolve(user)
      } catch (error) {
        console.error('❌ Erro ao registrar:', error)
        reject(error)
      }
    })
  },

  // Fazer login
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      try {
        if (!email || !password) {
          reject(new Error('Email e senha são obrigatórios'))
          return
        }

        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
        const usuario = usuarios.find(u => u.email === email && u.password === password)

        if (!usuario) {
          reject(new Error('Email ou senha incorretos'))
          return
        }

        // Criar sessão
        const user = {
          uid: usuario.uid,
          email: usuario.email,
          nome: usuario.nome,
          cpf: usuario.cpf,
          telefone: usuario.telefone
        }
        localStorage.setItem('currentUser', JSON.stringify(user))

        console.log('✅ Login realizado com sucesso:', email)
        resolve(user)
      } catch (error) {
        console.error('❌ Erro ao fazer login:', error)
        reject(error)
      }
    })
  },

  // Fazer logout
  logout: () => {
    return new Promise((resolve) => {
      try {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('clienteData')
        localStorage.removeItem('contratos')
        localStorage.removeItem('assinados')
        localStorage.removeItem('documentos')
        sessionStorage.removeItem('simulacaoEnviada')
        console.log('✅ Logout realizado com sucesso')
        resolve()
      } catch (error) {
        console.error('❌ Erro ao fazer logout:', error)
        resolve()
      }
    })
  },

  // Obter usuário atual
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('currentUser')
      return user ? JSON.parse(user) : null
    } catch (error) {
      console.error('❌ Erro ao obter usuário atual:', error)
      return null
    }
  },

  // Atualizar dados do usuário
  updateUserData: (uid, novosDados) => {
    return new Promise((resolve, reject) => {
      try {
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
        const usuario = usuarios.find(u => u.uid === uid)

        if (!usuario) {
          reject(new Error('Usuário não encontrado'))
          return
        }

        // Atualizar dados
        usuario.dados = { ...usuario.dados, ...novosDados }

        // Salvar
        localStorage.setItem('usuarios', JSON.stringify(usuarios))

        // Atualizar sessão se for o usuário atual
        const currentUser = authService.getCurrentUser()
        if (currentUser && currentUser.uid === uid) {
          currentUser.dados = usuario.dados
          localStorage.setItem('currentUser', JSON.stringify(currentUser))
        }

        console.log('✅ Dados atualizados:', novosDados)
        resolve(usuario.dados)
      } catch (error) {
        console.error('❌ Erro ao atualizar dados:', error)
        reject(error)
      }
    })
  },

  // Verificar se está logado
  isAuthenticated: () => {
    return !!authService.getCurrentUser()
  }
}

export default authService
