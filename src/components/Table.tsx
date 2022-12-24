/* eslint-disable react/jsx-key */
import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { StudentData } from '~/utils/types';
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from 'react-icons/md';

const columnHelper = createColumnHelper<StudentData>();

const columns = [
  columnHelper.accessor((row) => row.student, {
    id: 'Name',
    header: () => <span>Name</span>,
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.score.assignment, {
    id: 'Assignment',
    header: () => <span>Assignment</span>,
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.score.difficulty, {
    id: 'Difficulty',
    header: () => <span>Difficulty</span>,
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.score.fun, {
    id: 'Fun',
    header: () => <span>Fun</span>,
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

function Table({ data }: { data: StudentData[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className='p-2 mb-20 max-w-4xl mx-auto flex justify-center flex-col'>
      <table className='border-2'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className='text-left  bg-[#4e8ac8] text-white' key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className={` p-2 min-w-[75px] ${
                    header.id !== 'Assignment' ? 'max-w-[100px] w-[100px]' : ''
                  } ${['Difficulty', 'Fun'].includes(header.id) ? 'text-center' : ''}`}
                  key={header.id}
                >
                  {header.isPlaceholder ? null : (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <div
                      key={header.id}
                      {...{
                        className:
                          'flex justify-between' + header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <MdOutlineArrowDropUp size={20} style={{ display: 'inline' }} />,
                        desc: <MdOutlineArrowDropDown size={20} style={{ display: 'inline' }} />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className='border-b-[1px]' key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className={`px-2 ${
                    ['Difficulty', 'Fun'].includes(cell.column.id) ? 'text-center' : ''
                  }`}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='h-2' />
      <div className='flex items-center justify-center  gap-3'>
        <button
          className='border cursor-pointer rounded p-1 shadow active:shadow-inner'
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className='border cursor-pointer rounded p-1 shadow active:shadow-inner'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className='border cursor-pointer rounded p-1 shadow active:shadow-inner'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className='border cursor-pointer rounded p-1 shadow active:shadow-inner'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className='flex items-center gap-1'>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <span className='flex items-center gap-1'>
          | Go to page:
          <input
            type='number'
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className='border p-1 rounded w-16'
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Table;
