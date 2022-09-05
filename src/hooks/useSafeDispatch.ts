import { useCallback, useLayoutEffect, useRef } from 'react';

// prevent updating unmounted component
export default function useSafeDispatch<T = any, U = any>(dispatch: (...args: T[]) => U) {
  const mounted = useRef(false);
  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return useCallback<(args: any) => any>(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch]
  );
}
