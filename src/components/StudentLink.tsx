import { Link } from 'react-router-dom';

interface Props {
  id: number;
  name: string;
  close: () => void;
}

const StudentLink = ({ id, name, close }: Props) => {
  const url = `/students/${name}`;

  return (
    <Link key={id} to={url} onClick={close} className='pl-8 py-1 hover:bg-slate-200'>
      {name}
    </Link>
  );
};

export default StudentLink;
