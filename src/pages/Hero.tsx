import { useOutletContext } from 'react-router-dom';
import BarChart from '~/components/BarChart';
import { CsvData } from '~/App';
import useStore, { Data } from '~/useStore';

export default function Hero() {
  const allStudentData: CsvData[] = useOutletContext();
  const { data }: { data: Data[] } = useStore(allStudentData);

  return (
    <>
      <div className='flex mx-auto m-4 max-w-2xl h-[350px] max-h-full overflow-x-scroll'>
        <BarChart />
      </div>
    </>
  );
}
