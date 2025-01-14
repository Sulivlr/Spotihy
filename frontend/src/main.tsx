import {createRoot} from 'react-dom/client'
import App from './App'
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router';
import {CssBaseline, ThemeProvider} from '@mui/material';
import theme from './theme';
import {store} from './app/store';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App/>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
