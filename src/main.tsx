import React from 'react'
import App from './App'
import './index.css'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import 'material-icons/iconfont/material-icons.css';
import 'react-pro-sidebar/dist/css/styles.css';
import Cookies from 'js-cookie';

if (Cookies.get('accessToken')) {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>
  )
} else {
  try {
    const [idToken, accessToken] = window.location.href.split('#')[1].split('&').map(item => item.split('=')[1]);
    Cookies.set('idToken', idToken, { secure: true, expires: 1 });
    Cookies.set('accessToken', accessToken, { secure: true, expires: 1 });
  } catch (error) {
    const LOGIN_PAGE = 'https://admindashboard.auth.us-east-1.amazoncognito.com/login?client_id=2aqdtv4khat0dtnui33vh9qc2t&response_type=token&scope=email+openid+phone+profile&redirect_uri=http://localhost:3000';
    window.location.href = LOGIN_PAGE;
  }
}