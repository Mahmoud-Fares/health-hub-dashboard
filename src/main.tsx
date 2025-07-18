import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import '@/styles/global.css';
import '@/styles/home-module.css';

import App from './app/app';
import Providers from './app/providers';
import './index.css';
import './transition.css';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <Providers>
         <App />
      </Providers>
   </StrictMode>
);
