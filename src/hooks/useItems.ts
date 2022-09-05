import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { categoriesAndItemsState, itemsState, removeItemFromState } from 'src/store/items';
import type { TItemData } from 'src/types';

export function useItems() {
  const [items, setState] = useAtom(itemsState);

  const setItems = (items: TItemData[]) => setState(items);

  const addNewItem = (item: TItemData) => setState((prev) => [...prev, item]);

  const removeItem = useSetAtom(removeItemFromState);

  const { categories, itemsGroupedByCategory } = useAtomValue(categoriesAndItemsState);

  const findItemsByName = (searchTerm: string, howMany = 5) => {
    const results: TItemData[] = [];
    for (const i of items) {
      if (i.name.includes(searchTerm)) {
        results.push(i);
      }
      if (results.length >= howMany) break;
    }
    return results;
  };

  return {
    setItems,
    addNewItem,
    removeItem,
    items,
    findItemsByName,
    categories,
    itemsGroupedByCategory,
  };
}
