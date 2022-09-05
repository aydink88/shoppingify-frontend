import type { ModalProps } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';

export default function ListActionModal(props: ModalProps) {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure that you want to {props.mode} this list?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={props.onConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
