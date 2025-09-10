#!/bin/bash

# Script para build e distribuição no TestFlight
# RN Liveness3D Example App

set -e  # Para em caso de erro

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
EXAMPLE_DIR="$PROJECT_ROOT/example"
IOS_DIR="$EXAMPLE_DIR/ios"
WORKSPACE_NAME="RnLiveness3dExample.xcworkspace"
SCHEME_NAME="RnLiveness3dExample"
CONFIGURATION="Release"
EXPORT_METHOD="app-store"

# Funções auxiliares
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Função para verificar dependências
check_dependencies() {
    log_info "Verificando dependências..."
    
    # Verificar se Xcode está instalado
    if ! command -v xcodebuild &> /dev/null; then
        log_error "Xcode não está instalado ou xcodebuild não está no PATH"
        exit 1
    fi
    
    # Verificar se altool está instalado
    if ! command -v xcrun altool &> /dev/null; then
        log_error "altool não está disponível. Verifique se o Xcode Command Line Tools estão instalados."
        exit 1
    fi
    
    # Verificar se Node.js está instalado
    if ! command -v node &> /dev/null; then
        log_error "Node.js não está instalado"
        exit 1
    fi
    
    # Verificar se Yarn está instalado
    if ! command -v yarn &> /dev/null; then
        log_error "Yarn não está instalado"
        exit 1
    fi
    
    log_success "Todas as dependências estão instaladas"
}

# Função para limpar builds anteriores
clean_builds() {
    log_info "Limpando builds anteriores..."
    
    cd "$IOS_DIR"
    
    # Limpar derived data
    xcodebuild clean -workspace "$WORKSPACE_NAME" -scheme "$SCHEME_NAME" -configuration "$CONFIGURATION"
    
    # Remover pasta de build se existir
    if [ -d "build" ]; then
        rm -rf build
        log_info "Removida pasta build anterior"
    fi
    
    log_success "Limpeza concluída"
}

# Função para instalar dependências
install_dependencies() {
    log_info "Instalando dependências..."
    
    cd "$EXAMPLE_DIR"
    
    # Instalar dependências Node.js
    log_info "Instalando dependências do Node.js..."
    yarn install
    
    # Instalar pods
    log_info "Instalando CocoaPods..."
    cd "$IOS_DIR"
    pod install
    
    log_success "Dependências instaladas"
}

# Função para incrementar build number
increment_build_number() {
    log_info "Incrementando build number..."
    
    cd "$IOS_DIR"
    
    # Usar agvtool para incrementar o build number
    xcrun agvtool next-version -all
    
    # Mostrar o novo build number
    BUILD_NUMBER=$(xcrun agvtool what-version -terse)
    log_info "Novo build number: $BUILD_NUMBER"
}

# Função para fazer o archive
archive_app() {
    log_info "Fazendo archive da aplicação..."
    
    cd "$IOS_DIR"
    
    ARCHIVE_PATH="$IOS_DIR/build/${SCHEME_NAME}.xcarchive"
    
    xcodebuild archive \
        -workspace "$WORKSPACE_NAME" \
        -scheme "$SCHEME_NAME" \
        -configuration "$CONFIGURATION" \
        -archivePath "$ARCHIVE_PATH" \
        -allowProvisioningUpdates \
        CODE_SIGN_STYLE=Automatic \
        | xcpretty
    
    if [ ! -d "$ARCHIVE_PATH" ]; then
        log_error "Falha no archive da aplicação"
        exit 1
    fi
    
    log_success "Archive criado com sucesso: $ARCHIVE_PATH"
}

# Função para exportar IPA
export_ipa() {
    log_info "Exportando IPA..."
    
    cd "$IOS_DIR"
    
    ARCHIVE_PATH="$IOS_DIR/build/${SCHEME_NAME}.xcarchive"
    EXPORT_PATH="$IOS_DIR/build/export"
    
    # Criar ExportOptions.plist
    cat > "$IOS_DIR/build/ExportOptions.plist" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>$EXPORT_METHOD</string>
    <key>uploadBitcode</key>
    <false/>
    <key>uploadSymbols</key>
    <true/>
    <key>compileBitcode</key>
    <false/>
</dict>
</plist>
EOF
    
    xcodebuild -exportArchive \
        -archivePath "$ARCHIVE_PATH" \
        -exportPath "$EXPORT_PATH" \
        -exportOptionsPlist "$IOS_DIR/build/ExportOptions.plist" \
        -allowProvisioningUpdates \
        | xcpretty
    
    IPA_PATH="$EXPORT_PATH/${SCHEME_NAME}.ipa"
    
    if [ ! -f "$IPA_PATH" ]; then
        log_error "Falha na exportação do IPA"
        exit 1
    fi
    
    log_success "IPA exportado com sucesso: $IPA_PATH"
}

