import { atom } from 'jotai';

import type { TSidebarState } from 'src/types';

export const sidebarState = atom<TSidebarState>({
  mode: 'EDIT_AMOUNTS',
  isMobile: false,
  isActivated: false,
});

// sidebar always should be visible on desktop
// isActivated takes over on mobile.
export const isSidebarVisibleGetter = atom<boolean>((get) => {
  const { isMobile, isActivated } = get(sidebarState);
  return isMobile ? isActivated : true;
});
