import RnLiveness3d from '../NativeRnLiveness3d';

export function checkCameraPermissionGranted(): boolean {
  return RnLiveness3d.checkCameraPermissionGranted();
}

export function requestCameraPermission(): Promise<boolean> {
  return new Promise((resolve, _reject) => {
    RnLiveness3d.requestCameraPermission((result) => {
      resolve(result);
    });
  });
}
