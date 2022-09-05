import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import AuthenticatedApp from 'src/app/AuthenticatedApp';
import FullPageError from 'src/components/common/FullPageError';
import Notification from 'src/components/common/Notification';
import TheSpinner from 'src/components/common/TheSpinner';
import useActiveShoppingListState from 'src/hooks/useActiveShoppingList';
import useAuth from 'src/hooks/useAuth';
import { useItems } from 'src/hooks/useItems';
import useNotification from 'src/hooks/useNotification';
import { useShoppingLists } from 'src/hooks/useShoppingLists';
import PublicRoutes from 'src/routes/PublicRoutes';
import { autoFetchData } from 'src/services/auth';

function App() {
  const { userId, setAuth } = useAuth();
  const { setItems } = useItems();
  const [loading, setLoading] = useState(true);
  const { setShoppingLists } = useShoppingLists();
  const { setActiveShoppingList } = useActiveShoppingListState();

  const { setNotification } = useNotification();

  // initial data fetch if localstorage has token
  useEffect(() => {
    if (userId) return setLoading(false);
    setLoading(true);
    autoFetchData()
      .then((dataObjects) => {
        if (!dataObjects) return;
        const { userData, items, activeList } = dataObjects;
        setAuth({ id: userData._id ?? '', email: userData.email ?? '' });
        setItems(items);
        setActiveShoppingList(activeList);
        setShoppingLists(userData.shopping_lists);
      })
      .catch((err) => {
        setNotification({ message: err.message, variant: 'danger' });
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <TheSpinner />;

  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<FullPageError message="Something Went Wrong" />}>
        <Notification />
        {userId ? (
          <AuthenticatedApp />
        ) : (
          <Container>
            <PublicRoutes />
          </Container>
        )}
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
