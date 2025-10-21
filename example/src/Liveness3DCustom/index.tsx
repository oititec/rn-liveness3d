import { Liveness3dView } from '@oiti/rn-liveness3d';
import { Alert } from 'react-native';
import type { onErrorType, onSuccessType } from '@oiti/rn-liveness3d';
import PermissionView from '../screens/PermissionView';
import InstructionsView from '../screens/InstructionsView';

export default function Liveness3DCustom({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { options, loading, theme, fonts, texts } = route.params;

  const newOptions = {
    ...options,
    theme: theme ? theme : {},
    fonts: fonts ? fonts : {},
    liveness3Dtext: texts ? texts : {},
  };

  const onResultSuccess = (result: onSuccessType) => {
    console.log(result);
    navigation.navigate('Home');
    alertBox(
      `
    valid: ${result.valid.toString()};
    cause: ${result.cause};
    codId: ${result.codId};
    protocol: ${result.protocol};
    blob: ${result.blob};
    `,
      false
    );
  };

  const onResultError = (error: onErrorType) => {
    console.log(error);
    navigation.navigate('Home');
    alertBox(error.message.toString(), true);
  };

  const onBack = () => {
    console.log('RESULT_CANCELED');
    navigation.navigate('Home');
    alertBox('RESULT_CANCELED', true);
  };

  const alertBox = (message: string, error: boolean) => {
    console.log(message);
    Alert.alert(error ? 'Erro' : 'Sucesso', `${message}`, [{ text: 'OK' }]);
  };
  return (
    <Liveness3dView
      options={newOptions}
      loading={loading ? loading : {}}
      CustomInstructionView={InstructionsView}
      CustomPermissionView={PermissionView}
      onSuccess={onResultSuccess}
      onError={onResultError}
      onBack={onBack}
    />
  );
}
