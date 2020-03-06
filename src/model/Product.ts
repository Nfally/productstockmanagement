import mongoose, {Schema} from "mongoose"
let product = mongoose.model("Product", new Schema<any>({
    ref: String,
    designation: String,
    qte: Number,
    price: Number,
    createdAt: Date
}));

export default product;
