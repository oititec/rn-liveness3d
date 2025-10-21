import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { useLiveness3DContext } from '../context/Liveness3DContext';
import type { OitiPermissionButtonInterface } from '../interfaces/OitiPermissionButtonInterface';

export const PermissionButton: React.FC<OitiPermissionButtonInterface> = ({
  children,
  ...props
}) => {
  const touchableOpacityRef = useRef(null);
  const { onRequestCameraPermission } = useLiveness3DContext();

  const handlePress = () => {
    onRequestCameraPermission();
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
