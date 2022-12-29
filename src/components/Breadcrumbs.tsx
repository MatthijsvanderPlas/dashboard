import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs';

function Breadcrumbs() {
  const location = useReactRouterBreadcrumbs();
  return (
    <div className='relative  z-10 font-sans flex flex-row text-[12px] m-2'>
      {location.map<ReactNode>(({ breadcrumb, key }, index) => (
        <div key={key}>
          <Link
            className={`hover:text-gray-600 ${
              index === location.length - 1 ? 'text-gray-600' : 'text-gray-400'
            }`}
            to={key}
          >
            {breadcrumb}
          </Link>
          {location.length > 1 && index < location.length - 1 ? (
            <span className='mx-[10px]'>&gt;</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default Breadcrumbs;
