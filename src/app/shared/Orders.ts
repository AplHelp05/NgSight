import { Customer } from 'src/app/shared/Customer';

export interface Order{
    id: number;
    customer: Customer;
    total: number;
    placed: Date;
    completed: Date;
}