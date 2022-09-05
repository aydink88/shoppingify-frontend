import type {
  TShoppingList,
  TShoppingListData,
  TShoppingListItem,
  TShoppingListWithoutItems,
} from 'src/types';

// prepare list data coming from backend
export function prepareActiveShoppingList(
  listsFromData: TShoppingListWithoutItems[]
): TShoppingList {
  let listForActiveListState: TShoppingListWithoutItems | undefined;

  for (const list of listsFromData) {
    if (!listForActiveListState && list.status === 'active') {
      listForActiveListState = list;
      break;
    }
  }

  // if there is an active list, items will be fetched later
  //const items={} as
  return listForActiveListState
    ? { ...listForActiveListState, items: {} }
    : {
        _id: '',
        name: 'Shopping List',
        items: {},
        status: 'active',
      };
}

// group list items by categories to fit into state
export function groupItemsOfShoppingList(list: TShoppingListData): TShoppingList {
  const newItems = {} as { [category: string]: TShoppingListItem[] };
  if (list.items?.length) {
    for (const item of list.items) {
      const category = item.item.category.name;
      if (category in newItems) {
        newItems[category].push(item);
      } else {
        newItems[category] = [item];
      }
    }
  }
  return {
    name: list.name,
    status: list.status,
    items: newItems,
    _id: list._id,
    createdAt: list.createdAt,
  };
}

export function mapShoppingListToSave(list: TShoppingList): TShoppingListData {
  //if (!Object.keys(list.items).length) return;
  const newItems: any = [];
  for (const categoryName in list.items) {
    list.items[categoryName].forEach((listItem) => {
      const newItem = { done: listItem.done, amount: listItem.amount, item: listItem.item._id };
      newItems.push(newItem);
    });
  }
  return { name: list.name, status: list.status, items: newItems, _id: list._id };
}

export function formatDate(date: number) {
  const formatter = new Intl.DateTimeFormat([], {
    weekday: 'short',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
  return formatter.format(new Date(date));
}
