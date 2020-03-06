import {Customer} from "./Customer";

export class Order {
    readonly reference!: string;
    customer!: Customer;
    user!: string;
    orderedAt!: string;
    products!: string;
    deliveredAt!: string;
}
