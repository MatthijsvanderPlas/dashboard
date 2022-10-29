import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import fetchData from 'api/api_client';
import Test from './components/Test';

const loader = () => {
  console.log('fetching data');
  return fetchData();
};

const router = createBrowserRouter([
  {
    element: <App />,
    path: '',
    loader: loader,
    children: [
      {
        path: '/',
        element: <Test />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
