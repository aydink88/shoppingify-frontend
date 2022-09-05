import type { KeyboardEventHandler } from 'react';
import { useEffect, useState, useRef } from 'react';
import { InputGroup, FormControl, ListGroup } from 'react-bootstrap';
import { MdSearch } from 'react-icons/md';

import { useItems } from 'src/hooks/useItems';
import { useSelectedItem } from 'src/hooks/useSelectedItem';
import useSidebarOptions from 'src/hooks/useSidebarOptions';
import type { TItemData } from 'src/types';

export default function SearchItems() {
  const { findItemsByName } = useItems();
  const { setSelectedItem } = useSelectedItem();
  const { setSidebarMode } = useSidebarOptions();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [foundItems, setFoundItems] = useState<TItemData[]>([]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // timeout for delaying search
  const timer = useRef<NodeJS.Timeout>();

  const filterItems = () => {
    const results = findItemsByName(searchTerm, 5);
    setFoundItems(results);
  };

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    if (searchTerm) {
      timer.current = setTimeout(() => {
        filterItems();
      }, 500);
    } else {
      clearSearchInput();
    }

    return () => clearTimeout(timer.current!);
  }, [searchTerm]);

  const selectSearchItem = (item: TItemData) => () => {
    setSelectedItem(item);
    setSidebarMode('SHOW_ITEM');
    clearSearchInput();
  };

  const clearSearchInput = () => {
    setSearchTerm('');
    setFoundItems([]);
  };

  const keyDownHandler: KeyboardEventHandler = (e) => {
    if (e.code === 'Escape') {
      clearSearchInput();
      searchInputRef.current?.blur();
    }
  };

  return (
    <div className="position-relative">
      <InputGroup className="search-label">
        <InputGroup.Text>
          <MdSearch />
        </InputGroup.Text>
        <FormControl
          ref={searchInputRef}
          type="text"
          className="search-input"
          placeholder="search items"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={clearSearchInput}
          onKeyDown={keyDownHandler}
        />
      </InputGroup>
      <div className="position-absolute w-100 text-center zindex-1">
        <ListGroup>
          {foundItems.map((item) => (
            <ListGroup.Item
              data-testid="search-result"
              key={item._id}
              action
              onClick={selectSearchItem(item)}
            >
              <span className="fs-5">{item.name}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}
