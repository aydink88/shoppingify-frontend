import { Card, Badge } from 'react-bootstrap';
import { MdCalendarToday, MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { useShoppingLists } from 'src/hooks/useShoppingLists';
import { formatDate } from 'src/utils/shoppingList';

const statusStyle = (status: any) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'danger';
    case 'active':
      return 'primary';
    default:
      return 'warning';
  }
};

export default function ShoppingHistory() {
  const { shoppingLists } = useShoppingLists();

  return (
    <div>
      {shoppingLists.map((list) => (
        <Card className="m-3" key={list._id}>
          <Card.Body className="d-flex justify-content-between align-items-center p-2">
            <Card.Title className="text-truncate mx-1">{list.name}</Card.Title>
            <div className="d-flex align-items-center gap-4">
              <Card.Subtitle className="text-muted d-flex gap-1">
                <MdCalendarToday />
                <div>{formatDate(list.createdAt!)}</div>
              </Card.Subtitle>
              <Badge pill bg={statusStyle(list.status)}>
                {list.status}
              </Badge>
              <Link to={`/shoppinglist/${list._id}`}>
                <MdArrowForwardIos size={30} />
              </Link>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
