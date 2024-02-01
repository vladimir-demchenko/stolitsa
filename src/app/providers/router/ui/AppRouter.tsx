import { Suspense, useCallback } from 'react';
import { AppRoutesProps, routeConfig } from '../config/routeConfig';
import { Route, Routes } from 'react-router';
import { RequireAuth } from './RequireAuth';
import { ForbiddenPage } from 'pages/ForbiddenPage';

export function AppRouter() {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback="">
        {route.element}
      </Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.authOnly ? (
          <RequireAuth role={route.role}>{element}</RequireAuth>
        ) : (element)}
      />
    )
  }, []);

  return (
    <Routes>
      {Object.values(routeConfig).map(renderWithWrapper)}
      <Route element={<ForbiddenPage />} path="/forbidden" />
    </Routes>
  )
}