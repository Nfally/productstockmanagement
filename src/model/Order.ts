import {Schema, Types} from "mongoose";
import * as mongoose from "mongoose";
import {CustomerSchema} from "./Customer";
import {UserSchema} from "./User";
import {ProductSchema} from "./Product";

let Order = mongoose.model("Order", new Schema<any>({
    reference: String,
    customer: CustomerSchema,
    user: UserSchema,
    products: [ProductSchema],
    deliveredAt: Date
}))

export default Order;
