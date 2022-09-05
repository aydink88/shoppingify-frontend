import { atom } from 'jotai';

import type { TItemData } from 'src/types';

export const selectedItemState = atom<TItemData>({
  _id: '',
  name: '',
  note: '',
  image: '',
  category: { name: '' },
});
