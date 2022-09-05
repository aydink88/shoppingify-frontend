import { useAtom } from 'jotai';

import { notificationState } from 'src/store/notification';
import type { TNotificationState } from 'src/types';

export default function useNotification() {
  const [state, setState] = useAtom(notificationState);

  const setNotification = (options: Partial<TNotificationState>) =>
    setState((state) => ({ ...state, ...options }));

  // useEffect(() => {
  //   let timer: NodeJS.Timeout;
  //   if (state.message) {
  //     timer = setTimeout(() => {
  //       setNotification({ message: '' });
  //     }, 2000);
  //   }
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [state.message]);

  return { setNotification, state };
}
