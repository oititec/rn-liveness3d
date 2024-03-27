import { Picker } from '@react-native-picker/picker';
import * as React from 'react';
import { Liveness3dView } from '@oiti/rn-liveness3d';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ArgsType, LoadingType } from 'src/@types/ArgsType';
import { ThemeType } from 'src/@types/ThemeType';
import { FontsType } from 'src/@types/FontsType';

export default function Home({ navigation }: { navigation: any; route?: any }) {
  const [modal, setModal] = React.useState(false);
  const [configLoading, setLoading] = React.useState<LoadingType>({
    type: 'default',
    size: 1,
    backgroundColor: '#000000',
    loadingColor: '#0CF25D',
  });

  const texts = {
    // Ready Screen
    READY_HEADER_1: 'READY_HEADER_1',
    READY_HEADER_2: 'READY_HEADER_2',
    READY_MESSAGE_1: 'READY_MESSAGE_1',
    READY_MESSAGE_2: 'READY_MESSAGE_2',
    READY_BUTTON: 'READY_BUTTON',
    // Retry Screen
    RETRY_HEADER: 'RETRY_HEADER',
    RETRY_SUBHEADER: 'RETRY_SUBHEADER',
    RETRY_MESSAGE_SMILE: 'RETRY_MESSAGE_SMILE',
    RETRY_MESSAGE_LIGHTING: 'RETRY_MESSAGE_LIGHTING',
    RETRY_MESSAGE_CONTRAST: 'RETRY_MESSAGE_CONTRAST',
    RETRY_YOUR_PICTURE: 'RETRY_YOUR_PICTURE',
    RETRY_IDEAL_PICTURE: 'RETRY_IDEAL_PICTURE',
    RETRY_BUTTON: 'RETRY_BUTTON',
    // Result Screen
    RESULT_UPLOAD_MESSAGE: 'RESULT_UPLOAD_MESSAGE',
    RESULT_SUCCESS_MESSAGE: 'RESULT_SUCCESS_MESSAGE',
    // Feedback Screen
    FEEDBACK_CENTER_FACE: 'FEEDBACK_CENTER_FACE',
    FEEDBACK_FACE_NOT_FOUND: 'FEEDBACK_FACE_NOT_FOUND',
    FEEDBACK_FACE_NOT_LOOKING_STRAIGHT_AHEAD:
      'FEEDBACK_FACE_NOT_LOOKING_STRAIGHT_AHEAD',
    FEEDBACK_FACE_NOT_UPRIGHT: 'FEEDBACK_FACE_NOT_UPRIGHT',
    FEEDBACK_HOLD_STEADY: 'FEEDBACK_HOLD_STEADY',
    FEEDBACK_MOVE_PHONE_AWAY: 'FEEDBACK_MOVE_PHONE_AWAY',
    FEEDBACK_MOVE_PHONE_CLOSER: 'FEEDBACK_MOVE_PHONE_CLOSER',
    FEEDBACK_MOVE_PHONE_TO_EYE_LEVEL: 'FEEDBACK_MOVE_PHONE_TO_EYE_LEVEL',
    FEEDBACK_USE_EVEN_LIGHTING: 'FEEDBACK_USE_EVEN_LIGHTING',
    FEEDBACK_FRAME_YOUR_FACE: 'FEEDBACK_FRAME_YOUR_FACE',
    FEEDBACK_HOLD_STEADY_1: 'FEEDBACK_HOLD_STEADY_1',
    FEEDBACK_HOLD_STEADY_2: 'FEEDBACK_HOLD_STEADY_2',
    FEEDBACK_HOLD_STEADY_3: 'FEEDBACK_HOLD_STEADY_3',
    FEEDBACK_REMOVE_DARK_GLASSES: 'FEEDBACK_REMOVE_DARK_GLASSES',
    FEEDBACK_NEUTRAL_EXPRESSION: 'FEEDBACK_NEUTRAL_EXPRESSION',
    FEEDBACK_CONDITIONS_TOO_BRIGHT: 'FEEDBACK_CONDITIONS_TOO_BRIGHT',
    FEEDBACK_BRIGHTEN_YOUR_ENVIRONMENT: 'FEEDBACK_BRIGHTEN_YOUR_ENVIRONMENT',
  };

  const theme: ThemeType = {
    guidanceCustomizationButtonBackgroundNormalColor: '#fc03f0',
    guidanceCustomizationButtonTextHighlightColor: '#fc03f0',
  };

  const fonts: FontsType = {
    guidanceCustomizationButtonFont: 'lobster',
    feedbackCustomizationTextFont: 'lobster',
    guidanceCustomizationHeaderFont: 'lobster',
    guidanceCustomizationSubtextFont: 'lobster',
    readyScreenCustomizationHeaderFont: 'lobster',
    readyScreenCustomizationSubtextFont: 'lobster',
    resultScreenCustomizationMessageFont: 'lobster',
    retryScreenCustomizationHeaderFont: 'lobster',
    retryScreenCustomizationSubtextFont: 'lobster',
  };

  const [options, setOptions] = React.useState<ArgsType>({
    appkey: '',
    ticket: '',
    environment: 'HML',
  });

  const toggleEnvironment = (value: boolean) =>
    setOptions({ ...options, environment: value ? 'PRD' : 'HML' });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.containerScroll}
    >
      {modal && (
        <SafeAreaView style={styles.containerModal}>
          <ScrollView style={styles.modal}>
            <View style={styles.contentModal}>
              <View style={styles.titleModal}>
                <Text>Configurações ⚙️</Text>
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
                  onChangeText={(itemValue) =>
                    setOptions({ ...options, appkey: itemValue })
                  }
                  value={options.appkey}
                  placeholder="AppKey Aqui"
                />
              </View>
              <View style={styles.rowModal}>
                <Text>Ticket</Text>
                <TextInput
                  style={{
                    height: 50,
                    width: '100%',
                    backgroundColor: '#f2f2f2',
                    borderWidth: 2,
                  }}
                  onChangeText={(itemValue) =>
                    setOptions({ ...options, ticket: itemValue })
                  }
                  value={options.ticket ? options.ticket : ''}
                  placeholder="Ticket Aqui"
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
                    //@ts-ignore
                    setLoading({
                      ...configLoading,
                      //@ts-ignore
                      size: parseInt(itemValue),
                    })
                  }
                  //@ts-ignore
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
      <ScrollView style={styles.containerScroll}>
        <View style={styles.container}>
          <Text style={styles.box}>
            Exemplo Oiti | <Text style={styles.boldText}>3D</Text> | React
            Native
          </Text>
          <View style={styles.button}>
            <Pressable
              onPress={() =>
                navigation.navigate('Liveness3D', {
                  options: options,
                })
              }
              style={styles.buttonDefault}
            >
              <Text style={styles.textBtn}>Liveness 3D</Text>
            </Pressable>
          </View>

          <View style={styles.spacae}></View>
          <View style={styles.divider}></View>
          <View style={styles.spacae}></View>
          <View style={styles.button}>
            <Pressable
              onPress={() =>
                navigation.navigate('Liveness3D', {
                  options: options,
                  loading: configLoading,
                })
              }
              style={styles.buttonDefault}
            >
              <Text style={styles.textBtn}>Liveness 3D Loading</Text>
            </Pressable>
          </View>
          <View style={styles.spacae}></View>
          <View style={styles.button}>
            <Pressable
              onPress={() =>
                navigation.navigate('Liveness3D', {
                  options: options,
                  texts: texts,
                })
              }
              style={styles.buttonDefault}
            >
              <Text style={styles.textBtn}>Liveness 3D Texts</Text>
            </Pressable>
          </View>

          <View style={styles.spacae}></View>
          <View style={styles.button}>
            <Pressable
              onPress={() =>
                navigation.navigate('Liveness3D', {
                  options: options,
                  theme: theme,
                })
              }
              style={styles.buttonDefault}
            >
              <Text style={styles.textBtn}>Liveness 3D Theme</Text>
            </Pressable>
          </View>

          <View style={styles.spacae}></View>
          <View style={styles.button}>
            <Pressable
              onPress={() =>
                navigation.navigate('Liveness3D', {
                  options: options,
                  fonts: fonts,
                })
              }
              style={styles.buttonDefault}
            >
              <Text style={styles.textBtn}>Liveness 3D Fonts</Text>
            </Pressable>
          </View>

          <View style={styles.spacae}></View>
          <View style={styles.button}>
            <Pressable
              onPress={() =>
                navigation.navigate('Liveness3DCustom', {
                  options: options,
                })
              }
              style={styles.buttonDefault}
            >
              <Text style={styles.textBtn}>Liveness 3D Custom Views</Text>
            </Pressable>
          </View>

          <View style={styles.spacae}></View>
          <View style={styles.divider}></View>

          <View style={styles.switch}>
            <View style={styles.col50l}>
              <Text style={styles.text}>Ambiente</Text>
              <Text style={styles.subtext}>
                {options.environment === 'HML' ? 'Homologação' : 'Produção'}
              </Text>
            </View>
            <View style={styles.col50r}>
              <Switch
                trackColor={{ false: '#767577' }}
                thumbColor={
                  options.environment === 'HML' ? '#0CF25D' : '#0CF25D'
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => toggleEnvironment(value)}
                value={options.environment === 'HML' ? false : true}
              />
            </View>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.spacae}></View>
        </View>
        <View style={styles.spacae}></View>
        <View style={styles.spacae}></View>
      </ScrollView>
      <View style={styles.paddingConfig}>
        <Button title="Configurações ⚙️" onPress={() => setModal(true)} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    overflow: 'scroll',
  },
  paddingConfig: {
    paddingBottom: 25,
  },
  containerScroll: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  box: {
    marginVertical: 20,
  },
  button: {
    width: '80%',
    marginVertical: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black',
  },
  boldText: {
    fontWeight: '900',
  },
  subtext: {
    fontSize: 10,
    color: '#444',
  },
  divider: {
    width: '80%',
    marginVertical: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  spacae: {
    height: 5,
    marginVertical: 5,
  },
  switch: {
    width: '80%',
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  col50l: {
    width: '60%',
    color: 'black',
    justifyContent: 'flex-start',
  },
  col50r: {
    width: '40%',
    color: 'black',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  boxResult: {
    marginVertical: 10,
  },
  buttonDefault: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#0CF25D',
  },

  buttonCustom: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderColor: '#0CF25D',
    borderWidth: 2,
  },
  textBtn: {
    color: 'black',
    fontWeight: '700',
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
});
