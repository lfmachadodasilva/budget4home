import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './app/config/i18n';

import App from './app/app';
import { AuthProvider } from './app/providers/authProvider';
import { GlobalProvider } from './app/providers/globalProvider';
import { QueryProvider } from './app/providers/queryProvider';
import { StyleProvider } from './style/provider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <StyleProvider>
        <AuthProvider>
          <QueryProvider>
            <GlobalProvider>
              <App />
            </GlobalProvider>
          </QueryProvider>
        </AuthProvider>
      </StyleProvider>
    </BrowserRouter>
  </StrictMode>
);
