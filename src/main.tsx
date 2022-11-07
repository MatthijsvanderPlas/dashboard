import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import fetchData from 'api/api_client';
import Hero from './pages/Hero';
import Student from './pages/Student';
import Spreadsheet from './pages/Spreadsheet';
import About from './pages/About';
import Contact from './pages/Contact';
import ErrorBoundary from './pages/ErrorBoundary';
import Students from './pages/Students';

const loader = () => {
  return fetchData();
};

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorBoundary />,
    path: '',
    loader: loader,
    children: [
      {
        path: '',
        element: <Hero />,
      },
      {
        path: '/students/:student',
        element: <Student />,
      },
      {
        path: '/students',
        element: <Students />,
      },
      {
        path: '/spreadsheet',
        element: <Spreadsheet />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
