import StudentLink from './StudentLink';

interface Props {
  students: string[];
  close: () => void;
}

const StudentModal = ({ students, close }: Props) => {
  return (
    <div className='flex flex-col bg-white  p-4  w-full  before:content-center backdrop:bg-black'>
      {students
        ? students.map((student) => <StudentLink key={student} name={student} close={close} />)
        : null}
    </div>
  );
};

export default StudentModal;
