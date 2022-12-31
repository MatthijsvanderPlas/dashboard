import Table from '~/components/Table';
import { useAppSelector } from '~/store/hooks';
import { getEntities } from '~/store/selectors';

function Spreadsheet() {
  const data = useAppSelector(getEntities);

  return (
    <>
      <div className='flex flex-col px-1  mx-auto max-w-[60ch]  lg:max-w-[75ch]'>
        <h1 className='w-full text-2xl break-all p-4'>Spreadsheet Data</h1>
        <p className='leading-relaxed py-2'>
          This is a spreadsheet of the complete data using{' '}
          <a className='underline' href='https://tanstack.com/table/v8'>
            Tanstack Table
          </a>
          . Included are some basic pagination and sorting built into this awesome and easy to use
          (typesafe might I add) library.
          <br />
          <br /> Click on any column header to sort ascending or descending.
        </p>
      </div>
      {data && <Table data={Object.values(data)} />}
    </>
  );
}

export default Spreadsheet;
