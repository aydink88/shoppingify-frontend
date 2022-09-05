import { useAtom } from 'jotai';

import { activeShoppingListState } from 'src/store/activeShoppingList';
import type {
  TItemData,
  TShoppingList,
  TShoppingListItem,
  TShoppingListUpdateInfo,
} from 'src/types';

export default function useActiveShoppingListState() {
  const [activeShoppingList, setActiveShoppingList] = useAtom(activeShoppingListState);

  const findExistingItemIndex = (selectedItem: TItemData) => {
    return activeShoppingList.items[selectedItem.category.name]?.findIndex(
      (v) => v.item._id === selectedItem._id
    );
  };

  const addItemToActiveShoppingList = (item: TItemData) => {
    const existingItemIndex = findExistingItemIndex(item);
    if (existingItemIndex > -1) return;
    setActiveShoppingList(addItem({ item, amount: 1, done: false }));
  };

  const removeItemFromActiveShoppingList = (category: string, id: string) => {
    setActiveShoppingList(removeItem(category, id));
  };

  const changeAmountOfItem = (
    category: string,
    index: number,
    operation: 'increase' | 'decrease'
  ) => {
    setActiveShoppingList(changeAmount(category, index, operation));
  };

  const itemToggleDone = (category: string, index: number) =>
    setActiveShoppingList(toggleDone(category, index));

  const updateActiveShoppingListInfo = (patch: TShoppingListUpdateInfo) =>
    setActiveShoppingList(updateListInfo(patch));

  const resetActiveShoppingListState = () => setActiveShoppingList(resetActiveShoppingList());

  return {
    activeShoppingList,
    setActiveShoppingList,
    addItemToActiveShoppingList,
    removeItemFromActiveShoppingList,
    changeAmountOfItem,
    updateActiveShoppingListInfo,
    itemToggleDone,
    resetActiveShoppingListState,
  };
}

// closures returning setState argument functions
function addItem(item: TShoppingListItem) {
  return (currentList: TShoppingList) => {
    const categoryName = item.item.category.name;
    const existingItemsWithCategoryKey = currentList.items[categoryName] || [];
    return {
      ...currentList,
      items: {
        ...currentList.items,
        [categoryName]: [...existingItemsWithCategoryKey, item],
      },
    };
  };
}

function removeItem(category: string, id: string) {
  return (currentList: TShoppingList) => {
    const list: TShoppingList = JSON.parse(JSON.stringify(currentList));
    if (list.items[category]) {
      const index = list.items[category].findIndex((v) => v.item._id === id);
      if (index > -1) list.items[category].splice(index, 1);
    }

    return list;
  };
}

function changeAmount(category: string, index: number, operation: 'increase' | 'decrease') {
  return (currentList: TShoppingList) => {
    const list = JSON.parse(JSON.stringify(currentList));
    const item = list.items[category][index];
    if (operation === 'decrease' && item.amount > 0) {
      item.amount--;
    } else if (item.amount !== 0) {
      item.amount++;
    }
    return list;
  };
}

function toggleDone(category: string, index: number) {
  return (currentList: TShoppingList) => {
    const list = JSON.parse(JSON.stringify(currentList));
    const item = list.items[category][index];
    item.done = !item.done;
    return list;
  };
}

//update name or status
function updateListInfo(updateObject: TShoppingListUpdateInfo) {
  return (currentList: TShoppingList) => ({ ...currentList, ...updateObject });
}

function resetActiveShoppingList(): TShoppingList {
  return { _id: '', name: 'Shopping List', items: {}, status: 'active' };
}
