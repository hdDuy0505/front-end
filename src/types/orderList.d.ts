import { Order } from './order';

export interface OrderList {
    data: Order[];
    page: number;
    perPage: number;
    totalPages: number;
}
