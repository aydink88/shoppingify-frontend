import type { Dispatch, SetStateAction, MouseEventHandler } from 'react';
import { useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';

import { useItems } from 'src/hooks/useItems';

export default function CategoryInput({
  setCategory,
}: {
  setCategory: Dispatch<SetStateAction<string>>;
}) {
  const { categories } = useItems();

  const [searchTerm, setSearchTerm] = useState('');
  const [showList, setShowList] = useState(false);

  const selectFromList = (text: string) => {
    setCategory(text);
    setSearchTerm(text);
    setShowList(false);
  };

  return (
    <div className="position-relative">
      <Form.Group className="mb-3" controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a category"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCategory(e.target.value);
            setShowList(true);
          }}
          onFocus={() => setShowList(true)}
          onBlur={() => !showList && setSearchTerm('')}
          onKeyUp={(e) => e.key === 'Escape' && setShowList(false)}
        />
      </Form.Group>
      {showList && (
        <CategoryList
          categories={categories}
          filter={searchTerm.toLocaleLowerCase()}
          selectFromList={selectFromList}
        />
      )}
    </div>
  );
}

function CategoryList({
  filter,
  selectFromList,
  categories,
}: {
  selectFromList: (t: string) => void;
  filter: string;
  categories: string[];
}) {
  const selectCategory: MouseEventHandler = (e) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    if (target) selectFromList(target.innerText);
  };

  const filteredCategories = filter
    ? categories.filter((cat) => cat.toLocaleLowerCase().startsWith(filter))
    : [];
  return (
    <ListGroup className="position-absolute w-100 overflow-auto" style={{ maxHeight: '100px' }}>
      {filteredCategories.map((cat) => (
        <ListGroup.Item key={cat} eventKey={cat} action onClick={selectCategory}>
          {cat}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
