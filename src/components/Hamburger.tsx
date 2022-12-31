import { GiHamburgerMenu } from 'react-icons/gi';
// import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Hamburger() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <GiHamburgerMenu
        className='text-3xl z-100 text-[#4e8ac8] cursor-pointer'
        onClick={handleClick}
      />
      {open && (
        <div
          className={`bg-white w-screen absolute top-[50px] right-0 -z-10 ${
            open ? 'animate-slideFromTop' : 'animate-slideOut'
          } `}
        >
          <div className='flex  lg:flex-col justify-center'>
            <Link
              to=''
              className='px-4 w-screen text-center  py-3 font-sans text-md hover:bg-slate-200'
              onClick={handleClick}
            >
              Home
            </Link>
          </div>
          <div className='flex lg:flex-col justify-center'>
            <Link
              to='/students'
              className='px-4 w-screen text-center  py-3 font-sans text-md hover:bg-slate-200'
              onClick={handleClick}
            >
              Students
            </Link>
          </div>
          <div className='flex  lg:flex-col justify-center'>
            <Link
              to='/spreadsheet'
              className='px-4 w-screen text-center  py-3 font-sans text-md hover:bg-slate-200'
              onClick={handleClick}
            >
              Spreadsheet
            </Link>
          </div>
          <div className='flex  lg:flex-col justify-center'>
            <Link
              to='/about'
              className='px-4 mt-3 w-screen text-center  py-3 font-sans text-xs hover:bg-slate-200'
              onClick={handleClick}
            >
              About
            </Link>
          </div>
          <div className='flex  lg:flex-col justify-center'>
            <Link
              to='/contact'
              className='px-4 w-screen text-center  py-3 font-sans text-xs hover:bg-slate-200'
              onClick={handleClick}
            >
              Contact us
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Hamburger;
