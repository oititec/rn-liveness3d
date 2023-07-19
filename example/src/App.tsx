import * as React from 'react';

import { Liveness3dView } from '@oiti/rn-liveness3d';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  StatusBar,
  Button,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

type LoadingType = {
  appkey: string;
  type: string;
  size: number;
  backgroundColor: string;
  loadingColor: string;
};

export default function App() {
  const [modal, setModal] = React.useState(false);

  const [configLoading, setLoading] = React.useState<LoadingType>({
    appkey:
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjZXJ0aWZhY2UiLCJ1c2VyIjoiMzg3NTA4ODVGODVCQjQ4N0M2NUYxRURBMTgwNTBGRTlFfG1vYmlsZS5hcGlnbG9iYWwiLCJlbXBDb2QiOiIwMDAwMDAwNjc5IiwiZmlsQ29kIjoiMDAwMDAwMjc3NCIsImNwZiI6Ijc4NjUyMTg2NzIzIiwibm9tZSI6IkEyOTVCRjI3M0Q0NDQ2QjdBODFFQjUyMTFENkMxRTY0RkY0NTY4NUNCN0Q4NDRGRDcwRDQ5MzAwNTJCRUE1MkU2NjNBNjFDQThEMjEwQTFDQ0UxRURCRTUyQkNFRTIyMDc4MDRBRUNGOTk3OERDRTA0OTdEOTc3MDIxMjcxODI1NUZGNER8QUxFU1NBTkRSTyBGQVJJQSIsIm5hc2NpbWVudG8iOiIyNy8wNS8xOTcyIiwiZWFzeS1pbmRleCI6IkFBQUFFcXlZdzNQSkpNTTZ4UzhYQjVBaitXQlJZdXZsUjlvYnZtdUNVcmdXVmtCWnpqZGxFNzRzMFphclp3PT0iLCJrZXkiOiJRV3hzYjNkaGJtTmxJSEpsY0hWc2MybDJaU0J6WlhnZ2JXRjVJR052Ym5SaGFXND0iLCJleHAiOjE2ODk4MDE5NjYsImlhdCI6MTY4OTgwMTY2Nn0.XGAy01GqLkaLqZi74L07wVLYertuuf2SWTPGVU36K7Q',
    type: 'default',
    size: 2,
    backgroundColor: '#000000',
    loadingColor: '#0CF25D',
  });

  const [options, setOptions] = React.useState({
    appkey: configLoading.appkey,
    environment: 'HML',
    baseUrl: 'https://comercial.certiface.com.br:8443/',

    liveness3Dtext: {
      // Ready Screen
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
    },
  });

  const loading: LoadingType = {
    appkey: configLoading.appkey,
    type: configLoading.type,
    size: configLoading.size,
    backgroundColor: configLoading.backgroundColor,
    loadingColor: configLoading.loadingColor,
  };

  function handleValues(value: any) {
    setOptions({ ...options, appkey: value });
  }

  return (
    <>
      {modal && (
        <SafeAreaView style={styles.containerModal}>
          <ScrollView style={styles.modal}>
            <View style={styles.contentModal}>
              <View style={styles.titleModal}>
                <Text>Configurar Loading</Text>
              </View>
              <View style={styles.rowModal}>
                <Text>APPKEY</Text>
                <TextInput
                  style={{
                    height: 50,
                    width: '100%',
                    backgroundColor: '#f2f2f2',
                    borderWidth: 2,
                  }}
                  onChangeText={(itemValue) => handleValues(itemValue)}
                  value={options.appkey}
                  placeholder="Appkey Aqui"
                />
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
                  placeholder="Cor Fundo"
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
          </ScrollView>
        </SafeAreaView>
      )}
      <Liveness3dView options={options} loading={loading} />
      <View>
        <Button title="Configurações ⚙️" onPress={() => setModal(true)} />
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
  containerModal: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100,
  },
  modal: {
    flex: 1,
    padding: 20,
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
