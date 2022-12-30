import { Link } from 'react-router-dom';
import winc from '../assets/winc.svg';
import StudentModal from './StudentModal';
import { useState } from 'react';
import Hamburger from './Hamburger';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className='flex z-30 h-[50px] w-screen top-0 left-0 items-center  lg:flex-col border-b-[1px] border-slate-300 lg:h-screen lg:max-w-[230px] bg-white  lg:items-center lg:border-r-[1.5px] lg:border-r-slate-300'>
      <Link to='' className='flex px-2  items-center'>
        <img src={winc} alt='winc logo' className='max-h-[35px] my-4 ml-2 '></img>
        <p className='pl-2 w-[230px] text-lg font-bold text-[#4e8ac8] overflow-hidden'>
          Student Dashboard
        </p>
      </Link>
      <div className='p-2 absolute right-2 lg:hidden'>
        <Hamburger />
      </div>
      <div className='flex invisible  lg:visible py-8 lg:flex-col w-full justify-center'>
        <Link to='' className='px-4 py-3 font-sans text-md hover:bg-slate-200'>
          Home
        </Link>

        <button
          className={`px-4 py-3 font-sans text-md text-left hover:bg-slate-200 ${
            isOpen ? 'border-r-[3px] border-[#4e8ac8]' : null
          }`}
          onClick={handleClick}
          onBlur={handleLeave}
        >
          Students
        </button>
        <StudentModal close={handleLeave} open={isOpen} />
        <Link to='/spreadsheet' className='px-4 py-3 font-sans text-md hover:bg-slate-200'>
          Spreadsheet
        </Link>
        <Link
          to='/about'
          className='px-4 py-2 mt-6 text-slate-500 text-xs font-sans text-md hover:bg-slate-200'
        >
          About
        </Link>
        <Link
          to='/contact'
          className='px-4 py-2 text-slate-500 text-xs font-sans text-md hover:bg-slate-200'
        >
          Contact us
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
