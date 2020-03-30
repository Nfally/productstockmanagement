import * as mongoose from "mongoose";

export const CustomerSchema = new mongoose.Schema({
    reference:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    phone: String,
    address: String,
    email:{
        type: String,
        required: true
    },
    registeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});
let Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;
