import type { MouseEventHandler } from 'react';
import { useEffect, useState } from 'react';
import { Col, Stack } from 'react-bootstrap';
import { useErrorHandler } from 'react-error-boundary';

import { useItems } from 'src/hooks/useItems';
import useSafeDispatch from 'src/hooks/useSafeDispatch';
import { useSelectedItem } from 'src/hooks/useSelectedItem';
import useSidebarOptions from 'src/hooks/useSidebarOptions';
import { getAllItems } from 'src/services/items';
import type { TItemData } from 'src/types';

import TheSpinner from '../common/TheSpinner';

import ItemList from './ItemList';
import SearchItems from './SearchItems';

export default function Items() {
  const { itemsGroupedByCategory } = useItems();
  const { setItems } = useItems();
  const { setSelectedItem } = useSelectedItem();
  const { setSidebarMode } = useSidebarOptions();
  const [loading, setLoading] = useState(true);

  const setLoadingSafe = useSafeDispatch(setLoading);
  const handleError = useErrorHandler();

  // items should be fetched if redirected after login
  useEffect(() => {
    if (!itemsGroupedByCategory.length) {
      getAllItems()
        .then((items) => {
          setItems(items);
        })
        .catch((err) => handleError(err))
        .finally(() => setLoadingSafe(false));
    } else {
      setLoading(false);
    }
  }, []);

  const selectItem =
    (item: TItemData): MouseEventHandler =>
    () => {
      setSelectedItem(item);
      setSidebarMode('SHOW_ITEM');
    };

  // display block on small screens
  const isSearchInputBlock = window.innerWidth < 992;

  if (loading) return <TheSpinner />;

  return (
    <div className="p-3">
      <Stack direction={isSearchInputBlock ? 'vertical' : 'horizontal'} gap={2}>
        <Col>
          <h4>
            <span className="text-primary">
              <strong>Shoppingify</strong>{' '}
            </span>{' '}
            allows you take your shopping list wherever you go
          </h4>
        </Col>
        <Col>
          <SearchItems />
        </Col>
      </Stack>
      {itemsGroupedByCategory.map((itemWithCat) => (
        <ItemList key={itemWithCat[0]} itemWithCat={itemWithCat} onClick={selectItem} />
      ))}
    </div>
  );
}
