import { useRef, useState } from 'react';
import { Image, Stack, Button, InputGroup, FormControl } from 'react-bootstrap';
import { MdAdd, MdDelete, MdEdit, MdRemove } from 'react-icons/md';
import appSvg from 'src/assets/app.svg';
import useActiveShoppingListState from 'src/hooks/useActiveShoppingList';
import useNotification from 'src/hooks/useNotification';
import { useShoppingLists } from 'src/hooks/useShoppingLists';
import useSidebarOptions from 'src/hooks/useSidebarOptions';
import { saveShoppingList } from 'src/services/shoppingLists';
import { mapShoppingListToSave } from 'src/utils/shoppingList';

import CallToActionAddItem from './CallToActionAddItem';

export default function EditAmounts() {
  const { setSidebarMode } = useSidebarOptions();

  const {
    activeShoppingList,
    removeItemFromActiveShoppingList,
    changeAmountOfItem,
    updateActiveShoppingListInfo,
  } = useActiveShoppingListState();
  const { refreshShoppingLists } = useShoppingLists();

  const [itemToEdit, setItemToEdit] = useState<string>('');
  const shoppingListInputNameRef = useRef<HTMLInputElement>(null);

  const { setNotification } = useNotification();

  const switchToToggleDoneMode = () => {
    if (activeShoppingList._id) {
      setSidebarMode('TOGGLE_DONE');
    } else {
      setNotification({ message: 'You should save the current list before editing!' });
    }
  };

  const submitShoppingList = async () => {
    // get the new list name if changed, keep old name for rollback
    const newListName = shoppingListInputNameRef.current?.value;
    const oldListName = activeShoppingList.name;

    //prepare the data to send with listname then update state using returning data.
    const dataToSend = { ...activeShoppingList, name: newListName || oldListName };

    // try saving on backend, rollback name in state if fails.
    try {
      const data = await saveShoppingList(mapShoppingListToSave(dataToSend));
      updateActiveShoppingListInfo({
        name: data!.name,
        status: data!.status,
      });
      await refreshShoppingLists();
      setNotification({ message: 'Shopping list successfully saved', variant: 'success' });
    } catch (e) {
      setNotification({ message: 'Saving request failed!', variant: 'danger' });
    }
  };

  return (
    <>
      <div className="p-4 d-flex flex-column h-100" style={{ backgroundColor: '#FFF0DE' }}>
        <CallToActionAddItem />
        {Object.keys(activeShoppingList.items).length ? (
          <div className="flex-fill d-flex flex-column position-relative overflow-auto">
            <Stack direction="horizontal" className="justify-content-between">
              <h5>{activeShoppingList.name}</h5>
              <div title="Change completed status">
                <MdEdit size="1.5rem" onClick={switchToToggleDoneMode} />
              </div>
            </Stack>
            {Object.entries(activeShoppingList.items).map(
              ([category, items]) =>
                items.length > 0 && (
                  <div key={category} className="flex-fill">
                    <h6 className="text-muted mt-2">{category}</h6>
                    {items.map((item, index) => {
                      const isItemSelected = itemToEdit === item.item._id;
                      const isVisible = isItemSelected ? '' : ' unclickable o-0';

                      return (
                        <Stack
                          key={item.item._id}
                          direction="horizontal"
                          className="justify-content-between align-items-center mb-1"
                          onMouseEnter={() => setItemToEdit(item.item._id)}
                          onMouseLeave={() => setItemToEdit('')}
                        >
                          <span className="fw-bold">{item.item.name}</span>
                          <div
                            className={`d-flex clickable gap-1${isItemSelected ? ' bg-white' : ''}`}
                          >
                            <div
                              style={{ transform: 'scale(1.2)' }}
                              className={`"h-100 bg-primary d-flex align-items-center flex-column"+${isVisible}`}
                            >
                              <MdDelete
                                className="list-icon-inverted"
                                onClick={() =>
                                  removeItemFromActiveShoppingList(category, item.item._id)
                                }
                              />
                            </div>
                            <Stack direction="horizontal">
                              <div className={isVisible}>
                                <MdRemove
                                  className="list-icon"
                                  onClick={() => changeAmountOfItem(category, index, 'decrease')}
                                />
                              </div>

                              <Button
                                size="sm"
                                className="px-4 m-1 rounded-pill unclickable o-100"
                                variant="outline-primary"
                              >
                                {`${item.amount} `}{' '}
                                <span className="w-ch3 d-inline-block">
                                  {item.amount > 1 ? 'pcs' : 'pc'}
                                </span>
                              </Button>
                              <div className={isVisible}>
                                <MdAdd
                                  className="list-icon"
                                  onClick={() => changeAmountOfItem(category, index, 'increase')}
                                />
                              </div>
                            </Stack>
                          </div>
                        </Stack>
                      );
                    })}
                  </div>
                )
            )}
            <div className="bg-white mt-3">
              <InputGroup size="sm" className="">
                <FormControl placeholder="Enter the new name" ref={shoppingListInputNameRef} />
                <InputGroup.Text className="p-0">
                  <Button
                    variant="primary"
                    className="h-100 text-white"
                    onClick={submitShoppingList}
                  >
                    Save
                  </Button>
                </InputGroup.Text>
              </InputGroup>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column" style={{ minHeight: '100%' }}>
            <div className="text-center flex-fill d-flex flex-column justify-content-center">
              <p>NO ITEMS</p>
            </div>
            <div className="flex-fill p-3">
              <Image fluid src={appSvg} width="60%" height="auto" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
