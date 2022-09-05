import { useState, useEffect } from 'react';
import { Row, Col, Card, Stack } from 'react-bootstrap';
import { MdArrowBack, MdCalendarToday } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';

import { fetchShoppingList } from '../../services/shoppingLists';
import type { TShoppingList } from '../../types';
import { formatDate, groupItemsOfShoppingList } from '../../utils/shoppingList';
import TheSpinner from '../common/TheSpinner';

// route /shoppinglist/listId
export default function ShoppingList() {
  const { id } = useParams();
  const [list, setList] = useState<TShoppingList>({} as TShoppingList);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchShoppingList(id!)
      .then((data) => {
        setList(groupItemsOfShoppingList(data!));
      })
      .catch((e) => setErrorMessage(e.message));
  }, [id]);

  if (!list?.items) return <TheSpinner />;

  if (errorMessage) return <h1>{errorMessage}</h1>;

  return (
    <div className="p-4">
      <div className="text-center fs-5">
        <Link to="/history">
          <MdArrowBack /> Back
        </Link>
      </div>
      <h3>{list.name}</h3>
      <Stack direction="horizontal" className="text-muted fw-bold fs-6" gap={1}>
        <MdCalendarToday />
        <span>{formatDate(list.createdAt!)}</span>
      </Stack>
      {Object.entries(list.items).map(([category, items]) => {
        return (
          <div className="my-5" key={category}>
            <h5 className="fw-bold">{category}</h5>
            <Row xs={2} md={3} lg={4} className="g-4">
              {items.map(({ item, amount }) => (
                <Col key={item._id}>
                  <Card className="fw-bold h-100" data-testid="list-item-card">
                    <Card.Body className="px-2 py-2 fs-6">
                      <div className="h-100 d-flex align-items-center justify-content-between">
                        <div>{item.name}</div>
                        <small className="text-primary small w-ch5">{amount} pcs</small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        );
      })}
    </div>
  );
}
