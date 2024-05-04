import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { AllTheProviders, store, theme } from '@diary-app/shared'
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <App/>
      </ThemeProvider>
      <ToastContainer />
    </Provider>
  </StrictMode>
);
