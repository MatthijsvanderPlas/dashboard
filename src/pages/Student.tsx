import { useParams } from 'react-router-dom';
import { useAppSelector } from '~/store/hooks';
import { getEntity, selectStudentByName } from '~/store/selectors';
import { MyParams, StudentById } from '~/utils/types';

export default function Student() {
  const { id } = useParams<keyof MyParams>() as MyParams;
  const student = useAppSelector(selectStudentByName(id)) as StudentById;
  const currentStudentData = useAppSelector(getEntity(student.id));

  if (currentStudentData) {
    return (
      <>
        <div className='flex flex-col mx-auto max-w-4xl w-full  max-h-full'>
          <h2>BarChart</h2>

          {Object.entries(currentStudentData.scores).map((score) => (
            <p key={score[1].a}>{score[1].d}</p>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className='flex flex-col mx-auto max-w-4xl w-full  max-h-full'>
        <h2>BarChart</h2>
      </div>
    </>
  );
}
