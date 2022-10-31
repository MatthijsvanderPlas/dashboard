import { createContext } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import NavBar from './components/NavBar';

export interface CsvData {
  name: string;
  assignment: string;
  difficulty: number;
  fun: number;
}

type studentContext = {
  data: CsvData[];
};

const App = () => {
  const studentContext = createContext<studentContext>(useLoaderData());
  const students: string[] = Array.from(
    new Set(studentContext._currentValue.map((item) => item.name)),
  );

  return (
    <div className='m-0 p-0 flex flex-col lg:flex-row '>
      <div
        className='flex lg:flex-row justify-center lg:border-r-[1.5px] lg:border-slate-400 lg:border-b-0  border-b border-x-gray-400 h-12 lg:h-full
       overflow-hidden min-w-[250px]'
      >
        <NavBar students={students} />
      </div>
      <div className='mx-auto w-full h-full my-8 p-2'>
        <Outlet context={studentContext._currentValue as CsvData[]} />
      </div>
    </div>
  );
};

export default App;
