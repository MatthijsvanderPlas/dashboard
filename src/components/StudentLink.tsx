import { Link } from 'react-router-dom';

interface Props {
  key: number;
  name: string;
  close: () => void;
}

const StudentLink = ({ key, name, close }: Props) => {
  const url = `/students/${name}`;
  return (
    <Link key={key} to={url} onClick={close} className='p-1 hover:bg-slate-200'>
      - {name}
    </Link>
  );
};

export default StudentLink;
