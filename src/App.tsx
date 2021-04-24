import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import './styles/global.scss';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};
