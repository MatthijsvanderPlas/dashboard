import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '~/store/hooks';
import { getEntities } from '~/store/selectors';

export default function Student() {
  const id = useLocation().state;
  const getEntitiesMemoized = useMemo(() => getEntities, []);
  const currentStudentData = useAppSelector((state) => getEntitiesMemoized(state));

  return (
    <>
      <div className='flex flex-col mx-auto max-w-4xl w-full  max-h-full'>
        <h2>BarChart</h2>

        {id > 0 &&
          currentStudentData &&
          Object.entries(currentStudentData[id].scores).map((score) => (
            <p key={score[1].a}>{score[1].d}</p>
          ))}
      </div>
    </>
  );
}
