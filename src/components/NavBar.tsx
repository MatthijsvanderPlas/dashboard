import { Link } from 'react-router-dom';
import winc from '../assets/winc.svg';

const NavBar = ({ isOpen, click }: { isOpen: boolean; click: () => void }) => {
  return (
    <div className='flex relative z-30 top-0 left-0 lg:flex-col lg:min-h-full  h-screen w-full  max-w-[230px]  items-center border-r-[1.5px] border-r-slate-300'>
      <div className='flex px-2  items-center'>
        <img src={winc} alt='winc logo' className='max-h-[40px] my-4 ml-8 '></img>
        <p className='px-2 w-[250px] text-lg font-bold text-[#4e8ac8]'>Student Dashboard</p>
      </div>
      <div className='flex lg: py-8 lg:flex-col w-full justify-center'>
        <Link to='' className='px-4 py-3 font-sans text-md hover:bg-slate-200'>
          Home
        </Link>
        <button
          className={`px-4 py-3 font-sans text-md text-left hover:bg-slate-200 ${
            isOpen ? 'border-r-[3px] border-[#4e8ac8]' : null
          }`}
          onClick={click}
        >
          Students
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
