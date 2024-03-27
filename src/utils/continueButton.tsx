import { verifyPermission } from './permissions';

export const continueButton = async (): Promise<boolean> => {
  return verifyPermission()
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
};
