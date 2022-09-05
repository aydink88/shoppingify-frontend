import { atom } from 'jotai';

import type { TShoppingList } from 'src/types';

export const activeShoppingListState = atom<TShoppingList>({
  _id: '',
  name: '',
  items: {},
  status: 'active',
});

export const activeShoppingListLengthGetter = atom((get) => {
  const list = get(activeShoppingListState);
  let length = 0;
  for (const itemWithCat in list.items) {
    length += list.items[itemWithCat].length;
  }
  return length;
});
