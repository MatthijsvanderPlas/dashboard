import { createContext } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import Breadcrumbs from './components/Breadcrumbs';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

export interface CsvData {
  name: string;
  assignment: string;
  difficulty: number;
  fun: number;
}

const App = () => {
  const studentContext: any = createContext(useLoaderData());
  const students: string[] = Array.from(
    new Set(studentContext._currentValue.map((item: CsvData) => item.name)),
  );

  return (
    <div className='m-0 p-0 flex flex-col lg:flex-row '>
      <div
        className='flex lg:flex-row justify-center lg:border-r-[1.5px] lg:border-slate-400 lg:border-b-0  border-b border-x-gray-400 h-12 lg:h-full
       overflow-hidden min-w-[250px]'
      >
        <NavBar students={students} />
      </div>
      <div className='w-full'>
        <Breadcrumbs />
        <Outlet context={studentContext._currentValue as CsvData[]} />
      </div>
      <div className='fixed bottom-0 left-0 w-full'>
        <Footer />
      </div>
    </div>
  );
};

export default App;
