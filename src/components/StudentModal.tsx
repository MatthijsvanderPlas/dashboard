import StudentLink from './StudentLink';

interface Props {
  students: string[];
  close: () => void;
}

const StudentModal = ({ students, close }: Props) => {
  return (
    <div className='flex absolute min- h-screen top-28 left-[278px] flex-col bg-white p-4 transition-all'>
      {students
        ? students.map((student) => <StudentLink key={student} name={student} close={close} />)
        : null}
    </div>
  );
};

export default StudentModal;
