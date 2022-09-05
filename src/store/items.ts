import { atom } from 'jotai';

import type { TItemData } from 'src/types';

export const itemsState = atom<TItemData[]>([]);

export const categoriesAndItemsState = atom<{
  categories: string[];
  itemsGroupedByCategory: [string, TItemData[]][];
}>((get) => {
  const catNames = new Set<string>();
  const items = get(itemsState);
  items.forEach((item) => catNames.add(item.category.name));

  const itemsGroupedByCategory: [string, TItemData[]][] = [];

  catNames.forEach((categoryName) => {
    itemsGroupedByCategory.push([
      categoryName,
      items.filter((item) => item.category.name === categoryName),
    ]);
  });
  return { categories: Array.from(catNames), itemsGroupedByCategory };
});

export const removeItemFromState = atom(null, (get, set, id) => {
  const currentItems = get(itemsState);
  const items = currentItems.slice();
  const foundIndex = items.findIndex((v) => v._id === id);
  if (foundIndex > -1) {
    items.splice(foundIndex, 1);
  }
  set(itemsState, items);
});

// export const removeItemFromState = (id: string) => {
//   return (currentItems: TItemData[]) => {
//     const items = currentItems.slice();
//     const foundIndex = items.findIndex((v) => v._id === id);
//     if (foundIndex === -1) return currentItems;
//     items.splice(foundIndex, 1);
//     return items;
//   };
// };
