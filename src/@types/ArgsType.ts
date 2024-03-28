import { FontsType } from './FontsType';
import { TextsType } from './TextsType';
import { ThemeType } from './ThemeType';

export type ArgsType = {
  appkey: string;
  ticket?: string | null;
  environment: 'HML' | 'PRD';
  liveness3Dtext?: TextsType;
  theme?: ThemeType;
  fonts?: FontsType;
  loading?: LoadingType;
};

export type LoadingType = {
  type: 'default' | 'spinner';
  size: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  backgroundColor: string | undefined;
  loadingColor: string | undefined;
};
