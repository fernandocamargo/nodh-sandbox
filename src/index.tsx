import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider as GlobalState } from 'react-redux';

import store from 'store';
import { App } from 'components';

export const root = document.getElementById('root') as HTMLElement;

export default createRoot(root).render(
  <StrictMode>
    <GlobalState store={store}>
      <App />
    </GlobalState>
  </StrictMode>
);
