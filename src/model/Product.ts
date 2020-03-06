import mongoose, {Schema} from "mongoose"
export const ProductSchema =  new Schema<any>({
    ref: String,
    designation: String,
    qte: Number,
    price: Number,
    createdAt: Date
});

let Product = mongoose.model("Product", ProductSchema);
export default Product;
