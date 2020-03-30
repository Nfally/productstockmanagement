import { ProductService } from "../api/ProductService";
import Router from 'express'
import errors from "../appHelpers";
import auth from "../middlewares/UserMiddlewares";

const ProductRouter = Router();

// @ts-ignore
ProductRouter.post('/api/products',[auth, [errors.ProductErrors]], ProductService.createProduct);
// @ts-ignore
ProductRouter.put('/api/products/:id',[auth, [errors.ProductErrors]],  ProductService.updateProduct);
ProductRouter.delete('/api/products/:id',auth, ProductService.deleteProduct);
ProductRouter.get('/api/products',auth, ProductService.getAllProducts);
ProductRouter.get('/api/products/:id',auth, ProductService.getProductById);

export default ProductRouter
