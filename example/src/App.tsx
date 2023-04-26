import * as React from 'react';

import { startLiveness3d } from '@oiti/rn-liveness3d';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function App() {
  const appKey =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjZXJ0aWZhY2UiLCJ1c2VyIjoiNzg3MzdCRjY1N0NEOTMwOEQyNzlBODIxRUM4MDEzQjU3fG9pdGkuZmFjZXRlYy5obWwiLCJlbXBDb2QiOiIwMDAwMDAwMDAxIiwiZmlsQ29kIjoiMDAwMDAwMjc2OSIsImNwZiI6IjU0MjczOTY2MDg1Iiwibm9tZSI6IkYxQTJFNDE5OTY0QkJEQ0RGMzU1MDBCNDY3QzhCMUUwNkU5MTIwMTA0NDZGMDYwNkI5QUFGODU5ODI1MTREMTAwQjU0MTZFNUJGM0U4Rjg1OEVGNUNGQkRERTQ0MkYzQjhEOUIyREY3MTU4RDdENTg1RDNDN0YzRDk3ODlDRkEwfEFTSEFVQVMgQVNVSEFTSFUgQVNVSCIsIm5hc2NpbWVudG8iOiIwOC8xMC8xOTkxIiwiZWFzeS1pbmRleCI6IkFBQUFFc1RVL1hNSjNuQWN3UVJWeWl3Nmo1Zi9uVzdGYVUvdEdrbFErUTI4dklRWUN1VkNONnA5aFIwNXVBPT0iLCJrZXkiOiJRV0pzWlNCaGJpQm9iM0JsSUc5bUlHSnZaSGt1SUVGdWVTQnVZWGtnYzJoNWJtVT0iLCJleHAiOjE2NzkwNjIwOTAsImlhdCI6MTY3OTA2MTc5MH0.ll6M-OK5Y5WchhCebGCnB4Mye6GuKwqH6zmhjyxZP8I';

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

  return (
    <View style={styles.container}>
      <Text style={styles.box}>Exemplo Oiti - Hibridos</Text>
      <View style={styles.button}>
        <Button onPress={() => startLiveness3d(options)} title="Liveness3D" />
        <Button
          onPress={() => startLiveness3d(options)}
          title="L3D Custom View"
        />
      </View>
    </View>
  );
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
