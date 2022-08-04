import { Route, Routes } from 'react-router-dom';
import List from '~/pages/List';

const AppRoutes = () => (
  <Routes>
    <Route path='*' element={<List />} />
  </Routes>
);

export default AppRoutes;
