import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Entrypoint from './core/entrypoint/index.tsx';
// Import styles
import './App.scss';
import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Entrypoint />
  </StrictMode>
);
