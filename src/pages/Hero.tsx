import { useOutletContext } from 'react-router-dom';
import BarChart, { DataProps } from '~/components/BarChart';
import ParentSize from '@visx/responsive/lib/components/ParentSizeModern';
import { CsvData } from '~/App';
import useStore, { Data } from '~/useStore';

export default function Hero() {
  const allStudentData: CsvData[] = useOutletContext();
  const { data }: { data: Data[] } = useStore(allStudentData);

  return (
    <>
      <div className='flex mx-auto m-4 max-w-2xl h-[450px] max-h-full overflow-x-scroll overflow-y-hidden'>
        {data.length ? (
          <ParentSize>
            {({ width, height }) => (
              <BarChart
                width={width + data.length * 50}
                height={height}
                data={data as DataProps[]}
              />
            )}
          </ParentSize>
        ) : null}
      </div>
    </>
  );
}
