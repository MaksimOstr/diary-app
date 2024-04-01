import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { ThemeProvider } from '@mui/material';
import { theme } from './assets/theme/theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux'
import { store } from '@diary-app/shared'
import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      <ToastContainer/>
    </Provider>
  </StrictMode>
);
