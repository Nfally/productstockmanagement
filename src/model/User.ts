import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema<any>({
    ref: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    address: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    registeredBy: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
});

let User = mongoose.model("User", UserSchema);


export default User
