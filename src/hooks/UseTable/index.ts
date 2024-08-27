import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    AccessorKeyColumnDefBase,
    IdIdentifier,
} from '@tanstack/react-table';
import { PaginationProps } from '../UseOrders';
import { Dispatch, SetStateAction } from 'react';

export interface UseTableProps<T> {
    data: T[];
    columns: (AccessorKeyColumnDefBase<T, number> &
        Partial<IdIdentifier<T, number>>)[];
    pagination: { page: number; perPage: number; totalPages: number };
    setPagination: Dispatch<SetStateAction<PaginationProps>>;
}

export interface CustomMeta {
    headerClassName?: string;
    bodyClassName?: string;
}

const useTable = <T>({
    data,
    columns,
    pagination,
    setPagination,
}: UseTableProps<T>) => {
    const table = useReactTable({
        data: data,
        columns,
        pageCount: pagination.totalPages,
        state: {
            pagination: {
                pageIndex: pagination.page - 1,
                pageSize: pagination.perPage,
            },
        },
        onPaginationChange: (updater) => {
            setPagination((prev: any) => {
                const state =
                    typeof updater === 'function'
                        ? updater({
                              pageIndex: prev.page - 1,
                              pageSize: prev.perPage,
                          })
                        : updater;

                return {
                    page: state.pageIndex + 1,
                    perPage: state.pageSize,
                    totalPages: pagination.totalPages,
                };
            });
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        columnResizeMode: 'onEnd',
        manualPagination: true,
    });

    table.getCanPreviousPage = () => {
        return table.getState().pagination.pageIndex > 0;
    };

    table.getCanNextPage = () => {
        return (
            table.getState().pagination.pageIndex < pagination.totalPages - 1
        );
    };

    table.previousPage = () => {
        if (table.getState().pagination.pageIndex > 0) {
            table.setPageIndex(table.getState().pagination.pageIndex - 1);
        }
    };

    table.nextPage = () => {
        if (table.getState().pagination.pageIndex < pagination.totalPages - 1) {
            table.setPageIndex(table.getState().pagination.pageIndex + 1);
        }
    };

    return { table };
};

export default useTable;
