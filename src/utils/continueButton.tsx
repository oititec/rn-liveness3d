import { checkCameraPermissionGranted } from './permissions';

export const continueButton = (): boolean => {
  return checkCameraPermissionGranted();
};
