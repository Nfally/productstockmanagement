import * as mongoose from "mongoose";
import {Schema} from "mongoose";

let User = mongoose.model("User", new Schema<any>({
    ref: String,
    firstName: String,
    lastName: String,
    phone: Number,
    adress: String,
    email: String
}));

export default User
