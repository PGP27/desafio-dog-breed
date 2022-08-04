import { AuthProvider } from './contexts/AuthContext';
import Router from './routes/routes';

const App = () => (
  <AuthProvider>
    <Router />
  </AuthProvider>
);

export default App;
