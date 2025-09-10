#!/bin/bash
# Arquivo de exemplo de configuração para deploy no TestFlight
# Copie este arquivo para config.sh e configure com suas credenciais

# Apple ID (obrigatório para upload)
export APPLE_ID="seu-apple-id@email.com"

# Senha específica de app (obrigatório para upload)
# Gere em: https://appleid.apple.com → Segurança → Senhas específicas de app
export APP_SPECIFIC_PASSWORD="sua-senha-específica-de-app"

# Configurações do Build (opcionais)
export CONFIGURATION="Release"
export EXPORT_METHOD="app-store"
export SCHEME_NAME="RnLiveness3dExample"

# Team ID (opcional - se você tem múltiplos teams)
# export DEVELOPMENT_TEAM="ABC123DEF4"

# Bundle Identifier (opcional - sobrescreve o padrão)
# export BUNDLE_IDENTIFIER="com.oiti.rnliveness3dexample"

echo "Configurações carregadas para deploy no TestFlight"
