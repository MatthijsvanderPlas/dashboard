import { GiHamburgerMenu } from 'react-icons/gi';
// import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';

function Hamburger() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <GiHamburgerMenu className='text-3xl  text-[#4e8ac8] cursor-pointer' onClick={handleClick} />
      {open && <span>Test </span>}
    </>
  );
}

export default Hamburger;
