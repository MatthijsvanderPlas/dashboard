import { BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';

function Footer() {
  return (
    <div className='p-2 bg-neutral-300 flex items-center'>
      <p className='text-xs'>
        Copyright &copy; {new Date().getFullYear()}{' '}
        <a
          href='https://www.stardash.nl'
          target='_blank'
          rel='noreferrer'
          className='underline hover:text-slate-400'
        >
          StarDASH.nl
        </a>{' '}
        All Rights Reserved
      </p>
      <div className='flex mx-auto text-3xl'>
        <div className='px-1 text-white  hover:text-black'>
          <a href='https://github.com/MatthijsvanderPlas'>
            <BsGithub />
          </a>
        </div>
        <div className='px-1 text-white hover:text-[#0077b5] '>
          <a href='https://www.linkedin.com/in/matthijs-van-der-plas-7b357b19a/'>
            <BsLinkedin />
          </a>
        </div>
        <div className='px-1 text-white hover:text-[#1ea1f2]'>
          <a href='https://twitter.com/MattP_Dev'>
            <BsTwitter />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
