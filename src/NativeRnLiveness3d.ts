import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  checkCameraPermissionGranted(): boolean;
  requestCameraPermission(resolve: (result: boolean) => void): void;
  startLiveness3d(args: Object): Promise<any>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RnLiveness3d');
