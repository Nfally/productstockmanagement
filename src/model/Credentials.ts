import mongoose, {Schema} from "mongoose";

export const CredentialsSchema = new Schema<any>({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    }
})
let Credentials = mongoose.model("Credentials", CredentialsSchema)

export default Credentials
