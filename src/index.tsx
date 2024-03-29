import SessionDataStorage from '@/context/sessionDataStorage';
import { WebsocketProvider, socket } from '@/context/websocket';
import WebsocketDataStorage from '@/context/websocketDataStorage';
import { setupStore } from '@/store/store';
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
  <Provider store={store}>
    <SessionDataStorage>
      <WebsocketProvider value={socket}>
        <WebsocketDataStorage>
          <BrowserRouter>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </BrowserRouter>
        </WebsocketDataStorage>
      </WebsocketProvider>
    </SessionDataStorage>
  </Provider>
);
