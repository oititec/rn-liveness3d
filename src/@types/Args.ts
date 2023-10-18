import type { ApparenceType } from './Apparence';
import type { Liveness3DThemeType } from './Liveness3DTheme';
import type { LoadingType } from './Loading';

export type ArgsType = {
  appkey: string;
  environment: '.HML' | '.PRD';
  baseUrl: string;
  apparence: ApparenceType;
  liveness3Dtext: object;
  liveness3Dtheme: Liveness3DThemeType[];
  loading: LoadingType;
};
