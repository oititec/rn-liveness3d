import React from 'react';
import { NativeModules, Platform } from 'react-native';
import type { ArgsType } from './@types/ArgsType';

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

export function startLiveness3d(options: ArgsType): Promise<any> {
  let args: ArgsType = {
    appkey: options?.appkey === undefined ? '' : options?.appkey,
    environment:
      options?.environment === undefined ? '.HML' : options?.environment,
    baseUrl: options?.baseUrl === undefined ? '' : options?.baseUrl,
    apparence: {
      backgroundColor:
        options?.apparence?.backgroundColor === ''
          ? '#1E1E1E'
          : options?.apparence?.backgroundColor,
      loadingColor:
        options?.apparence?.loadingColor === ''
          ? '#05D758'
          : options?.apparence?.loadingColor,
    },
    liveness3Dtext: options.liveness3Dtext || [],
  };

  if (Platform.OS === 'android') {
    return RnLiveness3d.startfacecaptcha(args.appkey);
  }

  return RnLiveness3d.startliveness3d(args);
}

export function StartLiveness3dCustomView({
  instructionView,
}: {
  instructionView: any;
}) {
  return <>{instructionView}</>;
}
