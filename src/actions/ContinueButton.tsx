import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { useLiveness3DContext } from '../context/Liveness3DContext';
import { continueButton } from '../utils/continueButton';
import type { OitiContinueButtonInterface } from '../interfaces/OitiContinueButton';

export const ContinueButton: React.FC<OitiContinueButtonInterface> = ({
  children,
  ...props
}) => {
  const touchableOpacityRef = useRef(null);
  const { setScreen, startLiveness } = useLiveness3DContext();

  function onContinue() {
    if (continueButton() === true) {
      startLiveness();
    } else {
      setScreen(2);
    }
  }

  const handlePress = () => {
    onContinue();
  };

  return (
    //@ts-ignore
    <TouchableOpacity
      ref={touchableOpacityRef}
      onPress={handlePress}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};
