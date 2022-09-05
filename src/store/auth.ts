import { atom } from 'jotai';

import type { TAuthState } from 'src/types';

export const authState = atom<TAuthState>({ id: '', email: '' });
