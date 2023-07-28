import { setupStore } from '@/store/store';
import React from 'react';
import { Provider } from 'react-redux';

const store = setupStore();

const App = () => {
  return (
    <Provider store={store}>
      <div>Hello</div>
    </Provider>
  );
};

export default App;
