@echo off
color 0A
cls
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║         🏦 ALFA FINANCEIRA v3.2 - PRODUÇÃO                   ║
echo ║                                                                ║
echo ║         ✅ Todos os erros corrigidos                         ║
echo ║         ✅ Design corporativo moderno                        ║
echo ║         ✅ Validações corretas                               ║
echo ║         ✅ PIX funcionando                                   ║
echo ║                                                                ║
echo ║         Iniciando aplicação...                               ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

if not exist node_modules (
    echo 📦 Instalando dependências (primeira vez)...
    echo.
    call npm install
    if errorlevel 1 (
        echo ❌ Erro na instalação
        pause
        exit /b 1
    )
    echo.
)

echo ✅ Dependências prontas
echo.
echo 🚀 Iniciando servidor de desenvolvimento...
echo 🌐 Acesse: http://localhost:5173/
echo.
echo 🔐 Painel Admin: http://localhost:5173/admin
echo    Chave: ALFA_ADMIN_2024_SECRET_MASTER
echo.
echo (Pressione Ctrl+C para parar)
echo.

call npm run dev

pause

