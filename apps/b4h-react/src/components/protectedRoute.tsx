import { Navigate, Outlet } from 'react-router-dom';
import { useB4hAuth } from '../providers/authProvider';
import { B4hRoutes } from '../shared/routes';

export const ProtectedRoute = () => {
  const { user } = useB4hAuth();
  return user ? <Outlet /> : <Navigate to={B4hRoutes.login} />;
};
