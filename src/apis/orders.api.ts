import { AxiosResponse } from 'axios';
import instance from '@/utils/axios/instance.axios';
import { PER_PAGE } from '@/commons/contants';
import { ORDERS } from './_constants';
import { OrderList } from '@/types/orderList';

export const getAllOrders = (
    page: number,
    perPage: number = PER_PAGE
): Promise<AxiosResponse<Required<OrderList>>> =>
    instance.get(ORDERS.GET_LIST, {
        params: { page, perPage },
    });
