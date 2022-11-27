import ReactDOM from 'react-dom/client';
import React from 'react';

import App from './App';

import { Provider } from 'react-redux';
import store from './store/store';
import { fetchData } from './store/dataSlice';

store.dispatch(fetchData());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
