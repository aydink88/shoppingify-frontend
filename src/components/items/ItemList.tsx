import type { MouseEvent, MouseEventHandler } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { MdAdd } from 'react-icons/md';

import useActiveShoppingListState from 'src/hooks/useActiveShoppingList';
import useSidebarOptions from 'src/hooks/useSidebarOptions';
import type { TItemData } from 'src/types';

type ItemListProps = {
  itemWithCat: [string, TItemData[]];
  onClick?: (item: TItemData) => MouseEventHandler;
};

export default function ItemList({ itemWithCat, onClick }: ItemListProps) {
  const { addItemToActiveShoppingList } = useActiveShoppingListState();
  const { setSidebarMode } = useSidebarOptions();

  const addItem = (item: TItemData) => (e: MouseEvent) => {
    // stopPropation not to conflict parent's handler shows item on sidebar
    e.stopPropagation();
    addItemToActiveShoppingList(item);
    setSidebarMode('EDIT_AMOUNTS');
  };

  return (
    <div className="my-5" data-testid="itemlist">
      <h5 className="fw-bold">{itemWithCat[0]}</h5>
      <Row xs={2} lg={3} xl={4} className="g-4">
        {itemWithCat[1].map((item) => (
          <Col key={item._id}>
            <Card
              data-testid="list-item-card"
              className="fw-bold clickable zoom-on-hover"
              onClick={onClick ? onClick(item) : () => {}}
            >
              <Card.Body className="px-2 py-2 fs-6">
                <div className="d-flex align-items-center justify-content-between">
                  {item.name}
                  <MdAdd role="button" className="fs-4 add_item-btn" onClick={addItem(item)} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
