import Product from "../model/Product";
import {Request, Response} from "express";

export const ProductService = {
    createProduct: (req: Request, resp: Response) => {
        console.log('creating new product');
        const productToCreate = new Product(req.body);
        productToCreate.save(err => {
            if (err) resp.status(400).send(err);
            resp.send(productToCreate)
        })
    },

    updateProduct: (req: Request, resp: Response) => {
        console.log('updating product');
        const id = req.params.id;
        if(id) Product.findByIdAndUpdate(id, req.body, (err, product) => {
            if (err) {
                console.error({ err });
                return resp.send('Product not found')
            }
            return resp.send(product)
        });
        else throw new Error()
    },

    deleteProduct: (req: Request, resp: Response) => {
        console.log('deleting customer');
        const id = req.params.id;
        const customerToFound = Product.findById(id);
        if(!customerToFound) {
            return resp.send('product not found')
        }
        Product.findByIdAndDelete(id, err => {
            if(err) resp.send(err);
            else resp.send('product deleted successfully..')
        })
    },

    getAllProducts: (req: Request, resp: Response) => {
        console.log('getting all products.');
        Product.find((err, products) => {
            if (err) console.log(err);
            else resp.send(products)
        })
    },

    getProductById: (req: Request, resp: Response) => {
        console.log('getting product by id');
        Product.findById(req.params.id, (err, product) => {
            if (err) console.error(err);
            else resp.send(product)
        })
    }
}

// module.exports = ProductService
