import * as mongoose from "mongoose";

export const CustomerSchema = new mongoose.Schema({
    reference: String,
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
    email: String,
    registeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});
let Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;
