import { Button, Image, Stack } from 'react-bootstrap';
import { MdArrowBack } from 'react-icons/md';

import useActiveShoppingListState from 'src/hooks/useActiveShoppingList';
import { useItems } from 'src/hooks/useItems';
import { useSelectedItem } from 'src/hooks/useSelectedItem';
import useSidebarOptions from 'src/hooks/useSidebarOptions';
import { destroyItem } from 'src/services/items';

//todo: remove placeholder image (maybe a generic image or leave empty)

export default function ShowItem() {
  const { selectedItem } = useSelectedItem();
  const { addItemToActiveShoppingList, removeItemFromActiveShoppingList } =
    useActiveShoppingListState();
  const { removeItem: removeItemFromItemsStore } = useItems();
  const { setSidebarMode } = useSidebarOptions();

  const goBack = () => {
    setSidebarMode('EDIT_AMOUNTS');
  };

  const addToShoppingList = () => {
    addItemToActiveShoppingList(selectedItem);
    goBack();
  };

  const deleteItem = () => {
    destroyItem(selectedItem._id)
      .then(() => {
        // if removed from database
        removeItemFromItemsStore(selectedItem._id);
        removeItemFromActiveShoppingList(selectedItem.category.name, selectedItem._id);

        goBack();
      })
      .catch();
  };

  return (
    <div className="d-flex flex-column position-relative h-100 p-1 m-1">
      <Button variant="link" onClick={goBack}>
        <MdArrowBack /> Back
      </Button>
      <Stack className="overflow-auto mb-5">
        <div style={{ maxHeight: '200px' }}>
          <Image
            src={selectedItem.image || 'https://via.placeholder.com/300'}
            className="img-fluid object-fit-cover"
            rounded
          />
        </div>
        <div>
          <small>name</small>
          <p>{selectedItem.name}</p>
        </div>
        <div>
          <small>category</small>
          <p>{selectedItem.category.name}</p>
        </div>
        <div>
          <small>note</small>
          <p>{selectedItem.note}</p>
        </div>
      </Stack>
      <div className="d-flex justify-content-evenly bg-white position-absolute bottom-0 mt-5 p-3 w-100 gap-4">
        <Button variant="outline-secondary" onClick={deleteItem}>
          Delete
        </Button>
        <Button variant="primary" onClick={addToShoppingList}>
          Add To List
        </Button>
      </div>
    </div>
  );
}
