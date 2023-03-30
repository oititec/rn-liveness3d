import * as React from 'react';

import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  startLiveness3d,
  StartLiveness3dCustomView,
} from '@oiti/rn-liveness3d';

export default function InstructionsView({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/wave_bg.png')}
        resizeMode="cover"
        style={styles.waveTop}
      >
        <Image
          source={require('../assets/images/left-arrow.png')}
          style={styles.leftArrow}
        />
        <Image
          source={require('../assets/images/scan-facial.png')}
          style={styles.iconTop}
        />
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
          <TouchableOpacity style={styles.nextBtn}>
            <Text onPress={() => startLiveness3d('')} style={styles.nextText}>
              Continuar
            </Text>
          </TouchableOpacity>
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
    marginTop: 30,
  },
  nextText: {
    /* fontFamily: 'Ubuntu-Medium', */
    fontSize: 25,
    margin: 13,
  },
  imgInstructions: {
    width: '100%',
    height: 450,
  },
  description_one: {
    textAlign: 'center',
    color: '#FFFFFF',
    /* fontFamily: 'Ubuntu-Bold', */
    fontSize: 30,
    marginLeft: 60,
    marginRight: 60,
    marginTop: 10,
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
    height: 530,
  },
  iconTop: {
    marginTop: 60,
    marginLeft: 20,
    width: 55,
    height: 55,
  },
  leftArrow: {
    marginTop: 70,
    marginLeft: 20,
    width: 25,
    height: 25,
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
