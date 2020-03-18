import mongoose, {Schema} from "mongoose";

export const ProductSchema =  new Schema<any>({
    ref: {type: String, unique: false, required: true},
    designation: { type: String, lowercase: true, trim: true },
    qte: {type:Number, min: 0},
    price: Number,
    createdAt: { type: Date, default: Date.now },
    registeredBy: {type: mongoose.Schema.Types.ObjectId, ref:'User'}

});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
