import * as express from 'express'
import {createProduct, deleteProduct, getAllProducts, getProductById, updateProduct} from "../api/ProductService";

const ProductRouter = express.Router();

ProductRouter.post('/products', createProduct);
ProductRouter.put('/products/:id', updateProduct);
ProductRouter.delete('/products/:id', deleteProduct);
ProductRouter.get('/products', getAllProducts);
ProductRouter.get('/products/:id', getProductById);

export default ProductRouter
