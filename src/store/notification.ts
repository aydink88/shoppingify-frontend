import { atom } from 'jotai';

import type { TNotificationState } from 'src/types';

export const notificationState = atom<TNotificationState>({
  message: '',
  variant: 'info',
});
