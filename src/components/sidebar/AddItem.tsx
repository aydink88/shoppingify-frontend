import type { FormEventHandler } from 'react';
import { useState } from 'react';
import { Form, Button, Stack } from 'react-bootstrap';

import { useItems } from 'src/hooks/useItems';
import useNotification from 'src/hooks/useNotification';
import useSidebarOptions from 'src/hooks/useSidebarOptions';
import { addItem } from 'src/services/items';

import CategoryInput from './CategoryInput';

export default function AddItem() {
  const { setSidebarMode } = useSidebarOptions();
  const { addNewItem } = useItems();
  const { setNotification } = useNotification();

  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [image, setImage] = useState('');

  const backToListShow = () => {
    setSidebarMode('EDIT_AMOUNTS');
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (!name || !category) return setNotification({ message: 'name and category are required' });
    try {
      const item = await addItem(name, note, image, category);
      addNewItem(item);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <div className="px-2 py-4 h-100 overflow-auto">
      <h4>Add a New Item</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {/* <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="note">
          <Form.Label>Note (Optional)</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter a note"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image (Optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a url"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </Form.Group>
        <CategoryInput setCategory={setCategory} />
        <Stack direction="horizontal" className="justify-content-evenly">
          <Button variant="outline-primary" type="button" onClick={backToListShow}>
            Cancel
          </Button>
          <Button variant="primary" className="text-white" type="submit">
            Save
          </Button>
        </Stack>
      </Form>
    </div>
  );
}
