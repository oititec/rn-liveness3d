#  Certiface para iOS

Neste repositório você vai encontrar as documentações para **iOS** sobre o **Liveness FaceCaptcha**, **Liveness 3D** e **Documentoscopia**.

## Sobre Este Repositório

O Liveness, ou Prova de Vida, pode ser executado através de **SDK único** que reúne os tipos: **Liveness FaceCaptcha** e **Liveness 3D**. 

Os tipos de Liveness serão apresentados na demonstração do serviço e a escolha de um deles deve ser efetuada mediante contratação. Um diagnóstico será efetuado pelo time comercial, responsável por ofertar a melhor experiência para o cliente, considerando seu o modelo de negócio e o comportamento de seus usuários.

Para cada tipo de Liveness, são apresentados propriedades técnicas específicas. Assim, a pessoa desenvolvedora deve executar os comandos pertencentes ao tipo de serviço contratado.

Acompanhe abaixo a instalação, uso, guias de migração e outros documentos. Esses processos integram o projeto FaceCapctha.

##  Instalação

O SDK está disponível via [CocoaPods](https://cocoapods.org/), forma recomendada. A instalação também pode ser realizada manualmente.


####  CocoaPods

1. No início do `Podfile`, inclua a linha:

```rb
source 'https://github.com/oititec/liveness-ios-specs.git'
```

2. Após isso, adicione a dependência:

```rb
pod 'FaceCaptcha', '~> 4.0.7'
```

3. Rode `pod install`.

####  Manual

Para adicionar o SDK manualmente no seu projeto, siga estas [instruções](Documentation/ManualInstallation.md).

##  Uso

###  Permissões de acesso

No `Info.plist` do projeto, adicione a descrição de uso de câmera (`Privacy - Camera Usage Description`).

![Instalação 4](Documentation/Images/installation_4.png)


###  Liveness FaceCaptcha

As instruções de uso, descrição, integração e implementação do **Liveness FaceCaptcha** podem ser acessadas nos links abaixo:

  - [Descrição e Resultados](Documentation/Liveness2D/Liveness2D-Description.md);
  - [Guia de uso e integração](Documentation/Liveness2D/FaceCaptcha-Usage.md);
  - [Guia de implementação de view customizada](Documentation/Liveness2D/FaceCaptcha-CustomView.md).

###  Liveness 3D

As instruções de uso, integração, implementação e customização do **Liveness 3D** podem ser acessadas nos links abaixo: 

  - [Descrição e Resultados](Documentation/Liveness3D/Liveness3D-Description.md);
  - [Guia de uso e integração](Documentation/Liveness3D/Liveness3D-Usage.md);
  - [Guia de implementação de view customizada](Documentation/Liveness3D/Liveness3D-CustomView.md);
  - [Guia de customização do Liveness3DTheme](Documentation/Liveness3D/Liveness3D-Liveness3DTheme.md).

###  Documentoscopia

As instruções de uso e integração da **Documentoscopia** podem ser acessadas nos links abaixo:

  - [Descrição e Resultados](Documentation/Liveness2D/Documentoscopy-Description.md);
  - [Guia de uso e integração](Documentation/Liveness2D/Documentscopy-Usage.md);
  - [Guia de customização de view customizada](Documentation/Liveness2D/Documentscopy-CustomView.md).


## Outros Documentos


###  Sample

Um exemplo de implementação pode ser encontrado no projeto [SampleFaceCaptcha](https://github.com/oititec/liveness-ios-sdk/tree/main/SampleFaceCaptcha "SampleFaceCaptcha"), neste mesmo repositório.

### Troubleshooting

- [Troubleshooting](Documentation/Troubleshooting.md)

###  Changelog

- As novidades das versões podem ser acessadas [neste link](Documentation/MigrationGuide/Changelog.md).

##  Guias de migração

- [4.0.9](Documentation/MigrationGuide/4.0.9.md) - BREAKING CHANGE
- [4.0.6](Documentation/MigrationGuide/4.0.6.md) - BREAKING CHANGE
- [3.0.0](Documentation/MigrationGuide/3.0.0.md) - BREAKING CHANGE
- [2.0.0](Documentation/MigrationGuide/2.0.0.md) - BREAKING CHANGE
- [1.2.0](Documentation/MigrationGuide/1.2.0.md) - BREAKING CHANGE

>⚠️ **Para conhecer mais sobre Liveness, consulte [este link.](https://certifaceid.readme.io/docs/liveness-detection-vs-atualizada)**

