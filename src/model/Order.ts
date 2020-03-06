import {Schema} from "mongoose";
import * as mongoose from "mongoose";
import {CustomerSchema} from "./Customer";

let Order = mongoose.model("Order", new Schema<any>({
    reference: String,
    customer: CustomerSchema,
    user: String,
    products: String,
    deliveredAt: Date
}))

export default Order;
