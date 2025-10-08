import React, { FC } from 'react';
import { NativeModules, Platform } from 'react-native';
import type { ArgsType, LoadingType } from './@types/ArgsType';
import InstructionsView from './screens/Liveness3D/InstructionsView';
import PermissionView from './screens/PermissionView';
import type { onErrorType, onSuccessType } from './@types/ResultType';
import {
  Liveness3DProvider,
  SCREEN,
  useLiveness3DContext,
} from './context/Liveness3DContext';
import { Liveness3DHelper } from './helpers/Liveness3DHelper';

const LINKING_ERROR =
  `The package '@oiti/rn-liveness3d' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

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

export function startLiveness3d(
  options: ArgsType,
  loading?: LoadingType
): Promise<onErrorType | onSuccessType> {
  let args: ArgsType = {
    appkey: options?.appkey === undefined ? '' : options?.appkey,
    ticket: options?.ticket,
    environment:
      options?.environment === undefined ? 'HML' : options?.environment,
    liveness3Dtext: options?.liveness3Dtext || {},
    theme: options?.theme || {},
    fonts: options?.fonts || {},
    loading: loading,
  };

  if (Platform.OS === 'android') {
    return RnLiveness3d.startliveness3d(
      args.appkey,
      args.ticket,
      loading?.type ? loading?.type : 'default',
      loading?.size ? loading?.size * 200 : 1 * 200,
      loading?.backgroundColor ? loading?.backgroundColor : '#333333',
      loading?.loadingColor ? loading?.loadingColor : '#05D758',
      args?.theme,
      args?.fonts,
      args?.liveness3Dtext,
      args?.environment
    );
  }
  return RnLiveness3d.startliveness3d(args);
}

export function checkIosPermission(): Promise<any> {
  return RnLiveness3d.checkiospermission({ p: 'granted' });
}
export function checkIosPermissionGranted(): Promise<any> {
  return RnLiveness3d.checkpermissiongranted({ p: 'granted' });
}

export function checkcamerapermissionAndroid(): Promise<any> {
  return RnLiveness3d.checkcamerapermission();
}
export function askcamerapermissionAndroid(): Promise<any> {
  return RnLiveness3d.askcamerapermission();
}

export const requestCameraPermission = async (
  options: ArgsType,
  onSuccess: (result: onSuccessType) => void,
  onError: (error: onErrorType) => void,
  loading?: LoadingType
) => {
  if (Platform.OS === 'ios') {
    checkIosPermission().then(async (result) => {
      if (result === true) {
        await startLiveness3d(options, loading)
          .then((result) => {
            if (Platform.OS == 'android') {
              //@ts-ignore
              onSuccess(JSON.parse(result) as onSuccessType);
            } else {
              onSuccess(result as onSuccessType);
            }
          })
          .catch((error) => onError(error as onErrorType));
      }
      if (result === false) {
        return;
      }
    });
  }

  if (Platform.OS === 'android') {
    try {
      await askcamerapermissionAndroid().then(async (res) => {
        if (res === true) {
          await startLiveness3d(options, loading)
            .then((result) => {
              if (Platform.OS == 'android') {
                //@ts-ignore
                onSuccess(JSON.parse(result) as onSuccessType);
              } else {
                onSuccess(result as onSuccessType);
              }
            })
            .catch((error) => onError(error as onErrorType));
        } else {
          console.log('Camera permission denied');
        }
      });
    } catch (err) {
      console.warn(err);
    }
  }
};

async function checkPermission(): Promise<boolean> {
  if (Platform.OS === 'ios') {
    const grantediso = await checkIosPermissionGranted();
    if (grantediso === true) {
      return true;
    }
    if (grantediso === false) {
      return false;
    }
  }
  const granted = await checkcamerapermissionAndroid();
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
  loading,
  onSuccess,
  onError,
  onBack,
}: {
  CustomInstructionView?: FC;
  CustomPermissionView?: FC;
  options: ArgsType;
  loading: LoadingType;
  onSuccess: (result: onSuccessType) => void;
  onError: (error: onErrorType) => void;
  onBack: () => void;
}) {
  return (
    //@ts-ignore
    <Liveness3DProvider onError={onError} onSuccess={onSuccess}>
      <Liveness3DHelper options={options} onError={onError}>
        <GetIntructionView
          CustomInstructionView={CustomInstructionView}
          CustomPermissionView={CustomPermissionView}
          options={options}
          loading={loading}
          onSuccess={onSuccess}
          onError={onError}
          onBack={onBack}
        />
      </Liveness3DHelper>
    </Liveness3DProvider>
  );
}

export function GetIntructionView({
  CustomInstructionView,
  CustomPermissionView,
  options,
  loading,
  onSuccess,
  onError,
  onBack,
}: {
  CustomInstructionView?: FC;
  CustomPermissionView?: FC;
  options: ArgsType;
  loading: LoadingType;
  onSuccess: (result: onSuccessType) => void;
  onError: (error: onErrorType) => void;
  onBack: () => void;
}) {
  const { setScreen, screen } = useLiveness3DContext();

  function onBackScreen() {
    switch (screen) {
      case SCREEN.INSTRUCTION_VIEW:
        onBack();
        break;
      case SCREEN.PERMISSION_VIEW:
        setScreen(1);
        break;
    }
  }
  async function verifyPermission() {
    if (screen === 1) {
      if ((await checkPermission()) === true) {
        startLiveness3d(options, loading)
          .then((result) => {
            if (Platform.OS == 'android') {
              //@ts-ignore
              onSuccess(JSON.parse(result) as onSuccessType);
            } else {
              onSuccess(result as onSuccessType);
            }
          })
          .catch((error) => onError(error as onErrorType));
      } else {
        setScreen(2);
      }
    }
    if (screen === 2) {
      await requestCameraPermission(options, onSuccess, onError);
      setScreen(1);
    }
  }

  return (
    <>
      {screen === 1 &&
        (!CustomInstructionView ? (
          <InstructionsView onVerify={verifyPermission} onBack={onBackScreen} />
        ) : (
          <CustomInstructionView />
        ))}

      {screen === 2 &&
        (!CustomPermissionView ? (
          <PermissionView onVerify={verifyPermission} onBack={onBackScreen} />
        ) : (
          <CustomPermissionView />
        ))}
    </>
  );
}

export { ContinueButton } from './actions/ContinueButton';
export { PermissionButton } from './actions/PermissionButton';
export { BackButton } from './actions/BackButton';
