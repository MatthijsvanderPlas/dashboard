import { Outlet } from 'react-router-dom';
import Breadcrumbs from '~/components/Breadcrumbs';
import Footer from '~/components/Footer';
import NavBar from '~/components/NavBar';

function Layout() {
  return (
    <div className='relative m-0 p-0 min-h-screen flex flex-col lg:flex-row overflow-hidden'>
      <div className='fixed border-r-10 z-30 max-w-[230px] bg-white'>
        <NavBar />
      </div>
      <div className='relative z-10 lg:ml-[230px] w-screen'>
        <Breadcrumbs />
        <Outlet />
      </div>
      <div className='absolute z-40 bottom-0 left-0 w-full'>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
