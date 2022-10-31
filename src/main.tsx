import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import fetchData from 'api/api_client';
import Hero from './pages/Hero';
import Student from './pages/Student';
import Spreadsheet from './pages/Spreadsheet';
import About from './pages/About';

const loader = () => {
  return fetchData();
};

const router = createBrowserRouter([
  {
    element: <App />,
    path: '',
    loader: loader,
    children: [
      {
        path: '',
        element: <Hero />,
      },
      {
        path: '/:student',
        element: <Student />,
      },
      {
        path: '/spreadsheet',
        element: <Spreadsheet />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
