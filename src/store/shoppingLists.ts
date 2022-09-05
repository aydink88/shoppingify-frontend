import { atom } from 'jotai';

import type { TShoppingListWithoutItems } from 'src/types';

export const shoppingListsState = atom<TShoppingListWithoutItems[]>([]);
