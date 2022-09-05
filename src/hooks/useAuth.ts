import { useAtom } from 'jotai';

import { authState } from 'src/store/auth';
import type { TAuthState } from 'src/types';

export default function useAuth() {
  const [auth, setState] = useAtom(authState);

  const setAuth = (patch: Partial<TAuthState>) => setState((prev) => ({ ...prev, ...patch }));

  return { userId: auth?.id, auth, setAuth };
}
