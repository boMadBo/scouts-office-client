import { config } from '@/config';
import SessionDataStorage from '@/context/sessionDataStorage';
import { WebsocketProvider, socket } from '@/context/websocket';
import WsMessagesDataStorage from '@/context/wsMessagesDataStorage';
import { setupStore } from '@/store/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './i18n';
import './index.scss';

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SessionDataStorage>
        <WebsocketProvider value={socket}>
          <WsMessagesDataStorage>
            <GoogleOAuthProvider clientId={config.google.clientId}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </GoogleOAuthProvider>
          </WsMessagesDataStorage>
        </WebsocketProvider>
      </SessionDataStorage>
    </Provider>
  </React.StrictMode>
);
