import { useLocation } from 'react-router-dom';
import Chart from '~/components/Chart';
import { useAppSelector } from '~/store/hooks';
import { selectStudentData } from '~/store/selectors';
import { ParentSize } from '@visx/responsive';

export default function Student() {
  const id = useLocation().state;
  const currentStudentData = useAppSelector(selectStudentData(id));

  return (
    <>
      <div className='flex p-4 flex-col mx-auto max-w-4xl max-h-[500px] overflow-scroll'>
        <h2>{currentStudentData && currentStudentData[0].student}</h2>
        {currentStudentData && (
          <ParentSize>
            {(parent) => (
              <Chart
                width={parent.width}
                height={parent.height}
                data={currentStudentData.map((d) => d.score)}
              />
            )}
          </ParentSize>
        )}
      </div>
    </>
  );
}
