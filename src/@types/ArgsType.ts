export type ArgsType = {
  appkey: string;
  environment: '.HML' | '.PRD';
  baseUrl: string;
  apparence: ApparenceType;
  liveness3Dtext: object;
  loading: LoadingType;
};

export type ApparenceType = {
  backgroundColor: string | undefined;
  loadingColor: string | undefined;
};

export type LoadingType = {
  type: 'default' | 'spinner';
  size: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  backgroundColor: string | undefined;
  loadingColor: string | undefined;
};
