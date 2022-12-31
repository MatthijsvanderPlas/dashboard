import { ClipLoader } from 'react-spinners';

function LoadingSpinner() {
  return (
    <div className='absolute top-1/2 left-1/2 translate-x-[-25px] translate-y-[-25px] mt-12 lg:mt-0'>
      <ClipLoader color={'black'} size={50} aria-label='Loading Spinner' />
    </div>
  );
}

export default LoadingSpinner;
