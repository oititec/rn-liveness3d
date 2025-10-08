import { ReactNode } from 'react';
import { onErrorType, onSuccessType } from './ResultType';

export type ResultType = {
  onSuccess: (result: onSuccessType) => void;
  onError: (error: onErrorType) => void;
  children?: ReactNode;
};
