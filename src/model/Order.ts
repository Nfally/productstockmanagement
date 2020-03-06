import {Customer} from "./Customer";
import {Product} from "./Product";
import {User} from "./User";

export class Order {
    readonly reference!: string;
    customer!: Customer;
    user!: User;
    orderedAt!: Date;
    products!: Product[];
    deliveredAt!: Date;
}
