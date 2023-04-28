import * as React from 'react';

import { startLiveness3d, Liveness3dView } from '@oiti/rn-liveness3d';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function App() {
  const appKey =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjZXJ0aWZhY2UiLCJ1c2VyIjoiODY4ODMxMzczN0RBRDA0MTk2NzgyQzJGNkQyMjkxQkJEN0MxfHNhZnJhLmVwZi5obWwiLCJlbXBDb2QiOiIwMDAwMDAwNTc2IiwiZmlsQ29kIjoiMDAwMDAwMjY2MiIsImNwZiI6IjA4NjcwODMzOTU2Iiwibm9tZSI6IjBENjc3OTZBREMyMUFENzdERDAzNzYwRTY0OTE4QjlERDRDQ0M3NDI2QjYyNDUxOUM0ODAwMjQwNDcxNzE0NjZDRDc2RTdDNDI4REZCQkI0QUQ1RDYwQjYwM0NFMDlCNkJCNTdDOTMxNEYwMTEzQUE5REQ0RkYzOEI2OTE5M3xHQUJSSUVMIENBVEVMTEkgR09VTEFSVCIsIm5hc2NpbWVudG8iOiIwOC8xMC8xOTk2IiwiZWFzeS1pbmRleCI6IkFBQUFFaTNTZVptUHI5dEd5dDFBUmlRTXM2SFdRYkJpc3BUTHFvdlFvVi94NVNGeXVmbnRhU3dLL2Q2VzZnPT0iLCJrZXkiOiJRV0pzWlNCaGJpQm9iM0JsSUc5bUlHSnZaSGt1SUVGdWVTQnVZWGtnYzJoNWJtVT0iLCJleHAiOjE2ODI2Nzg2OTAsImlhdCI6MTY4MjY3Njg5MH0.VlwCLfP2WzYImdklnoiJVAwVT5uX1Ug2nptPM1X2NXo';

  const options = {
    appkey: appKey,
    environment: '.HML',
    baseUrl: 'https://comercial.certiface.com.br:8443/',
    apparence: {
      backgroundColor: '#025951',
      loadingColor: '#0CF25D',
    },
    liveness3Dtext: {
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
      FEEDBACK_EYES_STRAIGHT_AHEAD: 'Olhe Para Frente',
      FEEDBACK_REMOVE_DARK_GLASSES: 'Tire Seus Óculos de Sol',
      FEEDBACK_NEUTRAL_EXPRESSION: 'Fique Neutro, Não Sorria',
      FEEDBACK_CONDITIONS_TOO_BRIGHT: 'Ambiente Muito Iluminado',
      FEEDBACK_BRIGHTEN_YOUR_ENVIRONMENT: 'Ambiente Muito Escuro',
    },
  };

  return <Liveness3dView options={options} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    marginVertical: 20,
  },
  button: {
    marginVertical: 5,
  },
  boxResult: {
    marginVertical: 10,
  },
});
