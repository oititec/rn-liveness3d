import { onErrorType } from '../@types/ResultType';
import { ArgsType } from '../@types/ArgsType';

export interface Liveness3DHelperInterface {
  options: ArgsType;
  onError: (error: onErrorType) => void;
}