# Função para fazer upload para TestFlight
upload_to_testflight() {
    log_info "Fazendo upload para TestFlight..."
    
    IPA_PATH="$IOS_DIR/build/export/${SCHEME_NAME}.ipa"
    
    # Verificar se as credenciais estão configuradas
    if [ -z "$APPLE_ID" ] || [ -z "$APP_SPECIFIC_PASSWORD" ]; then
        log_warning "Credenciais não configuradas via variáveis de ambiente"
        log_info "Para configurar automaticamente, defina:"
        log_info "export APPLE_ID=\"seu-apple-id@email.com\""
        log_info "export APP_SPECIFIC_PASSWORD=\"sua-senha-específica-de-app\""
        log_info ""
        log_info "Iniciando upload manual..."
        
        xcrun altool --upload-app \
            --type ios \
            --file "$IPA_PATH" \
            --username "$APPLE_ID" \
            --password "@keychain:AC_PASSWORD"
    else
        log_info "Usando credenciais das variáveis de ambiente..."
        
        xcrun altool --upload-app \
            --type ios \
            --file "$IPA_PATH" \
            --username "$APPLE_ID" \
            --password "$APP_SPECIFIC_PASSWORD"
    fi
    
    if [ $? -eq 0 ]; then
        log_success "Upload para TestFlight concluído com sucesso!"
        log_info "O app estará disponível no TestFlight em alguns minutos após o processamento."
    else
        log_error "Falha no upload para TestFlight"
        exit 1
    fi
}

# Função para mostrar informações do build
show_build_info() {
    log_info "Informações do Build:"
    echo "────────────────────────────────────────"
    echo "Projeto: $SCHEME_NAME"
    echo "Configuração: $CONFIGURATION"
    echo "Workspace: $WORKSPACE_NAME"
    echo "Diretório: $IOS_DIR"
    echo "────────────────────────────────────────"
}

# Função para exibir ajuda
show_help() {
    echo "Script de Deploy para TestFlight - RN Liveness3D"
    echo ""
    echo "Uso: $0 [opções]"
    echo ""
    echo "Opções:"
    echo "  --clean-only       Apenas limpa builds anteriores"
    echo "  --deps-only        Apenas instala dependências"
    echo "  --archive-only     Apenas faz o archive"
    echo "  --no-increment     Não incrementa o build number"
    echo "  --no-upload        Não faz upload para TestFlight"
    echo "  --help             Mostra esta ajuda"
    echo ""
    echo "Variáveis de ambiente opcionais:"
    echo "  APPLE_ID                Apple ID para upload"
    echo "  APP_SPECIFIC_PASSWORD   Senha específica de app"
    echo ""
    echo "Exemplo:"
    echo "  $0                      # Build completo e upload"
    echo "  $0 --no-upload          # Build sem upload"
    echo "  $0 --clean-only         # Apenas limpeza"
}

# Processar argumentos da linha de comando
CLEAN_ONLY=false
DEPS_ONLY=false
ARCHIVE_ONLY=false
NO_INCREMENT=false
NO_UPLOAD=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --clean-only)
            CLEAN_ONLY=true
            shift
            ;;
        --deps-only)
            DEPS_ONLY=true
            shift
            ;;
        --archive-only)
            ARCHIVE_ONLY=true
            shift
            ;;
        --no-increment)
            NO_INCREMENT=true
            shift
            ;;
        --no-upload)
            NO_UPLOAD=true
            shift
            ;;
        --help)
            show_help
            exit 0
            ;;
        *)
            log_error "Opção desconhecida: $1"
            show_help
            exit 1
            ;;
    esac
done

# Função principal
main() {
    log_info "Iniciando processo de build e deploy para TestFlight..."
    echo ""
    
    show_build_info
    echo ""
    
    check_dependencies
    
    if [ "$CLEAN_ONLY" = true ]; then
        clean_builds
        log_success "Limpeza concluída!"
        exit 0
    fi
    
    if [ "$DEPS_ONLY" = true ]; then
        install_dependencies
        log_success "Dependências instaladas!"
        exit 0
    fi
    
    clean_builds
    install_dependencies
    
    if [ "$NO_INCREMENT" = false ]; then
        increment_build_number
    fi
    
    archive_app
    export_ipa
    
    if [ "$ARCHIVE_ONLY" = true ]; then
        log_success "Archive concluído!"
        exit 0
    fi
    
    if [ "$NO_UPLOAD" = false ]; then
        upload_to_testflight
    else
        log_info "Upload para TestFlight pulado (--no-upload)"
    fi
    
    echo ""
    log_success "🎉 Processo concluído com sucesso!"
    echo ""
    log_info "Próximos passos:"
    echo "1. Acesse App Store Connect"
    echo "2. Vá para TestFlight"
    echo "3. Configure grupos de teste se necessário"
    echo "4. Submeta para revisão interna se necessário"
}

# Executar função principal
main "$@"
