import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Order } from '@/types/order';
import { OrderList } from '@/types/orderList';
import { getAllOrders } from '@/apis/orders.api';
export interface PaginationProps {
    page: number;
    perPage: number;
    totalPages: number;
}

const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [pagination, setPagination] = useState<PaginationProps>({
        page: 1,
        perPage: 5,
        totalPages: 1,
    });

    const { data, error } = useQuery<AxiosResponse<OrderList>>({
        queryKey: ['orders', pagination.page, pagination.perPage],
        queryFn: () => getAllOrders(pagination.page, pagination.perPage),
        staleTime: 5 * 1000,
    });

    const orderList = useMemo(() => data?.data, [data]);

    useEffect(() => {
        if (orderList) {
            setOrders(orderList.data);
            setPagination({
                page: orderList.page,
                perPage: orderList.perPage,
                totalPages: orderList.totalPages,
            });
        }
    }, [orderList]);

    return {
        orders,
        pagination,
        setPagination,
        error,
    };
};

export default useOrders;
