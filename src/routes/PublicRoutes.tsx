import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import Authenticate from 'src/components/authenticate/Authenticate';
import TheSpinner from 'src/components/common/TheSpinner';

//const Authenticate = lazy(() => import('../components/authenticate/Authenticate'));

export default function PublicRoutes() {
  return (
    <Suspense fallback={<TheSpinner />}>
      <Routes>
        <Route path="/register" element={<Authenticate />} />
        <Route path="/login" element={<Authenticate />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Suspense>
  );
}
