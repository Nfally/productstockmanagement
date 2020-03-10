import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema<any>({
    ref: String,
    firstName: String,
    lastName: String,
    phone: Number,
    address: String,
    email: String,
    username: String,
    password: String,
    registeredBy: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
});

let User = mongoose.model("User", UserSchema);


export default User
