import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentData, selectData } from 'store/studentDataSlice';

function App() {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const dataStatus = useSelector((state) => state.status);

  useEffect(() => {
    let ignore = false;
    if (dataStatus === 'idle') {
      if (!ignore) dispatch(fetchStudentData());
    }
    return () => {
      ignore = true;
    };
  }, [dataStatus, dispatch]);

  return (
    <div className='mx-auto max-w-5xl my-8'>
      <h1>Hello Redux!!</h1>
    </div>
  );
}

export default App;
