import { Route, Routes } from 'react-router-dom';
import Register from '~/pages/Register';

const AuthRoutes = () => (
  <Routes>
    <Route path='*' element={<Register />} />
  </Routes>
);

export default AuthRoutes;
