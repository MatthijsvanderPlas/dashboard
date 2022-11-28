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
      className={`flex relative z-20  ${
        open ? 'visible animate-slide ' : 'animate-out'
      } top-0 left-[0px] h-screen w-[230px]  flex-col bg-white pt-16 border-[1px] border-r-slate-100`}
    >
      {students &&
        Object.entries(students).map((student) => (
          <StudentLink
            key={student[1].id}
            id={student[1].id}
            name={student[1].student}
            close={close}
          />
        ))}
    </div>
  );
};

export default StudentModal;
