import { BackButton, ContinueButton } from '@oiti/rn-liveness3d';

import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { normalize } from '../utils/normalize';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const scaleW = SCREEN_WIDTH / 320;
const scaleH = SCREEN_HEIGHT / 920;

export default function InstructionsView() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/wave_bg.png')}
        resizeMode="cover"
        style={styles.waveTop}
      >
        <BackButton>
          <Image
            source={require('../assets/images/left-arrow.png')}
            style={styles.leftArrow}
          />
        </BackButton>

        <Text style={styles.title}>Reconhecimento Facial</Text>
        <Text style={styles.subtitle}>Isso garante que você é você mesmo.</Text>
        <View style={styles.instruction_one}>
          <View style={styles.instruction_one}>
            <>
              <ImageBackground
                style={styles.imgInstructions}
                source={require('../assets/images/illumination.png')}
                resizeMode="cover"
              />
              <View style={styles.boxInfo}>
                <Text style={styles.description_one}>
                  Escolha um ambiente bem iluminado.
                </Text>
              </View>
            </>
          </View>
        </View>
        <View style={styles.boxBtn}>
          <ContinueButton style={styles.nextBtn}>
            <Text style={styles.nextText}>Continuar</Text>
          </ContinueButton>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '101%',
    justifyContent: 'center',
  },
  title: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 29,
    fontWeight: 'bold',
    /* fontFamily: 'Ubuntu-Bold', */
    color: '#FFFFFF',
  },
  nextBtn: {
    width: 300,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: normalize(30, scaleH),
  },
  nextText: {
    /* fontFamily: 'Ubuntu-Medium', */
    fontSize: normalize(25, scaleW),
    margin: normalize(13, scaleW),
  },
  imgInstructions: {
    height: '100%',
    flex: 1,
    aspectRatio: 4 / 4.4,
  },
  description_one: {
    textAlign: 'center',
    color: '#FFFFFF',
    /* fontFamily: 'Ubuntu-Bold', */
    fontSize: normalize(20, scaleW),
    marginLeft: 60,
    marginRight: 60,
    marginTop: normalize(10, scaleH),
  },
  boxInfo: {
    width: '100%',
    paddingTop: 15,
    alignItems: 'center',
    backgroundColor: '#037eee',
  },
  boxBtn: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#037eee',
  },
  subtitle: {
    /* fontFamily: 'Ubuntu-Regular', */
    fontSize: 16,
    marginLeft: 20,
    color: '#FFFFFF',
  },
  instruction_one: {
    width: '100%',
    height: normalize(530, scaleH),
  },
  iconTop: {
    marginTop: normalize(10, scaleH),
    marginLeft: 20,
    width: normalize(50, scaleW),
    height: normalize(50, scaleH),
    aspectRatio: 4 / 4.4,
  },
  leftArrow: {
    marginTop: normalize(70, scaleH),
    marginLeft: 20,
    marginBottom: 10,
    width: normalize(20, scaleW),
    height: normalize(20, scaleH),
  },
  waveTop: {
    flex: 1,
    width: '100%',
    height: 400,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
