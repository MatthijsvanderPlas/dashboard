import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface Props {
  link: string;
}

function Sitemap({ link }: Props) {
  const { student } = useParams();

  const [sitemap, setSitemap] = useState<string>('');
  const [currentStudent, setCurrentStudent] = useState<string>('');

  useEffect(() => {
    setSitemap(link);
    if (student) setCurrentStudent(student);
  }, [link, student]);

  return (
    <div className='text-slate-300 font-sans text-sm m-2'>
      <Link to='/'>Home</Link>
      {sitemap ? (
        <>
          <span> {'>'} </span>
          <Link to={'/' + sitemap}>{sitemap[0].toUpperCase() + sitemap.slice(1)}</Link>
        </>
      ) : null}
      {currentStudent ? (
        <>
          <span> {'>'} </span>
          <Link to={'/students/' + currentStudent}>{currentStudent}</Link>
        </>
      ) : null}
    </div>
  );
}

export default Sitemap;
