import { useAuth } from '~/contexts/AuthContext';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Router = () => {
  const { token } = useAuth();

  return token ? <AppRoutes /> : <AuthRoutes />;
};

export default Router;
