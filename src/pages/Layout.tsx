import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Breadcrumbs from '~/components/Breadcrumbs';
import Footer from '~/components/Footer';
import NavBar from '~/components/NavBar';
import StudentModal from '~/components/StudentModal';

function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className='relative m-0 p-0 flex flex-col lg:flex-row overflow-hidden'>
      <div className='fixed border-r-10 z-30 max-w-[230px] bg-white'>
        <NavBar click={handleClick} isOpen={isOpen} />
      </div>
      <div className='relative z-20'>
        <StudentModal close={handleClick} open={isOpen} />
      </div>
      <div className='relative z-10  w-screen'>
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
