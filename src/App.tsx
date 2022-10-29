import { createContext } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';

export interface CsvData {
  name: string;
  assignment: string;
  difficulty: number;
  fun: number;
}

function App() {
  const studentContext = createContext(useLoaderData());
  return (
    <div className='mx-auto max-w-5xl my-8'>
      <h1>Hello React Context!</h1>
      <Outlet context={studentContext._currentValue as CsvData[]} />
    </div>
  );
}

export default App;
