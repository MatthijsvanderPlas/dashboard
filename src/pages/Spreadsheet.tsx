import Table from '~/components/Table';
import { useAppSelector } from '~/store/hooks';
import { getEntities } from '~/store/selectors';

function Spreadsheet() {
  const data = useAppSelector(getEntities);

  return (
    <>
      <div className='flex mx-auto max-w-4xl'>Spreadsheet</div>
      {data && <Table data={Object.values(data)} />}
    </>
  );
}

export default Spreadsheet;
