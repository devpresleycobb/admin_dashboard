import 'buffer';
import App from './App'
import './index.css'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ThemeProvider } from "@material-tailwind/react";

  createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  );