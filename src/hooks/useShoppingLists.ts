import { useAtom } from 'jotai';

import { fetchShoppingLists } from 'src/services/shoppingLists';
import { shoppingListsState } from 'src/store/shoppingLists';

export function useShoppingLists() {
  const [shoppingLists, setShoppingLists] = useAtom(shoppingListsState);

  const refreshShoppingLists = async () => {
    const data = await fetchShoppingLists();
    setShoppingLists(data);
  };

  return { refreshShoppingLists, setShoppingLists, shoppingLists };
}
