import { useParams } from 'react-router-dom';
import Chart from '~/components/Chart';
import { useAppSelector } from '~/store/hooks';
import { selectStudentById, selectStudentByName, selectStudentData } from '~/store/selectors';
import { ParentSize } from '@visx/responsive';
import _ from 'underscore';
import LoadingSpinner from '~/components/LoadingSpinner';
import StudentInfo from '~/components/StudentInfo';

export default function Student() {
  const student = useParams();
  const id = useAppSelector(selectStudentByName(student.id as string));
  const currentStudent = useAppSelector(selectStudentById(id as number));
  const currentStudentData = useAppSelector(selectStudentData(id as number), _.isEqual);
  const loading = useAppSelector((state) => state.data.status);

  if (loading === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <>
      <StudentInfo student={currentStudent.student} full='true' />
      <div className='flex relative p-4 flex-col mx-auto mt-4 mb-10  lg:w-4/5 h-[600px] max-w-7xl max-h-[500px] '>
        {currentStudentData.length > 0 && (
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
