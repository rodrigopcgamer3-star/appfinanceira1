# 🏦 Alfa Financeira v3.0

**Sistema Profissional de Gerenciamento de Empréstimos**

- ✅ Versão Production-Ready
- ✅ Todas as funcionalidades implementadas
- ✅ Pronto para hospedar

---

## 🎯 Funcionalidades

### 📱 Autenticação
- Login seguro
- Cadastro com validações robustas
- CPF validado com algoritmo verificador
- Proteção contra duplicação de dados

### 💼 Dashboard
- Dados pessoais mascarados
- Widget para editar informações
- Resumo da conta
- Visualização de contratos e documentos

### 💰 Simulação
- Formulário completo
- Dados salvos secretamente
- Acessível apenas para proprietário
- Uma simulação por sessão

### 📄 Documentos
- Upload de RG/CNH
- Upload de Comprovante de Endereço
- Upload de Comprovante de Renda
- Integração com imgbb

### 🛡️ Seguro
- Valor fixo: R$ 199,00
- Pix Cópia e Cola
- Botão de copiar automático
- Instruções claras

### ✅ Contratos
- Lista de contratos pendentes
- Assinatura digital
- Status visual
- Histórico de assinados

---

## 🚀 Como Começar

### 1. Instalar Node.js
[Download](https://nodejs.org/) versão LTS

### 2. Executar Localmente

**Windows:**
```bash
start.bat
```

**Mac/Linux:**
```bash
npm install
npm run dev
```

### 3. Acessar
```
http://localhost:5173/
```

---

## 📦 Fazer Build para Produção

```bash
npm run build
```

Isso cria pasta `dist/` com arquivos otimizados.

---

## 🌐 Deploy

### Vercel (Recomendado)
1. Crie conta em vercel.com
2. Conecte repositório Git
3. Deploy automático

### Netlify
1. Crie conta em netlify.com
2. Conecte repositório
3. Deploy automático

### Seu Servidor
1. Execute `npm run build`
2. Copie `dist/` para servidor
3. Configure SPA routing

---

## 📊 Acessar Dados do Proprietário

No console do navegador:

```javascript
// Simulações
dataService.getAllSimulacoes('ALFA_ADM_2024_SECRET')

// Exportar CSV
dataService.exportSimulacoesCSV('ALFA_ADM_2024_SECRET')
```

**Chave:** `ALFA_ADM_2024_SECRET`

---

## 🎨 Customizações

### Cores
`src/styles/global.css`

### Logo
`src/assets/logo.jpg`

### Textos
Componentes nas `pages/`

---

## 📁 Estrutura

```
src/
├── pages/                 # 7 páginas
├── components/            # 1 navbar
├── utils/                 # Autenticação e validações
├── assets/               # Logo
└── styles/               # CSS global
```

---

## ✅ Checklist de Produção

- [ ] Build criado: `npm run build`
- [ ] Testado localmente
- [ ] Deploy em hosting
- [ ] Domínio configurado
- [ ] HTTPS habilitado
- [ ] DNS apontado

---

## 📞 Suporte

Consulte `PRODUCAO.md` para guia completo de produção.

---

**Status:** ✅ Pronto para Produção

**Versão:** 3.0

**Desenvolvido para:** Alfa Financeira
