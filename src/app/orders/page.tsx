'use client';
import useOrders from '@/hooks/UseOrders';
import useTable, { CustomMeta } from '@/hooks/UseTable';
import { Order } from '@/types/order';
import { Updater } from '@tanstack/react-query';

import {
    createColumnHelper,
    flexRender,
    AccessorKeyColumnDefBase,
    IdIdentifier,
} from '@tanstack/react-table';

export default function OrdersTable() {
    const columnHelper = createColumnHelper<Order>();
    const columns: (AccessorKeyColumnDefBase<Order, any> &
        Partial<IdIdentifier<Order, any>>)[] = [
        columnHelper.accessor('id', {
            header: 'ID',
            meta: {
                headerClassName: 'text-center w-14',
                bodyClassName: 'text-center',
            } as CustomMeta,
        }),
        columnHelper.accessor('customerName', {
            header: 'Customer Name',
            meta: {
                headerClassName: 'text-center',
                bodyClassName: '',
            } as CustomMeta,
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            meta: {
                headerClassName: 'text-center w-24',
                bodyClassName: '',
            } as CustomMeta,
        }),
    ];

    const { orders, pagination, setPagination, error } =
        useOrders();
    const { table } = useTable<Order>({
        data: orders,
        columns: columns,
        pagination,
        setPagination,
    });

    if (error) {
        return <div>Error fetch api orders</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold my-4">Orders</h2>
            <table className="w-2/5 border-collapse table-fixed">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className={`border border-gray-300 bg-sky-400 text-gray-700 uppercase text-sm font-semibold 
                                    p-2 ${
                                        (
                                            header.column.columnDef
                                                .meta as CustomMeta
                                        )?.headerClassName || ''
                                    }`}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className="odd:bg-white even:bg-gray-50"
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className={`border border-gray-300 p-2 truncate 2  ${
                                        (
                                            cell.column.columnDef
                                                .meta as CustomMeta
                                        )?.bodyClassName || ''
                                    }`}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center justify-between mt-4">
                <div>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="ml-2 px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
                <div>
                    <span className="mr-2">
                        Page {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                        className="px-2 py-1 border rounded-md"
                    >
                        {[5, 10].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
