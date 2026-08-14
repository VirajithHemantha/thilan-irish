import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Admin from './Admin.tsx';
import './index.css';

const root = createRoot(document.getElementById('root')!);

if (window.location.pathname === '/admin') {
  root.render(<Admin />);
} else {
  root.render(<App />);
}
