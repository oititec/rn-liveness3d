import * as React from 'react';

import { startLiveness3d, Liveness3dView } from '@oiti/rn-liveness3d';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type LoadingType = {
  type: string;
  size: number;
  backgroundColor: string;
  loadingColor: string;
};

export default function App() {
  const appKey =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjZXJ0aWZhY2UiLCJ1c2VyIjoiODY4ODMxMzczN0RBRDA0MTk2NzgyQzJGNkQyMjkxQkJEN0MxfHNhZnJhLmVwZi5obWwiLCJlbXBDb2QiOiIwMDAwMDAwNTc2IiwiZmlsQ29kIjoiMDAwMDAwMjY2MiIsImNwZiI6IjA4NjcwODMzOTU2Iiwibm9tZSI6IjBENjc3OTZBREMyMUFENzdERDAzNzYwRTY0OTE4QjlERDRDQ0M3NDI2QjYyNDUxOUM0ODAwMjQwNDcxNzE0NjZDRDc2RTdDNDI4REZCQkI0QUQ1RDYwQjYwM0NFMDlCNkJCNTdDOTMxNEYwMTEzQUE5REQ0RkYzOEI2OTE5M3xHQUJSSUVMIENBVEVMTEkgR09VTEFSVCIsIm5hc2NpbWVudG8iOiIwOC8xMC8xOTk2IiwiZWFzeS1pbmRleCI6IkFBQUFFaTNTZVptUHI5dEd5dDFBUmlRTXM2SFdRYkJpc3BUTHFvdlFvVi94NVNGeXVmbnRhU3dLL2Q2VzZnPT0iLCJrZXkiOiJRV0pzWlNCaGJpQm9iM0JsSUc5bUlHSnZaSGt1SUVGdWVTQnVZWGtnYzJoNWJtVT0iLCJleHAiOjE2ODI2Nzg2OTAsImlhdCI6MTY4MjY3Njg5MH0.VlwCLfP2WzYImdklnoiJVAwVT5uX1Ug2nptPM1X2NXo';

  const [modal, setModal] = React.useState(false);
  const [configLoading, setLoading] = React.useState<LoadingType>({
    type: 'spinner',
    size: 5,
    backgroundColor: '#000000',
    loadingColor: '#0CF25D',
  });

  const options = {
    appkey: appKey,
    environment: '.HML',
    baseUrl: 'https://comercial.certiface.com.br:8443/',

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

  const loading: LoadingType = {
    type: configLoading.type,
    size: configLoading.size,
    backgroundColor: configLoading.backgroundColor,
    loadingColor: configLoading.loadingColor,
  };

  return (
    <>
      {modal && (
        <View style={styles.modal}>
          <View style={styles.contentModal}>
            <View style={styles.titleModal}>
              <Text>Configurar Loading</Text>
            </View>
            <View style={styles.rowModal}>
              <Text>Tipo</Text>
              <Picker
                selectedValue={configLoading.type}
                style={{
                  width: '100%',
                  backgroundColor: '#f2f2f2',
                }}
                onValueChange={(itemValue) =>
                  setLoading({
                    ...configLoading,
                    type: itemValue,
                  })
                }
              >
                <Picker.Item label="Default" value="default" />
                <Picker.Item label="Spinner" value="spinner" />
              </Picker>
            </View>
            <View style={styles.rowModal}>
              <Text>Tamanho</Text>
              <TextInput
                style={{
                  height: 50,
                  width: '100%',
                  backgroundColor: '#f2f2f2',
                  textAlign: 'center',
                }}
                onChangeText={(itemValue) =>
                  setLoading({
                    ...configLoading,
                    size: parseInt(itemValue),
                  })
                }
                value={configLoading.size}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.rowModal}>
              <Text>Cor de Fundo</Text>
              <TextInput
                style={{
                  height: 50,
                  width: '100%',
                  backgroundColor: '#f2f2f2',
                  borderColor: configLoading.backgroundColor,
                  borderWidth: 2,
                  textAlign: 'center',
                }}
                maxLength={7}
                onChangeText={(itemValue) =>
                  setLoading({
                    ...configLoading,
                    backgroundColor: itemValue.toUpperCase(),
                  })
                }
                value={configLoading.backgroundColor}
                placeholder="useless placeholder"
              />
            </View>

            <View style={styles.rowModal}>
              <Text>Cor do Loading</Text>
              <TextInput
                style={{
                  height: 50,
                  width: '100%',
                  backgroundColor: '#f2f2f2',
                  textAlign: 'center',
                  borderColor: configLoading.loadingColor,
                  borderWidth: 2,
                }}
                maxLength={7}
                onChangeText={(itemValue) =>
                  setLoading({
                    ...configLoading,
                    loadingColor: itemValue.toUpperCase(),
                  })
                }
                value={configLoading.loadingColor}
                placeholder="#FFFFFF"
              />
            </View>

            <View style={styles.rowModal}>
              <Button title="Fechar" onPress={() => setModal(false)} />
            </View>
          </View>
        </View>
      )}
      <Liveness3dView options={options} loading={loading} />
      <View>
        <Button title="Configurar Loading ⚙️" onPress={() => setModal(true)} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    zIndex: 100,
    width: '100%',
    height: '100%',
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#00000075',
  },
  contentModal: {
    justifyContent: 'center',
    backgroundColor: '#FFFF',
    padding: 20,
    width: '100%',
  },
  titleModal: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 600,
    backgroundColor: '#FFFF',
    padding: 20,
    width: '100%',
  },
  rowModal: {
    justifyContent: 'center',
    backgroundColor: '#FFFF',
    paddingBottom: 20,
    width: '100%',
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
