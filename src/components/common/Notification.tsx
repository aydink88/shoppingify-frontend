import { Toast, ToastContainer } from 'react-bootstrap';

import useNotification from 'src/hooks/useNotification';

export default function Notification() {
  const {
    setNotification,
    state: { message, variant },
  } = useNotification();
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast
        className="d-inline-block m-1"
        bg={variant.toLowerCase()}
        onClose={() => setNotification({ message: '' })}
        show={!!message}
        delay={2000}
        autohide
      >
        <Toast.Body className="text-white fs-5">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
