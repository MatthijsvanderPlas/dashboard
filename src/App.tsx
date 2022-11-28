import React, { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
// import Layout from '~/pages/Layout';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import ErrorBoundary from './pages/ErrorBoundary';
// import Hero from './pages/Hero';
// import Spreadsheet from './pages/Spreadsheet';
// import Student from './pages/Student';
// import Students from './pages/Students';

const Layout = lazy(() => import(`~/pages/Layout`));
const ErrorBoundary = lazy(() => import(`~/pages/ErrorBoundary`));
const Hero = lazy(() => import(`~/pages/Hero`));
const About = lazy(() => import(`~/pages/About`));
const Spreadsheet = lazy(() => import(`~/pages/Spreadsheet`));
const Contact = lazy(() => import(`~/pages/Contact`));
const Students = lazy(() => import(`~/pages/Students`));
const Student = lazy(() => import(`~/pages/Student`));

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path='/'
        element={
          <React.Suspense fallback={<LoadingSpinner />}>
            <Layout />
          </React.Suspense>
        }
        errorElement={<ErrorBoundary />}
      >
        <Route
          path='/'
          element={
            <React.Suspense fallback={<LoadingSpinner />}>
              <Hero />
            </React.Suspense>
          }
        />
        <Route
          path='/about'
          element={
            <React.Suspense fallback={<LoadingSpinner />}>
              <About />
            </React.Suspense>
          }
        />
        <Route
          path='/spreadsheet'
          element={
            <React.Suspense fallback={<LoadingSpinner />}>
              <Spreadsheet />
            </React.Suspense>
          }
        />
        <Route
          path='/contact'
          element={
            <React.Suspense fallback={<LoadingSpinner />}>
              <Contact />
            </React.Suspense>
          }
        />
        <Route
          path='/students'
          element={
            <React.Suspense fallback={<LoadingSpinner />}>
              <Students />
            </React.Suspense>
          }
        />
        <Route
          path='/students/:id'
          element={
            <React.Suspense fallback={<LoadingSpinner />}>
              <Student />
            </React.Suspense>
          }
          errorElement={<Navigate to='/students' />}
        />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default App;
