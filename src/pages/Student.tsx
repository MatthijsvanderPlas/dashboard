import { useLocation } from 'react-router-dom';
import Chart from '~/components/Chart';
import { useAppSelector } from '~/store/hooks';
import { selectStudentData } from '~/store/selectors';
import { ParentSize } from '@visx/responsive';
import { StudentData } from '~/utils/types';
import { useEffect, useState } from 'react';
import _ from 'underscore';

export default function Student() {
  const id = useLocation().state;
  const currentStudentData = useAppSelector(selectStudentData(id), _.isEqual);
  const [data, setData] = useState<StudentData[] | null>(null);

  useEffect(() => {
    console.log(currentStudentData);
    if (currentStudentData) {
      setData(currentStudentData);
    }
  }, [currentStudentData]);

  return (
    <>
      <div className='flex relative p-4 flex-col mx-auto lg:w-4/5 h-[600px] max-w-4xl max-h-[500px] '>
        {data ? <h2>{currentStudentData[0].student}</h2> : null}
        {data && (
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
