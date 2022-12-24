/* eslint-disable react/jsx-key */
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { StudentData } from '~/utils/types';

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
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className='p-2 mb-20 max-w-4xl mx-auto flex justify-center flex-col'>
      <table className='border-2'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className='text-left' key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className='border-2 p-2 min-w-[75px]' key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className='px-2' key={cell.id}>
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
