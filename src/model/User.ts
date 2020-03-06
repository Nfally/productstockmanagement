import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema<any>({
    ref: String,
    firstName: String,
    lastName: String,
    phone: Number,
    address: String,
    email: String
});

let User = mongoose.model("User", UserSchema);


export default User
