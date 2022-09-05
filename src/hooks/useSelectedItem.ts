import { useAtom } from 'jotai';

import { selectedItemState } from 'src/store/selectedItem';

export function useSelectedItem() {
  const [selectedItem, setSelectedItem] = useAtom(selectedItemState);

  return { selectedItem, setSelectedItem };
}
