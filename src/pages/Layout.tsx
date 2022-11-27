import React from 'react';
import { Outlet } from 'react-router-dom';

const NavBar = React.lazy(() => import(`~/components/NavBar`));
const Breadcrumbs = React.lazy(() => import(`~/components/Breadcrumbs`));
const Footer = React.lazy(() => import(`~/components/Footer`));

function Layout() {
  return (
    <div className='m-0 p-0 flex flex-col lg:flex-row overflow-hidden'>
      <div className='border-r-10 max-w-[248px] border-r-slate-500 box-border'>
        <NavBar />
      </div>
      <div className='relative left-[250px] w-screen'>
        <Breadcrumbs />
        <Outlet />
      </div>
      <div className='fixed bottom-0 left-0 w-full'>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
