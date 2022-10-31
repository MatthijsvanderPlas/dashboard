import { Link } from 'react-router-dom';

interface Props {
  name: string;
  close: () => void;
}

const StudentLink = ({ name, close }: Props) => {
  const url = `/${name}`;
  return (
    <Link to={url} onClick={close} className='p-1 hover:bg-slate-200'>
      - {name}
    </Link>
  );
};

export default StudentLink;
