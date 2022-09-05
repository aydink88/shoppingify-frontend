import { useRef, useCallback, useReducer } from 'react';

import useSafeDispatch from 'src/hooks/useSafeDispatch';

type TAsyncStatus = 'pending' | 'idle' | 'resolved' | 'rejected';

type TAsyncState<T = any> = { status: TAsyncStatus; data: T; error: any };

// Example usage:
// const {data, error, status, run} = useAsync()
// useEffect(() => {
//   run(fetchData(param))
// }, [param, run])
const defaultInitialState: TAsyncState = { status: 'idle', data: null, error: null };

export default function useAsync<T = any>(initialState?: T) {
  const initialStateRef = useRef({
    ...defaultInitialState,
    ...initialState,
  });
  const [{ status, data, error }, setState] = useReducer<
    (s: TAsyncState<T>, a: Partial<TAsyncState<T>>) => TAsyncState<T>
  >((s, a) => ({ ...s, ...a }), initialStateRef.current);

  const safeSetState = useSafeDispatch(setState);

  const setData = useCallback<(args: any) => any>(
    (data) => safeSetState({ data, status: 'resolved' }),
    [safeSetState]
  );
  const setError = useCallback<(args: any) => any>(
    (error) => safeSetState({ error, status: 'rejected' }),
    [safeSetState]
  );
  const reset = useCallback(() => safeSetState(initialStateRef.current), [safeSetState]);

  const run: (p: Promise<T>) => Promise<T> = useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        );
      }
      safeSetState({ status: 'pending' });
      return promise.then(
        (data) => {
          setData(data);
          return data;
        },
        (error) => {
          setError(error);
          return Promise.reject(error);
        }
      );
    },
    [safeSetState, setData, setError]
  );

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}
