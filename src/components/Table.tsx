/* eslint-disable react/jsx-key */
import { useMemo } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';
import { StudentData } from '~/utils/types';

function Table({ data }: { data: StudentData[] }) {
  const columns = useMemo(
    () => [
      {
        Header: 'Student',
        accessor: (row: StudentData) => row.student,
      },
      {
        Header: 'Assignment',
        accessor: (row: StudentData) => row.score.assignment,
      },
      {
        Header: 'Difficulty',
        accessor: (row: StudentData) => row.score.difficulty,
      },
      {
        Header: 'Fun',
        accessor: (row: StudentData) => row.score.fun,
      },
    ],
    [],
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 20 },
    },
    useSortBy,
    usePagination,
  );
  return (
    <>
      <table {...getTableProps()} className='border-l-[1px] mx-auto '>
        <thead className='border-[1px]'>
          {headerGroups.map((headerGroup) => (
            <tr className='border-[1px]' {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className='border-[1px] text-left min-w-[100px]'
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className='border-r-[1px] border-b-[1px]' {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='flex justify-center p-1'>
        <button
          className='bg-slate-100 px-2 m-1 rounded-sm shadow-md border-[1px] border-slate-400'
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </button>{' '}
        <button
          className='bg-slate-100 m-1 px-2 rounded-sm shadow-md border-[1px] border-slate-400'
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {'<'}
        </button>{' '}
        <button
          className='bg-slate-100 m-1 px-2 rounded-sm shadow-md border-[1px] border-slate-400'
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {'>'}
        </button>{' '}
        <button
          className='bg-slate-100 m-1 px-2 rounded-sm shadow-md border-[1px] border-slate-400'
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </button>{' '}
        <span className='m-1 px-2'>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span className='m-1 px-2'>
          | Go to page:{' '}
          <input
            className='  border-[1px]'
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
export default Table;
