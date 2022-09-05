import { Col, Image, Stack, Button } from 'react-bootstrap';

import sauceSvg from 'src/assets/sauce.svg';
import useSidebarOptions from 'src/hooks/useSidebarOptions';

// switch to additem form to create new Item on database
export default function CallToActionAddItem() {
  const { setSidebarMode } = useSidebarOptions();

  const switchToAddItemMode = () => {
    setSidebarMode('ADD_ITEM');
  };
  return (
    <div className="rounded-3 mb-3 d-flex" style={{ backgroundColor: '#80485B' }}>
      <Col sm={4} className="p-0">
        <Image className="mt-n4 p-2" src={sauceSvg} fluid />
      </Col>
      <Col>
        <Stack gap={1} className="p-2 justify-content-center h-100">
          <p className="text-white fw-bold fs-6">Didn't find what you need?</p>
          <Button
            className="rounded-pill max-content"
            variant="light"
            onClick={switchToAddItemMode}
          >
            Add Item
          </Button>
        </Stack>
      </Col>
    </div>
  );
}
