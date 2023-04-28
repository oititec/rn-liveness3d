import React, { FC, useEffect, useState } from 'react';
import { NativeModules, Platform, PermissionsAndroid } from 'react-native';
import type { ArgsType } from './@types/ArgsType';
import InstructionsView from './screens/Liveness3D/InstructionsView';
import PermissionView from './screens/PermissionView';

const LINKING_ERROR =
  `The package '@oiti/rn-liveness3d' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const SCREEN = Object.freeze({
  INSTRUCTION_VIEW: 1,
  PERMISSION_VIEW: 2,
} as const);

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
    return RnLiveness3d.startliveness3d(args.appkey);
  }

  return RnLiveness3d.startliveness3d(args);
}

export function logEvent3D(name: string, appkey: string): Promise<any> {
  return RnLiveness3d.logevent(name, appkey);
}

const PERMISSIONS_REQUEST: any = PermissionsAndroid.PERMISSIONS.CAMERA;

const requestCameraPermission = async (options: ArgsType) => {
  try {
    const granted = await PermissionsAndroid.request(PERMISSIONS_REQUEST, {
      title: 'Cool Photo App Camera Permission',
      message: 'Precisamos acessar sua cãmera ',
      buttonNeutral: 'Ver Depois',
      buttonNegative: 'Cancelar',
      buttonPositive: 'OK',
    });

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      startLiveness3d(options).then((result) => console.log(result));
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

async function checkPermission(): Promise<boolean> {
  const granted = await PermissionsAndroid.check(PERMISSIONS_REQUEST);
  if (granted) {
    return true;
  } else {
    return false;
  }
}

export function Liveness3dView({
  CustomInstructionView,
  CustomPermissionView,
  options,
}: {
  CustomInstructionView: FC;
  CustomPermissionView: FC;
  options: ArgsType;
}) {
  return (
    <GetIntructionView
      CustomInstructionView={CustomInstructionView}
      CustomPermissionView={CustomPermissionView}
      options={options}
    />
  );
}

export function GetIntructionView({
  CustomInstructionView,
  CustomPermissionView,
  options,
}: {
  CustomInstructionView: FC;
  CustomPermissionView: FC;
  options: ArgsType;
}) {
  const [screen, setScreen] = useState(1);

  function onBack() {
    switch (screen) {
      case SCREEN.INSTRUCTION_VIEW:
        setScreen(1);
        break;
      case SCREEN.PERMISSION_VIEW:
        setScreen(1);
        break;
    }
  }
  async function verifyPermission() {
    if (screen === 1) {
      logEvent3D('ACTION_L3FT_instructionContinue', options.appkey);
      if ((await checkPermission()) === true) {
        startLiveness3d(options).then((result) => console.log(result));
      } else {
        setScreen(2);
      }
    }
    if (screen === 2) {
      requestCameraPermission(options);
      logEvent3D('ACTION_L3FT_permissionVerify', options.appkey);
    }
  }
  useEffect(() => {
    if (screen === 1) {
      logEvent3D('STATE_L3FT_instructionView', options.appkey);
    }
    if (screen === 2) {
      logEvent3D('STATE_L3FT_permissionView', options.appkey);
    }
  });

  return (
    <>
      {screen === 1 &&
        (!CustomInstructionView ? (
          <InstructionsView onVerify={verifyPermission} onBack={onBack} />
        ) : (
          CustomInstructionView
        ))}

      {screen === 2 &&
        (!CustomPermissionView ? (
          <PermissionView onVerify={verifyPermission} onBack={onBack} />
        ) : (
          CustomPermissionView
        ))}
    </>
  );
}
