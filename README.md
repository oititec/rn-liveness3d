# 1. Sobre o Repositório

Este repositório é responsável pela biblioteca NPM do Liveness Oiti, com ele é possível instalar e usar a função de `startLiveness3d()` e a view `<Liveness3dView />` da Oititec disponíveis para aplicativos híbridos em React Native.

## 1.1 Requisitos Mínimos

| Android     | iOS     |
| ----------- | ------- |
| Gradle: 6.8 | iOS: 11 |

# 2. O que é a biblioteca?

O NPM (node package manager) é o gerenciador de pacotes do node.js (runtime de javascript).

Com o NPM você pode gerenciar dependências do seu projeto, acessar o repositório do NPM e ter acesso a inúmeras bibliotecas e frameworks JavaScript, permite a instalação/desinstalação dos mesmos assim como a criação de seus próprios módulos públicos ou privados.

# 3. Uso (PASSO 1)

As instruções de uso, integração, implementação e customização do **Liveness Oiti** podem ser acessadas através das etapas abaixo:

## 3.1. Instalação

Usando NPM:

```bash
npm install @oiti/rn-liveness3d
```

ou usando YARN

```bash
yarn add @oiti/rn-liveness3d
```

## 3.2. iOS Configuração

Adicionar o Pod do FaceCaptcha no seu Podfile que está dentro da pasta `ios`

```objectivec
pod 'FaceCaptcha', '~> 4.10.0', :source => '<https://github.com/oititec/liveness-ios-specs.git>'
```

# 4. Uso no Javascript (PASSO 2)

Primeiro devemos chamar a função desejada da biblioteca '@oiti/rn-liveness3d'

```
import { FUNÇÕES DESEJADAS } from '@oiti/rn-liveness3d';
```

## 4.1. Funções

### Diagrama E2E startLiveness3d

![E2Eliveness2d.png](%5BRN%5D%20@oiti%20rn-liveness3d%200bee6a0311a84f4987d656509cb76921/E2Eliveness2d.png)

### 4.1.1. Funções Existentes

| Função                 | Parâmetros | Retorno                    |
| ---------------------- | ---------- | -------------------------- |
| startLiveness3d(JSON); | options    | RESULT_OK, RESULT_CANCELED |

