import { useEffect, type FC } from 'react';
import { useLiveness3DContext } from '../context/Liveness3DContext';
import type { Liveness3DHelperInterface } from '../interfaces/Liveness3DHelper';

export const Liveness3DHelper: FC<Liveness3DHelperInterface> = ({
  children,
  options,
  onError,
}) => {
  const { setNavigation, setOptions, setCallbackView } = useLiveness3DContext();

  useEffect(() => {
    if (
      options.appkey === null ||
      options.appkey === undefined ||
      options.appkey === ''
    ) {
      onError({ code: '0', message: 'invalidAppKey' });
    }
    setOptions(options);
  }, [options, onError, setNavigation, setOptions, setCallbackView]);

  return <>{children}</>;
};
