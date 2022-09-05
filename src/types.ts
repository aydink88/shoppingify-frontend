import { Variant } from 'react-bootstrap/esm/types';

export type TAuthState = { id: string; email: string };

export type TItemData = {
  _id: string;
  name: string;
  note: string;
  image: string;
  category: { name: string };
};

export type TShoppingListItem = { item: TItemData; amount: number; done: boolean };

export type TShoppingListWithoutItems = {
  name: string;
  status: TShoppingListStatus;
  _id: string;
  createdAt?: number;
};

type TShoppingListStatus = 'completed' | 'cancelled' | 'active';

export type TShoppingList = TShoppingListWithoutItems & {
  items: { [category: string]: TShoppingListItem[] };
};

export type TShoppingListUpdateInfo = { name?: string; status?: TShoppingListStatus };

export type TShoppingListData = TShoppingListWithoutItems & { items: TShoppingListItem[] };

export type TSidebarMode = 'ADD_ITEM' | 'SHOW_ITEM' | 'EDIT_AMOUNTS' | 'TOGGLE_DONE';

export type TSidebarState = {
  mode: TSidebarMode;
  isMobile: boolean;
  isActivated: boolean;
};

export type TUserData = {
  _id: string;
  email: string;
  shopping_lists: TShoppingListData[];
};

export type TNotificationState = { message: string; variant: Variant };
