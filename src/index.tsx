import type { FC } from 'react';
import { Platform } from 'react-native';
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
import {
  checkCameraPermissionGranted,
  requestCameraPermission,
} from './utils/permissions';
import RnLiveness3d from './NativeRnLiveness3d';

export function startLiveness3d(
  options: ArgsType,
  onSuccess: (result: onSuccessType) => void,
  onError: (error: onErrorType) => void,
  loading?: LoadingType
) {
  let args: ArgsType = {
    appkey: options?.appkey === undefined ? '' : options?.appkey,
    environment:
      options?.environment === undefined ? 'HML' : options?.environment,
    liveness3Dtext: options?.liveness3Dtext || {},
    theme: options?.theme || {},
    fonts: options?.fonts || {},
    loading: loading,
  };

  RnLiveness3d.startLiveness3d(args)
    .then((result) => {
      if (Platform.OS === 'android') {
        onSuccess(JSON.parse(result) as onSuccessType);
      } else {
        onSuccess(result as onSuccessType);
      }
    })
    .catch((error) => onError(error as onErrorType));
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
      if (checkCameraPermissionGranted() === true) {
        startLiveness3d(options, onSuccess, onError, loading);
      } else {
        setScreen(2);
      }
    }
    if (screen === 2) {
      await requestCameraPermission();
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
export type { onErrorType, onSuccessType } from './@types/ResultType';
export type { ArgsType, LoadingType } from './@types/ArgsType';
export type { FontsType } from './@types/FontsType';
export type { ThemeType } from './@types/ThemeType';
