/**
 * Serviço de Dados
 * Salva simulações para análise do proprietário
 * Dados salvos localmente (em produção usar backend)
 */

const dataService = {
  // Salvar simulação
  saveSimulacao: (usuario, simulacaoData) => {
    return new Promise((resolve, reject) => {
      try {
        // Estruturar dados
        const simulacao = {
          id: 'sim-' + Date.now(),
          usuarioId: usuario.uid,
          usuarioEmail: usuario.email,
          usuarioCPF: usuario.cpf,
          usuarioNome: usuario.nome,
          nome: simulacaoData.nome || usuario.nome,
          cpf: simulacaoData.cpf || usuario.cpf,
          valorEmprestimo: parseFloat(simulacaoData.valorEmprestimo) || 0,
          prazoMeses: parseInt(simulacaoData.prazoPagamento) || 12,
          rendaMensal: parseFloat(simulacaoData.rendaMensal) || 0,
          dataSolicitacao: new Date().toISOString(),
          status: 'Em análise'
        }

        // Buscar simulações existentes
        const simulacoes = JSON.parse(localStorage.getItem('simulacoes') || '[]')

        // Adicionar nova simulação
        simulacoes.push(simulacao)

        // Salvar
        localStorage.setItem('simulacoes', JSON.stringify(simulacoes))

        console.log('✅ Simulação salva:', simulacao)
        resolve(simulacao)
      } catch (error) {
        console.error('❌ Erro ao salvar simulação:', error)
        reject(error)
      }
    })
  },

  // Obter todas as simulações (apenas para proprietário)
  getAllSimulacoes: (proprietarioKey) => {
    try {
      // Chave secreta para acessar os dados
      if (proprietarioKey !== 'ALFA_ADM_2024_SECRET') {
        console.warn('❌ Acesso negado: chave inválida')
        return []
      }

      const simulacoes = JSON.parse(localStorage.getItem('simulacoes') || '[]')
      console.log(`✅ ${simulacoes.length} simulações encontradas`)
      return simulacoes
    } catch (error) {
      console.error('❌ Erro ao obter simulações:', error)
      return []
    }
  },

  // Exportar simulações em CSV
  exportSimulacoesCSV: (proprietarioKey) => {
    try {
      if (proprietarioKey !== 'ALFA_ADM_2024_SECRET') {
        throw new Error('Acesso negado')
      }

      const simulacoes = dataService.getAllSimulacoes(proprietarioKey)

      if (simulacoes.length === 0) {
        console.warn('⚠️ Nenhuma simulação para exportar')
        return null
      }

      // Criar CSV
      const headers = ['ID', 'Data', 'Nome', 'CPF', 'Valor Empréstimo', 'Prazo (meses)', 'Renda Mensal', 'Email', 'Status']
      const rows = simulacoes.map(s => [
        s.id,
        new Date(s.dataSolicitacao).toLocaleDateString('pt-BR'),
        s.nome,
        s.cpf,
        `R$ ${s.valorEmprestimo.toFixed(2)}`,
        s.prazoMeses,
        `R$ ${s.rendaMensal.toFixed(2)}`,
        s.usuarioEmail,
        s.status
      ])

      let csv = headers.join(',') + '\n'
      rows.forEach(row => {
        csv += row.map(cell => `"${cell}"`).join(',') + '\n'
      })

      return csv
    } catch (error) {
      console.error('❌ Erro ao exportar CSV:', error)
      return null
    }
  },

  // Obter simulações de um usuário
  getUserSimulacoes: (usuarioId) => {
    try {
      const simulacoes = JSON.parse(localStorage.getItem('simulacoes') || '[]')
      return simulacoes.filter(s => s.usuarioId === usuarioId)
    } catch (error) {
      console.error('❌ Erro ao obter simulações do usuário:', error)
      return []
    }
  },

  // Salvar documento
  saveDocumento: (usuarioId, tipo, arquivo) => {
    return new Promise((resolve, reject) => {
      try {
        const documento = {
          id: 'doc-' + Date.now(),
          usuarioId: usuarioId,
          tipo: tipo, // 'rg-cnh', 'comprovante-endereco', 'comprovante-renda'
          nomeArquivo: arquivo.name,
          tamanho: arquivo.size,
          url: arquivo.url,
          dataPupload: new Date().toISOString()
        }

        const documentos = JSON.parse(localStorage.getItem('documentos') || '[]')
        documentos.push(documento)
        localStorage.setItem('documentos', JSON.stringify(documentos))

        console.log('✅ Documento salvo:', documento)
        resolve(documento)
      } catch (error) {
        console.error('❌ Erro ao salvar documento:', error)
        reject(error)
      }
    })
  },

  // Obter documentos do usuário
  getUserDocumentos: (usuarioId) => {
    try {
      const documentos = JSON.parse(localStorage.getItem('documentos') || '[]')
      return documentos.filter(d => d.usuarioId === usuarioId)
    } catch (error) {
      console.error('❌ Erro ao obter documentos:', error)
      return []
    }
  }
}

export default dataService
