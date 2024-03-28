import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { useLiveness3DContext } from '../context/Liveness3DContext';
import { OitiPermissionButtonInterface } from '../interfaces/OitiPermissionButtonInterface';

export const PermissionButton: React.FC<OitiPermissionButtonInterface> = ({
  children,
  ...props
}) => {
  const touchableOpacityRef = useRef(null);
  const { onAskPermission } = useLiveness3DContext();

  const handlePress = () => {
    onAskPermission();
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
