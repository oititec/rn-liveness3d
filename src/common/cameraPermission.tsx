import { Platform } from 'react-native';

export function checkCameraPermission(module: any) {
  if (Platform.OS === 'ios') {
    return module.checkpermissiongranted({ p: 'granted' });
  } else {
    return module.checkpermissiongranted();
  }
}
