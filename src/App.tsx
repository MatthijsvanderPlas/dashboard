import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Layout from '~/pages/Layout';
import About from './pages/About';
import Contact from './pages/Contact';
import ErrorBoundary from './pages/ErrorBoundary';
import Hero from './pages/Hero';
import Spreadsheet from './pages/Spreadsheet';
import Student from './pages/Student';
import Students from './pages/Students';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />} errorElement={<ErrorBoundary />}>
        <Route path='/' element={<Hero />} />
        <Route path='/about' element={<About />} />
        <Route path='/spreadsheet' element={<Spreadsheet />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/students' element={<Students />} />
        <Route path='/students/:id' element={<Student />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default App;
