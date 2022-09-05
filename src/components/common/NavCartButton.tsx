import { useAtomValue } from 'jotai';
import { MdShoppingCart } from 'react-icons/md';

import useSidebarOptions from 'src/hooks/useSidebarOptions';
import { activeShoppingListLengthGetter } from 'src/store/activeShoppingList';

export default function NavCartButton() {
  const shoppingListLength = useAtomValue(activeShoppingListLengthGetter);
  // to show sidebar on mobile
  const { toggleShoppingList } = useSidebarOptions();
  return (
    <div className="m-n1 text-white bg-primary rounded-circle position-relative">
      <div
        className="p-1"
        onClick={toggleShoppingList}
        role="button"
        tabIndex={0}
        onKeyDown={toggleShoppingList}
      >
        <MdShoppingCart color="white" />
      </div>
      <div className="position-absolute top-0 start-100 translate-middle rounded-3 px-1 bg-danger">
        <div data-testid="shoppingListItemCount" className="small">
          {shoppingListLength}
        </div>
      </div>
    </div>
  );
}
