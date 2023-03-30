import React from 'react';
import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package '@oiti/rn-liveness3d' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const RnLiveness3d = NativeModules.RnLiveness3d
  ? NativeModules.RnLiveness3d
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function startLiveness3d(appKey: string): Promise<any> {
  return RnLiveness3d.startliveness3d(appKey);
}

export function StartLiveness3dCustomView({
  instructionView,
}: {
  instructionView: any;
}) {
  return <>{instructionView}</>;
}
