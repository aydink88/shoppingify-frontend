import { groupItemsOfShoppingList, prepareActiveShoppingList } from 'src/utils/shoppingList';

import client from './client';
import { getAllItems } from './items';
import { fetchShoppingList } from './shoppingLists';

export const loginOrRegister = async (
  email: string,
  password: string,
  todo: 'login' | 'register'
) => {
  localStorage.clear();
  const endpoint = todo === 'register' ? '/auth/register' : '/auth/login';
  const response: any = await client.post(endpoint, {
    email,
    password,
  });
  const { user, token } = response.data;
  localStorage.setItem('token', token);
  return user;
};

export const verifyToken = async () => {
  if (!localStorage.getItem('token')) {
    throw { message: '' };
  }
  const { data }: any = await client.get('/auth/me');

  return data.user;
};

export const autoFetchData = async (): Promise<any> => {
  try {
    const userData = await verifyToken();
    const items = await getAllItems();
    let activeList = prepareActiveShoppingList(userData.shopping_lists);
    if (activeList._id) {
      const activeListData = await fetchShoppingList(activeList._id);
      if (activeListData) {
        activeList = groupItemsOfShoppingList(activeListData);
      }
    }

    return { userData, items, activeList };
  } catch (err: any) {
    localStorage.removeItem('token');
    throw err;
  }
};
