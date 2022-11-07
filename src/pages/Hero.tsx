import { useOutletContext } from 'react-router-dom';
import { CsvData } from '~/App';

export default function Hero() {
  const data: CsvData[] = useOutletContext();
  console.log(data);
  return (
    <>
      <div className='flex justify-center mx-auto max-w-5xl max-h-full '>Hero page</div>
    </>
  );
}
