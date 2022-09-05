import { Spinner } from 'react-bootstrap';

const TheSpinner = () => (
  <div
    data-testid="spinner"
    className="d-flex justify-content-center align-items-center w-100 vh-100"
  >
    <Spinner animation="border" variant="primary" />
  </div>
);

export default TheSpinner;
