import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import TheSpinner from 'src/components/common/TheSpinner';

const Items = lazy(() => import('../components/items/Items'));
const ShoppingList = lazy(() => import('../components/shoppinglist/ShoppingList'));
const ShoppingHistory = lazy(() => import('../components/history/ShoppingHistory'));
const Stats = lazy(() => import('../components/stats/Stats'));

export default function PrivateRoutes() {
  return (
    <Suspense fallback={<TheSpinner />}>
      <Routes>
        <Route path="/items" element={<Items />} />
        <Route path="/history" element={<ShoppingHistory />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/shoppinglist/:id" element={<ShoppingList />} />

        <Route path="*" element={<Navigate replace to="/items" />} />
      </Routes>
    </Suspense>
  );
}
