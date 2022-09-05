import { Button } from 'react-bootstrap';

export default function Logout() {
  const logout = () => {
    window.localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="bg-white p-3">
      <Button variant="danger" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
