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
    <div
      className={`flex sticky z-20  ${
        open ? 'visible animate-slide ' : 'animate-out'
      } left-[0px] h-screen w-[230px]  flex-col bg-white pt-16 border-[1px] border-r-slate-100`}
    >
      {students &&
        Object.values(students).map((student) => (
          <StudentLink key={student.id} id={student.id} name={student.student} close={close} />
        ))}
    </div>
  );
};

export default StudentModal;
