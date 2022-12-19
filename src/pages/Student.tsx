import { useLocation } from 'react-router-dom';
import Chart from '~/components/Chart';
import { useAppSelector } from '~/store/hooks';
import { selectStudentById, selectStudentData } from '~/store/selectors';
import { ParentSize } from '@visx/responsive';
import _ from 'underscore';

export default function Student() {
  const id = useLocation().state;
  const currentStudent = useAppSelector(selectStudentById(id));
  const currentStudentData = useAppSelector(selectStudentData(id), _.isEqual);

  return (
    <>
      <div className='flex relative p-4 flex-col mx-auto lg:w-4/5 h-[600px] max-w-4xl max-h-[500px] '>
        {currentStudentData ? <h2>{currentStudent.student}</h2> : null}
        {currentStudentData && (
          <ParentSize>
            {(parent) => (
              <Chart width={parent.width} height={parent.height} data={currentStudentData} />
            )}
          </ParentSize>
        )}
      </div>
    </>
  );
}
