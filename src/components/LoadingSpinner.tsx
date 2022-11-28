import { ClipLoader } from 'react-spinners';

function LoadingSpinner() {
  return (
    <div className='absolute top-1/2 left-1/2 mx-auto my-auto'>
      <ClipLoader color={'black'} size={50} aria-label='Loading Spinner' />
    </div>
  );
}

export default LoadingSpinner;
