import { Customer } from 'src/app/shared/Customer';

export interface Order{
    id: number;
    customer: Customer;
    total: number;
    orderPlaced: Date;
    orderFulfilled: Date;
}