import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { useLiveness3DContext } from '../context/Liveness3DContext';
import type { OitiBackButtonInterface } from '../interfaces/OitiBackButtonInterface';

export const BackButton: React.FC<OitiBackButtonInterface> = ({
  children,
  ...props
}) => {
  const touchableOpacityRef = useRef(null);
  const { onBack } = useLiveness3DContext();

  const handlePress = () => {
    onBack();
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
