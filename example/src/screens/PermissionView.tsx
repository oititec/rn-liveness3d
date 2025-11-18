import { BackButton, PermissionButton } from '@oiti/rn-liveness3d';

import { Image, StyleSheet, Text, View } from 'react-native';

export default function PermissionView() {
  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <BackButton style={styles.backBtn}>
          <Text style={styles.nextText}>Voltar</Text>
        </BackButton>
      </View>

      <View style={styles.containerPerm}>
        <View style={styles.imgContainer}>
          <Image
            source={require('../assets/images/camera.png')}
            style={styles.imgFace}
          />
          <View style={styles.intructions}>
            <Text style={styles.title}>Permissões da câmera desativadas.</Text>
            <Text style={styles.subtitle}>
              Habilitar as configurações do seu aparelho.
            </Text>
            <PermissionButton style={styles.nextBtn}>
              <Text style={styles.nextText}>Verificar</Text>
            </PermissionButton>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFF',
    width: '100%',
    justifyContent: 'center',
  },
  rowInstructions: {
    width: '100%',
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewBtn: {
    width: '90%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationBar: {
    width: '100%',
    backgroundColor: '#FFF',
  },
  containerPerm: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  intructions: {
    width: '90%',
    flex: 1,
  },
  boxIcon: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    backgroundColor: '#F5f5f5',
    borderRadius: 100,
  },
  boxText: {
    paddingLeft: 20,
    width: '75%',
    color: '#000000',
    fontSize: 25,
  },
  imgContainer: {
    flex: 1,
    width: '90%',
    marginTop: 100,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 30,
    width: '100%',
    marginBottom: 20,
    fontSize: 29,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
    /* fontFamily: 'Ubuntu-Bold', */
    color: '#1E1E1E',
  },
  nextBtn: {
    width: '100%',
    backgroundColor: 'red',
    alignItems: 'center',
    fontWeight: 900,
    borderRadius: 50,
    marginTop: 0,
  },
  backBtn: {
    width: '100%',
    backgroundColor: 'red',
    alignItems: 'center',
    fontWeight: 900,
    borderRadius: 50,
    marginTop: 90,
  },
  nextText: {
    /* fontFamily: 'Ubuntu-Medium', */
    fontSize: 25,
    margin: 13,
  },
  boxBtn: {
    width: '100%',
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  subtitle: {
    /* fontFamily: 'Ubuntu-Regular', */
    fontSize: 23,
    width: '100%',
    color: '#666666',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: 25,
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
  imgFace: {
    height: 200,
    aspectRatio: 4 / 4.4,
  },
  waveTop: {
    flex: 1,
    width: '100%',
    height: 200,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
