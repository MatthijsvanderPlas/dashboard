import { ParentSize } from '@visx/responsive';
import Chart from '~/components/Chart';
import { useAppSelector } from '~/store/hooks';
import { filteredStudentsData } from '~/store/selectors';
import { getStudentAvgPerAssignment } from '~/utils/utils';

export default function Hero() {
  const rawData = useAppSelector(filteredStudentsData);

  const avgScores = getStudentAvgPerAssignment(rawData);
  console.log(avgScores);
  return (
    <>
      <div className='flex relative p-4 flex-col mx-auto m-14 lg:w-4/5 h-[600px] max-w-4xl max-h-[500px]'>
        <h1>Hero</h1>
        {avgScores.length > 0 && (
          <ParentSize>
            {(parent) => <Chart width={parent.width} height={parent.height} data={avgScores} />}
          </ParentSize>
        )}
      </div>
    </>
  );
}
