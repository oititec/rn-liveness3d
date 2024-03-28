export type onSuccessType = {
  valid: boolean;
  cause: string;
  codId: string;
  protocol: string;
  blob: string;
};

export type onErrorType = {
  code: string;
  message: string;
  error?: Error;
};
