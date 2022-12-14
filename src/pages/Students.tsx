import { Link } from 'react-router-dom';
import Avatar from '~/components/Avatar';
import { useAppSelector } from '~/store/hooks';
import { selectAllStudents } from '~/store/selectors';

const Students = () => {
  const students = useAppSelector(selectAllStudents) as string[];
  return (
    <>
      <div className='grid grid-cols-5 relative mr-2 lg:mx-auto  mb-14 lg:w-4/5 max-w-7xl'>
        {students.map((student) => {
          return (
            <div className='flex' key={student}>
              <Link className='flex justify-center flex-col' to={`/students/${student}`}>
                <div className='w-[75px] lg:w-[150px] m-2'>
                  <Avatar student={student} />
                </div>
                <span className='text-center font-bold'>{student}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Students;
