import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import { B4hProvider } from './app/providers';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <B4hProvider>
        <App />
      </B4hProvider>
    </BrowserRouter>
  </StrictMode>
);
