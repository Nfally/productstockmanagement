import { ProductService } from "../api/ProductService";
import Router from 'express'

const ProductRouter = Router();

ProductRouter.post('/api/products', ProductService.createProduct);
ProductRouter.put('/api/products/:id', ProductService.updateProduct);
ProductRouter.delete('/api/products/:id', ProductService.deleteProduct);
ProductRouter.get('/api/products', ProductService.getAllProducts);
ProductRouter.get('/api/products/:id', ProductService.getProductById);

export default ProductRouter
