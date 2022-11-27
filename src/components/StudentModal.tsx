import { useAppSelector } from '~/store/hooks';
import { selectStudentsObject } from '~/store/selectors';
import StudentLink from './StudentLink';

interface Props {
  close: () => void;
  open: boolean;
}

const StudentModal = ({ close, open }: Props) => {
  const students = useAppSelector(selectStudentsObject);

  return (
    <div className='flex relative  -z-30  h-screen left-[240px] flex-col bg-white p-4 transition-all'>
      {Object.entries(students).map((student) => (
        <StudentLink key={student[1].id} name={student[1].student} close={close} />
      ))}
    </div>
  );
};

export default StudentModal;
