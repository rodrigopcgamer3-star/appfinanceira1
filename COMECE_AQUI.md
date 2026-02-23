# 🎉 Bem-vindo à Versão 3.0 de Produção!

## ✅ O Que Você Recebeu

Uma **versão profissional completa** do sistema Alfa Financeira pronta para hospedagem.

---

## 🚀 3 PASSOS PARA COMEÇAR

### PASSO 1: Instale Node.js

[Baixe aqui](https://nodejs.org/) a versão **LTS**

Reinicie o computador após instalar.

### PASSO 2: Abra a Pasta

Extraia a pasta `alfa-financeira-v2` em um local seguro.

### PASSO 3: Execute

**Windows:**
```
Clique 2x em: start.bat
```

**Mac/Linux:**
```bash
npm install && npm run dev
```

---

## ✨ O QUE MUDOU (v2.0 → v3.0)

### ✅ Login
- ✓ Sem dados pré-preenchidos
- ✓ Sem botão demo
- ✓ Sem link de cadastro
- ✓ Logo em formato de imagem

### ✅ Cadastro
- ✓ Validação de CPF real (algoritmo verificador)
- ✓ Validação de email
- ✓ Validação de telefone
- ✓ Validação de força de senha
- ✓ Proteção contra duplicação
- ✓ Máscaras de entrada

### ✅ Dashboard
- ✓ CPF mascarado (***.***.123-45)
- ✓ Widget para editar dados
- ✓ Modal completo com validações

### ✅ Simulação
- ✓ Dados salvos secretamente
- ✓ Acessível apenas para proprietário
- ✓ Formato: ID, Nome, CPF, Valor, Prazo, Renda

### ✅ Documentos
- ✓ 3 widgets de upload:
  - 🪪 RG/CNH
  - 🏠 Comprovante de Endereço
  - 💰 Comprovante de Renda
- ✓ Integração imgbb
- ✓ Validações de arquivo

### ✅ Seguro
- ✓ Valor: R$ 199,00
- ✓ Pix Cópia e Cola (real)
- ✓ Botão de copiar automático
- ✓ Instruções claras

### ✅ Design
- ✓ Cores do logo (Dourado + Azul Escuro)
- ✓ Logo em arquivo de imagem
- ✓ Profissional e moderno
- ✓ Responsivo (mobile/tablet/desktop)

---

## 🔐 Dados Secretos

### Acessar Simulações do Proprietário

No console do navegador (F12), em qualquer página logado como proprietário:

```javascript
// Importar o serviço
const dataService = window.__DATA_SERVICE__

// Obter simulações
const sims = dataService.getAllSimulacoes('ALFA_ADM_2024_SECRET')

// Exportar CSV
const csv = dataService.exportSimulacoesCSV('ALFA_ADM_2024_SECRET')
```

**Chave Secreta:** `ALFA_ADM_2024_SECRET`

---

## 📊 Estrutura de Arquivos

```
alfa-financeira-v2/
├── 📄 README.md               ← Documentação
├── 📄 PRODUCAO.md             ← Guia de produção
├── 📄 package.json            ← Dependências
├── 📄 start.bat               ← Iniciar (Windows)
├── 📄 index.html              ← HTML principal
├── 📄 vite.config.js          ← Config
│
└── src/
    ├── App.jsx                ← Roteamento principal
    ├── main.jsx               ← Entrada
    │
    ├── assets/
    │   └── logo.jpg           ← Sua logo
    │
    ├── utils/
    │   ├── authService.js     ← Autenticação + Validações
    │   ├── validationService.js ← CPF, Email, etc
    │   └── dataService.js     ← Simulações + Documentos
    │
    ├── components/
    │   ├── Navbar.jsx         ← Navegação
    │   └── Navbar.css
    │
    ├── pages/
    │   ├── Login.jsx          ← Página de Login
    │   ├── Cadastro.jsx       ← Página de Cadastro
    │   ├── Dashboard.jsx      ← Página Dashboard
    │   ├── Simulacao.jsx      ← Página Simulação
    │   ├── Contratos.jsx      ← Página Contratos
    │   ├── Documentos.jsx     ← Página Documentos
    │   ├── Seguro.jsx         ← Página Seguro
    │   ├── Auth.css           ← Estilos Auth
    │   └── Pages.css          ← Estilos Pages
    │
    └── styles/
        └── global.css         ← Estilos globais
```

---

## 🎨 Customizações Rápidas

### Mudar Cores
Edite `src/styles/global.css`:

```css
:root {
  --primary-gold: #D4AF37;      /* Sua cor principal */
  --primary-dark: #1a2a4a;      /* Cor secundária */
}
```

### Mudar Logo
Substitua `src/assets/logo.jpg` por sua imagem (mesma proporção)

### Mudar Textos
Edite os arquivos `.jsx` nas páginas

---

## 🚀 Para Produção

### Build
```bash
npm run build
```

### Deploy no Vercel
```bash
npm i -g vercel
vercel
```

### Deploy no Netlify
1. Faça push para Git
2. Conecte repositório em netlify.com
3. Deploy automático

---

## ✅ Funcionalidades Testadas

- [x] Login funciona
- [x] Cadastro com validações
- [x] Dashboard com edição
- [x] Simulação salva secretamente
- [x] Upload de documentos (imgbb)
- [x] Pix Cópia e Cola
- [x] Contratos com assinatura
- [x] CPF mascarado
- [x] Responsivo
- [x] Performance otimizada

---

## 📞 Problemas?

### "npm não é reconhecido"
→ Reinstale Node.js e reinicie

### "Porta 5173 em uso"
→ `npm run dev -- --port 3000`

### "Erro ao fazer upload"
→ Arquivo > 5MB ou tipo inválido

### "Login não funciona"
→ Crie uma conta em Cadastro primeiro

---

## 🎓 Próximas Etapas

1. **Teste localmente** (Clique 2x em start.bat)
2. **Crie uma conta** em Cadastro
3. **Explore todas as páginas**
4. **Faça simulações** (dados salvos secretamente)
5. **Quando satisfeito, faça deploy**

---

## 📈 Estatísticas Finais

| Item | Dados |
|------|-------|
| **Versão** | 3.0 Production |
| **Páginas** | 7 |
| **Componentes** | 8 |
| **Validações** | Completas |
| **Responsivo** | Sim |
| **Performance** | Otimizada |
| **Pronto Deploy** | ✅ SIM |

---

## 🎯 Checklist

- [ ] Node.js instalado
- [ ] Pasta extraída
- [ ] Executar `start.bat` ou `npm run dev`
- [ ] Acessar `http://localhost:5173/`
- [ ] Criar conta em Cadastro
- [ ] Fazer login
- [ ] Explorar todas as páginas
- [ ] Testar upload de documentos
- [ ] Testar simulação
- [ ] Testar Pix
- [ ] Satisfeito? Fazer deploy!

---

## 💡 Dica

A primeira vez que rodar, vai demora um pouco (instalando npm). Da próxima é rápido!

---

**🎉 Parabéns! Você tem um sistema profissional pronto para hospedar!**

Desenvolvido com ❤️ para Alfa Financeira

**Versão 3.0 - Production Ready**
