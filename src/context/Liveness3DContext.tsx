import { startLiveness3d } from '../index';
import React, { createContext, type FC, useContext, useState } from 'react';
import type { ArgsType } from '../@types/ArgsType';
import type { onErrorType, onSuccessType } from '../@types/ResultType';
import type { ResultType } from '../@types/ResultTypes';
import { requestCameraPermission } from '../utils/permissions';

export const SCREEN = Object.freeze({
  INSTRUCTION_VIEW: 1,
  PERMISSION_VIEW: 2,
} as const);

interface Liveness3DContextType {
  screen: number;
  setScreen: React.Dispatch<React.SetStateAction<number>>;
  navigation: any;
  setNavigation: React.Dispatch<React.SetStateAction<any>>;
  options: ArgsType | undefined;
  setOptions: React.Dispatch<React.SetStateAction<ArgsType | undefined>>;
  onLiveness3DError: (error: onErrorType) => void;
  onLiveness3DSuccess: (result: onSuccessType) => void;
  onBack: () => any;
  onRequestCameraPermission: () => any;
  startLiveness: () => any;
  callbackView: string;
  setCallbackView: React.Dispatch<React.SetStateAction<string>>;
}

const Liveness3DContext = createContext<Liveness3DContextType | undefined>(
  undefined
);

export const Liveness3DProvider: FC<ResultType> = ({
  children,
  onError,
  onSuccess,
}) => {
  const [screen, setScreen] = useState<number>(1);
  const [navigation, setNavigation] = useState<any>();
  const [options, setOptions] = useState<ArgsType>();
  const [callbackView, setCallbackView] = useState<string>('');

  const onLiveness3DError = (error: onErrorType) => {
    onError(error);
  };

  const onLiveness3DSuccess = (result: onSuccessType) => {
    onSuccess(result);
  };

  function onBack() {
    switch (screen) {
      case SCREEN.INSTRUCTION_VIEW:
        onLiveness3DError({ code: '0', message: 'RESULT_CANCELED' });
        break;
      case SCREEN.PERMISSION_VIEW:
        setScreen(1);
        break;
    }
  }

  function startLiveness() {
    if (options) {
      startLiveness3d(options, onSuccess, onError);
    }
  }

  function onRequestCameraPermission() {
    requestCameraPermission().then((result) => {
      result === true && startLiveness();
      result === false && setScreen(1);
    });
  }

  const contextValue: Liveness3DContextType = {
    screen,
    setScreen,
    navigation,
    setNavigation,
    onLiveness3DError,
    onLiveness3DSuccess,
    onBack,
    options,
    setOptions,
    startLiveness,
    onRequestCameraPermission,
    callbackView,
    setCallbackView,
  };

  return (
    //@ts-ignore
    <Liveness3DContext.Provider value={contextValue}>
      {children}
    </Liveness3DContext.Provider>
  );
};

export const useLiveness3DContext = (): Liveness3DContextType => {
  const context = useContext(Liveness3DContext);
  if (!context) {
    throw new Error(
      'useLiveness3DContext must be used within a Liveness3DProvider'
    );
  }
  return context;
};

export default Liveness3DContext;
