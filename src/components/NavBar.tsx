import { Link } from 'react-router-dom';
import winc from '../assets/winc.svg';
import StudentModal from './StudentModal';
import { useState } from 'react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEnter = () => {
    setIsOpen(true);
  };

  const handleLeave = () => {
    setTimeout(() => setIsOpen(false), 300);
  };

  return (
    <div className='flex z-30 top-0 left-0 lg:flex-col lg:min-h-full  h-screen w-full  max-w-[230px] bg-white  items-center border-r-[1.5px] border-r-slate-300'>
      <Link to='' className='flex px-2  items-center'>
        <img src={winc} alt='winc logo' className='max-h-[35px] my-4 ml-2 '></img>
        <p className='pl-2 w-[210px] text-lg font-bold text-[#4e8ac8] overflow-hidden'>
          Student Dashboard
        </p>
      </Link>
      <div className='flex lg: py-8 lg:flex-col w-full justify-center'>
        <Link to='' className='px-4 py-3 font-sans text-md hover:bg-slate-200'>
          Home
        </Link>

        <button
          className={`px-4 py-3 font-sans text-md text-left hover:bg-slate-200 ${
            isOpen ? 'border-r-[3px] border-[#4e8ac8]' : null
          }`}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          Students
          <StudentModal close={handleLeave} open={isOpen} />
        </button>
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
