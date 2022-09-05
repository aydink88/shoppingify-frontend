import { useState } from 'react';
import { Stack, Button, Form } from 'react-bootstrap';
import { MdEdit } from 'react-icons/md';

import useActiveShoppingListState from 'src/hooks/useActiveShoppingList';
import useNotification from 'src/hooks/useNotification';
import { useShoppingLists } from 'src/hooks/useShoppingLists';
import useSidebarOptions from 'src/hooks/useSidebarOptions';
import { saveShoppingList, updateActiveListItem } from 'src/services/shoppingLists';

import CallToActionAddItem from './CallToActionAddItem';
import ListActionModal from './ListActionModal';

//Todo
// Cancel and Complete button should update the list status

export default function ToggleDone() {
  const {
    activeShoppingList,
    itemToggleDone,
    resetActiveShoppingListState,
    updateActiveShoppingListInfo,
  } = useActiveShoppingListState();
  const { setSidebarMode } = useSidebarOptions();
  const [modalProps, setModalProps] = useState({ mode: 'none', show: false });
  const { refreshShoppingLists } = useShoppingLists();
  const { setNotification } = useNotification();

  const switchToEditAmountsMode = () => {
    setSidebarMode('EDIT_AMOUNTS');
  };

  const toggleChecked = (category: string, index: number, item: any) => {
    updateActiveListItem(activeShoppingList._id, {
      _id: item._id,
      amount: item.amount,
      done: !item.done,
    })
      .then(() => {
        itemToggleDone(category, index);
      })
      .catch(() => setNotification({ message: 'Updating Failed.', variant: 'danger' }));
  };

  const openModalCancel = () => {
    setModalProps({ mode: 'cancel', show: true });
  };

  const openModalComplete = () => {
    setModalProps({ mode: 'complete', show: true });
  };

  const onModalConfirm = () => {
    if (!['complete', 'cancel'].includes(modalProps.mode)) {
      return setModalProps({ mode: 'none', show: false });
    }
    const previousStatus = activeShoppingList.status;
    const statusPatch: { status: 'completed' | 'cancelled'; _id: string } = {
      status: modalProps.mode === 'complete' ? 'completed' : 'cancelled',
      _id: activeShoppingList._id!,
    };
    saveShoppingList(statusPatch)
      .then(() => {
        resetActiveShoppingListState();
        refreshShoppingLists();
      })
      .catch(() => {
        updateActiveShoppingListInfo({ status: previousStatus });
        setNotification({ message: 'Updating Failed.', variant: 'danger' });
      });
    setModalProps({ mode: 'none', show: false });
  };

  return (
    <>
      <ListActionModal
        onHide={() => setModalProps({ mode: 'none', show: false })}
        onConfirm={onModalConfirm}
        {...modalProps}
      />
      <div className="p-4 d-flex flex-column h-100" style={{ backgroundColor: '#FFF0DE' }}>
        <CallToActionAddItem />
        {Object.keys(activeShoppingList.items).length ? (
          <div className="flex-fill d-flex flex-column position-relative overflow-auto">
            <Stack direction="horizontal" className="justify-content-between">
              <h5>{activeShoppingList.name}</h5>
              <div title="Change amounts">
                <MdEdit size="1.5rem" onClick={switchToEditAmountsMode} />
              </div>
            </Stack>
            {Object.entries(activeShoppingList.items).map(
              ([category, items]) =>
                items.length > 0 && (
                  <div key={category} className="flex-fill">
                    <div className="fs-6 text-muted mt-1">{category}</div>
                    {items.map((item, index) => (
                      <Stack
                        key={item.item._id}
                        direction="horizontal"
                        className="justify-content-between align-items-center py-2"
                      >
                        <div>
                          <Form.Check
                            inline
                            name="group1"
                            type="checkbox"
                            id={`inline-checkbox`}
                            checked={item.done}
                            onChange={() => toggleChecked(category, index, item)}
                          />
                          <span
                            className="fw-bold"
                            style={{ textDecorationLine: `${item.done ? 'line-through' : 'none'}` }}
                          >
                            {item.item.name}
                          </span>
                        </div>
                        <Button size="sm" className="px-4 rounded-pill" variant="outline-primary">
                          <span className="d-inline-block" style={{ width: '6ch' }}>{`${
                            item.amount
                          } ${item.amount > 1 ? 'pcs' : 'pc'}`}</span>
                        </Button>
                      </Stack>
                    ))}
                  </div>
                )
            )}
            <div className="mt-3 d-flex justify-content-evenly">
              <Button variant="outline-primary" className="h-100" onClick={openModalCancel}>
                Cancel
              </Button>
              <Button variant="info" className="h-100 text-white" onClick={openModalComplete}>
                Complete
              </Button>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column" style={{ minHeight: '100%' }}>
            <div className="text-center flex-fill d-flex flex-column justify-content-center">
              <p>NO ITEMS</p>
            </div>
            <div className="flex-fill p-3">
              {/* <Image fluid src={appSvg} width="60%" height="auto" /> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
