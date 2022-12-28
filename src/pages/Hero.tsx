import { ParentSize } from '@visx/responsive';
import Chart from '~/components/Chart';
import SliceButton from '~/components/SliceButton';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { filteredStudentsData, selectAllStudents } from '~/store/selectors';
import { getStudentAvgPerAssignment } from '~/utils/utils';
import { toggleStudent } from '../store/filterSlice';

export default function Hero() {
  const rawData = useAppSelector(filteredStudentsData);
  const avgScores = getStudentAvgPerAssignment(rawData);
  const students: string[] = useAppSelector(selectAllStudents);
  const dispatch = useAppDispatch();

  const handleClick = (name: string) => {
    dispatch(toggleStudent(name));
  };

  return (
    <>
      <div className='flex flex-wrap p-4 mx-auto m-1 max-w-xl justify-center'>
        {students &&
          students.map((student) => {
            return <SliceButton key={student} text={student} func={handleClick} />;
          })}
      </div>
      <div className='flex relative p-4 flex-col mx-auto mb-14 lg:w-4/5 h-[600px] max-w-4xl max-h-[500px]'>
        {avgScores.length > 0 && (
          <ParentSize>
            {(parent) => <Chart width={parent.width} height={parent.height} data={avgScores} />}
          </ParentSize>
        )}
      </div>
    </>
  );
}
