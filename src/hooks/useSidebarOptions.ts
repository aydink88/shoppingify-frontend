import { useAtom, useAtomValue } from 'jotai';

import { isSidebarVisibleGetter, sidebarState } from 'src/store/sidebar';
import type { TSidebarMode, TSidebarState } from 'src/types';

export default function useSidebarOptions() {
  const [state, setState] = useAtom(sidebarState);
  const isSidebarVisible = useAtomValue(isSidebarVisibleGetter);

  const setIsMobile = (isMobile: boolean) => setState((prev) => ({ ...prev, isMobile }));

  const setSidebarMode = (mode: TSidebarMode) =>
    setState((prev) => ({ ...prev, mode, isActivated: true }));

  const setSidebarActivity = (isActivated: boolean) =>
    setState((prev) => ({ ...prev, isActivated }));

  const setSidebarState = (patch: Partial<TSidebarState>) =>
    setState((prev) => ({ ...prev, ...patch }));

  const toggleShoppingList = () => {
    setState((prev) => ({ ...prev, isActivated: !prev.isActivated }));
  };

  return {
    state,
    setIsMobile,
    setSidebarMode,
    isSidebarVisible,
    setSidebarActivity,
    setSidebarState,
    toggleShoppingList,
  };
}
