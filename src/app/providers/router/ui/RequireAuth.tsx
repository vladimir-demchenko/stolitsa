import { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RequireAuthProps {
  children: JSX.Element;
  role?: string;
}

export function RequireAuth({ children, role }: RequireAuthProps) {
  const auth = localStorage.getItem('user');
  const userRole = localStorage.getItem('role');
  const location = useLocation();

  const hasRequiredRole = useMemo(() => {
    if (!role) {
      return true;
    }

    return userRole === 'admin';
  }, [role]);

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!hasRequiredRole) {
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  return children;
}
