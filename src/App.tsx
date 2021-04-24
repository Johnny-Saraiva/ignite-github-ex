import { BrowserRouter } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import './styles/global.scss';

export const App = () => {
  return (
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
};
