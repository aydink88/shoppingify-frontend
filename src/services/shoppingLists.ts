import type { TShoppingListData, TShoppingListWithoutItems } from 'src/types';

import client from './client';

export const saveShoppingList = async (list: Partial<TShoppingListData>) => {
  // if it has id it already exists in database, so send update request
  let response: { data: TShoppingListData };
  if (list._id) {
    response = await client.put(`/shoppinglist/${list._id}`, list);
  } else {
    response = await client.post('/shoppinglist', list);
  }
  return response.data;
};

export const fetchShoppingLists = async () => {
  const response: { data: TShoppingListWithoutItems[] } = await client.get('/shoppinglist');
  return response.data;
};

export const fetchShoppingList = async (id: string) => {
  const response: { data: TShoppingListData } = await client.get(`/shoppinglist/${id}`);

  return response.data;
};

export const updateActiveListItem = async (
  listId: string,
  patch: { _id: string; amount: number; done: boolean }
) => {
  const response: any = await client.put(`shoppinglist/${listId}/updateitem`, patch);

  if (!response.data) throw new Error('connection problem');
  return response.data;
};
