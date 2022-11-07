import { useOutletContext, useParams } from 'react-router-dom';

export default function Student() {
  const { student } = useParams();
  const data = useOutletContext();

  return (
    <>
      <div className='flex flex-col mx-auto max-w-5xl w-full  max-h-full'>
        <h2>BarChart</h2>
      </div>
    </>
  );
}