> AppKey: gerada na etapa 2 da [documentação CertifaceID](https://certifaceid.readme.io/docs/integra%C3%A7%C3%A3o-atualizada)

### 4.1.2. Exemplo de uso (Funções)

Após efetuar a importação da biblioteca, deve ser aplicada a app Key gerada dentro do parâmetro da função desejada, no exemplo abaixo chamamos a função quando clicamos no botão "Liveness 3D"

```jsx
export default function App() {
  const [result, setResult] = React.useState<string | undefined>();
  const appKey = 'APP KEY';

	const options = {
    appkey: appKey,
    environment: '.HML',
    baseUrl: 'https://comercial.certiface.com.br:8443/',
    apparence: {
      backgroundColor: '#025951',
      loadingColor: '#0CF25D',
    },
  };

  return (
    <View>
    //Liveness3D
      <Button
        onPress={() => {
          startLiveness3d(options).then(setResult);
        }}
        title="Liveness 3D"
      />
    </View>
  );
}

```

## 4.2. View Customizadas

Na biblioteca é possível aplicar uma view/componente para customizar as telas de `instruções` e a tela de `permissão` de uso da câmera.

| View               | Propriedades | Descrição |
| ------------------ | ------------ | --------- |
| <Liveness3dView /> | options      |

navigation
callbackView
texts
CustomInstructionView
CustomPermissionView | View do Liveness 3d para carregar as telas customizadas. |

### 4.2.1. Propriedades

| Propriedade           | Obrigatoriedade | Tipo                  | Descrição                                                                                                             |
| --------------------- | --------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------- |
| options               | SIM             | JSON                  | JSON de configurações da View                                                                                         |
| navigation            | SIM             | React navigation prop | Ambiente que deseja estar rodando a aplicação                                                                         |
| callbackView          | SIM             | string                | Endereço de endpoint da certiface, você pode usar uma string vazia caso deseje que a biblioteca defina um automático. |
| texts                 | NÃO             | JSON                  | Textos personalizados da tela de captura tridimensional .                                                             |
| CustomInstructionView | NÃO             | Component             | Aplica as propriedades de customização do carregamento antes de começar o Liveness3d.                                 |
| CustomPermissionView  | NÃO             | Component             | Aplica as propriedades de customização do carregamento antes de começar o Liveness3d.                                 |

### 4.2.2. JSON `options`

Para aplicar as configurações na View você deve aplicar as seguintes propriedades em formato JSON no Javascript:

```jsx
const options = {
  appkey: appKey,
  environment: '.HML',
  baseUrl: 'https://comercial.certiface.com.br:8443/',
};
```

### 4.2.3. JSON `texts`

```jsx
const texts = {
  READY_HEADER_1: 'Prepare-se para seu',
  READY_HEADER_2: 'reconhecimento facial.',
  READY_MESSAGE_1: 'Posicione o seu rosto na moldura, aproxime-se',
  READY_MESSAGE_2: 'e toque em começar.',
  READY_BUTTON: 'Começar',

  RETRY_HEADER: 'Vamos tentar novamente?',
  RETRY_SUBHEADER: 'Siga o exemplo de foto ideal abaixo:',
  RETRY_MESSAGE_SMILE: 'Expressão Neutra, Sem Sorrir',
  RETRY_MESSAGE_LIGHTING: 'Evite reflexos e iluminação extrema.',
  RETRY_MESSAGE_CONTRAST: 'Limpe Sua Câmera',
  RETRY_YOUR_PICTURE: 'Sua foto',
  RETRY_IDEAL_PICTURE: 'Foto ideal',
  RETRY_BUTTON: 'Tentar novamente',

  RESULT_UPLOAD_MESSAGE: 'Enviando...',
  RESULT_SUCCESS_MESSAGE: 'Sucesso',

  FEEDBACK_CENTER_FACE: 'Centralize Seu Rosto',
  FEEDBACK_FACE_NOT_FOUND: 'Enquadre o Seu Rosto',
  FEEDBACK_FACE_NOT_LOOKING_STRAIGHT_AHEAD: 'Olhe Para Frente',
  FEEDBACK_FACE_NOT_UPRIGHT: 'Mantenha a Cabeça Reta',
  FEEDBACK_HOLD_STEADY: 'Segure Firme',
  FEEDBACK_MOVE_PHONE_AWAY: 'Afaste-se',
  FEEDBACK_MOVE_PHONE_CLOSER: 'Aproxime-se',
  FEEDBACK_MOVE_PHONE_TO_EYE_LEVEL: 'Telefone ao Nível dos Olhos',
  FEEDBACK_USE_EVEN_LIGHTING: 'Ilumine Seu Rosto Uniformemente',

  FEEDBACK_FRAME_YOUR_FACE: 'Encaixe Seu Rosto no Espaço Oval',
  FEEDBACK_HOLD_STEADY_1: 'Aguente Firme: 1',
  FEEDBACK_HOLD_STEADY_2: 'Aguente Firme: 2',
  FEEDBACK_HOLD_STEADY_3: 'Aguente Firme: 3',
  FEEDBACK_REMOVE_DARK_GLASSES: 'Tire Seus Óculos de Sol',
  FEEDBACK_NEUTRAL_EXPRESSION: 'Fique Neutro, Não Sorria',
  FEEDBACK_CONDITIONS_TOO_BRIGHT: 'Ambiente Muito Iluminado',
  FEEDBACK_BRIGHTEN_YOUR_ENVIRONMENT: 'Ambiente Muito Escuro',
};
```

### 4.2.3. JSON `Loading`

```jsx
const loading = {
  type: 'default' | 'spinner',
  size: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
  backgroundColor: string | undefined,
  loadingColor: string | undefined,
};
```

### 4.2.4. Chaves do `options`

| View        | Valores                                  | Descrição                                                                                                             |
| ----------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| appkey      | appKey                                   | App Key gerada no backend da aplicação e retornada para uso da biblioteca.                                            |
| environment | '.HML', '.PRD'                           | Ambiente que deseja estar rodando a aplicação                                                                         |
| baseUrl     | https://comercial.certiface.com.br:8443/ | Endereço de endpoint da certiface, você pode usar uma string vazia caso deseje que a biblioteca defina um automático. |
| loading     | Objeto de customização                   | Aplica as propriedades de customização do loading antes de começar o Liveness3d.                                      |

### 4.2.5. Exemplo de uso (View Customizada)

Para utilizar uma view customizada você pode aplicar o seguinte código em sua biblioteca React Native.

```jsx
import * as React from 'react';

import { Liveness3dView } from '@oiti/rn-liveness3d';

export default function Documentscopy({ navigation }: { navigation: any }) {
  const appKey = 'SUA_APP_KEY_AQUI';
  const options = {
    appkey: appKey,
    environment: '.HML',
    baseUrl: 'https://comercial.certiface.com.br:8443/',
  };

  const loading = {
    type: 'spinner',
    size: 5,
    backgroundColor: '#000000',
    loadingColor: '#0CF25D',
  };

  const texts = {
    READY_HEADER_1: 'Prepare-se para seu',
    READY_HEADER_2: 'reconhecimento facial.',
    READY_MESSAGE_1: 'Posicione o seu rosto na moldura, aproxime-se',
    READY_MESSAGE_2: 'e toque em começar.',
    READY_BUTTON: 'Começar',
  };

  return (
    <Liveness3dView
      options={options}
      navigation={navigation}
      texts={texts}
      loading={loading}
      callbackView="Home"
      CustomInstructionView={CustomInstructionView}
      CustomPermissionView={CustomPermissionView}
    />
  );
}
```

# 5. Como executar o clone do Repositório?

Execute o código abaixo em seu terminal para clonar o código:

```bash
git clone https://github.com/oititec/rn-liveness3d
```

# 6. Como rodar o Script?

Para rodar o script desse repositório você deve instalar as dependências do projeto, então na pasta root do projeto clonado rodar o comando.

## 6.1 Yarn

```bash
yarn
```

## 6.2 Executar Projeto

> Executar sempre em dispositivos físicos e não no simulador do iOS e Android

Yarn

```bash
yarn example android
```

```bash
yarn example ios
```
