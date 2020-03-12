import {Schema} from "mongoose";
import  mongoose from "mongoose";

let Order = mongoose.model("Order", new Schema<any>({
    reference: {
        type: String,
        unique: false,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Customer'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    deliveredAt: Date
}))

export default Order;
