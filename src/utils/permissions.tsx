import { NativeModules, Platform } from 'react-native';

export const RnLiveness3d = NativeModules.RnLiveness3d
  ? NativeModules.RnLiveness3d
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const LINKING_ERROR =
  `The package '@oiti/rn-liveness3d' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

export function verifyPermission(): Promise<boolean> {
  return Platform.OS === 'android'
    ? RnLiveness3d.checkcamerapermission()
    : RnLiveness3d.checkiospermission({ p: 'granted' });
}

export function askPermission(): Promise<boolean> {
  return Platform.OS === 'android'
    ? RnLiveness3d.askcamerapermission()
    : RnLiveness3d.checkpermissiongranted({ p: 'granted' });
}
