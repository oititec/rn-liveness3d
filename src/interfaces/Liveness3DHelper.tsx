import type { ReactNode } from 'react';
import type { onErrorType } from '../@types/ResultType';
import type { ArgsType } from '../@types/ArgsType';

export interface Liveness3DHelperInterface {
  options: ArgsType;
  onError: (error: onErrorType) => void;
  children?: ReactNode;
}
